#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const DEFAULT_SELECTOR = '#page';
const DEFAULT_OUT_DIR = path.resolve(process.cwd(), 'exports');
const DEFAULT_TYPE = 'jpeg';
const DEFAULT_QUALITY = 92;
const DEFAULT_SCALE = 2;
const DEFAULT_VARIANTS = [
  { name: 'standard', width: 1920, height: 1080, deviceScaleFactor: 2 },
  { name: 'medium', width: 1600, height: 900, deviceScaleFactor: 2 },
  { name: 'high', width: 2400, height: 1350, deviceScaleFactor: 2.5 },
];

function printUsage() {
  console.log(`Usage:
  node scripts/export_infographic_images.js <htmlPath> [--selector=#page] [--outDir=exports] [--slug=name]
                                             [--type=jpeg|png] [--quality=92] [--scale=2]
                                             [--variant=name:WIDTHxHEIGHT@SCALE[,type=png][,quality=95]]

Examples:
  node scripts/export_infographic_images.js ml-copilot-samples/ml-copilot-infographic.html --selector=#page
  node scripts/export_infographic_images.js ml-copilot-samples/sample_deepsite.html --selector=.max-w-6xl \\
     --outDir=exports --slug=sample_deepsite --variant=preview:1600x900@2 --variant=poster:2400x1350@3,quality=95
`);
}

function parseNumeric(value, label) {
  const parsed = Number(value);
  if (Number.isNaN(parsed) || parsed <= 0) {
    throw new Error(`Invalid ${label}: ${value}`);
  }
  return parsed;
}

function parseVariant(input) {
  if (!input.includes(':')) {
    throw new Error(`Variant "${input}" must look like name:WIDTHxHEIGHT@SCALE`);
  }
  const [name, restRaw] = input.split(':', 2);
  const [sizePart, ...extraParts] = restRaw.split(',');
  const [dimensionsPart, scalePart] = sizePart.split('@');
  const [widthStr, heightStr] = dimensionsPart.toLowerCase().split('x');
  if (!widthStr || !heightStr) {
    throw new Error(`Variant "${input}" is missing WIDTHxHEIGHT dimensions`);
  }
  const variant = {
    name: name.trim(),
    width: parseNumeric(widthStr, 'variant width'),
    height: parseNumeric(heightStr, 'variant height'),
  };
  if (scalePart) {
    variant.deviceScaleFactor = parseNumeric(scalePart, 'variant scale');
  }
  for (const extra of extraParts) {
    const [rawKey, rawValue] = extra.split('=');
    const key = rawKey.trim();
    const value = (rawValue || '').trim();
    if (!key) continue;
    if (key === 'type') variant.type = value;
    else if (key === 'quality') variant.quality = parseNumeric(value, 'variant quality');
    else if (key === 'scale' && !variant.deviceScaleFactor) {
      variant.deviceScaleFactor = parseNumeric(value, 'variant scale');
    } else {
      throw new Error(`Unknown variant option "${key}" in "${input}"`);
    }
  }
  return variant;
}

async function findChrome() {
  const candidates = [
    process.env.CHROME || process.env.GOOGLE_CHROME_BIN,
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome Beta',
    '/Applications/Google Chrome Dev.app/Contents/MacOS/Google Chrome Dev',
    '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
    '/Applications/Chromium.app/Contents/MacOS/Chromium'
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      if (candidate && fs.existsSync(candidate)) return candidate;
    } catch {
      // ignore errors resolving the path
    }
  }

  throw new Error('No local Chrome/Chromium binary found. Set CHROME env var to your Chrome executable.');
}

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printUsage();
    process.exit(args.length === 0 ? 1 : 0);
  }

  const htmlPath = args.shift();
  if (!htmlPath) {
    printUsage();
    process.exit(1);
  }

  let selector = DEFAULT_SELECTOR;
  let outDir = DEFAULT_OUT_DIR;
  let slug = '';
  let type = DEFAULT_TYPE;
  let baseQuality = DEFAULT_QUALITY;
  let baseScale = DEFAULT_SCALE;
  const customVariants = [];

  for (const arg of args) {
    if (arg.startsWith('--selector=')) selector = arg.split('=')[1];
    else if (arg === '--viewport') selector = 'viewport';
    else if (arg.startsWith('--outDir=')) outDir = arg.split('=')[1];
    else if (arg.startsWith('--slug=')) slug = arg.split('=')[1];
    else if (arg.startsWith('--type=')) type = arg.split('=')[1];
    else if (arg.startsWith('--quality=')) baseQuality = parseNumeric(arg.split('=')[1], 'quality');
    else if (arg.startsWith('--scale=')) {
      baseScale = parseNumeric(arg.split('=')[1], 'scale');
      if (baseScale > 8) baseScale = 8;
    }
    else if (arg.startsWith('--variant=')) customVariants.push(parseVariant(arg.split('=')[1]));
    else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  const finalVariants = (customVariants.length ? customVariants : DEFAULT_VARIANTS.map(v => ({ ...v })))
    .map(variant => ({
      ...variant,
      deviceScaleFactor: Math.min(variant.deviceScaleFactor || baseScale, 8),
      type: (variant.type || type || DEFAULT_TYPE).toLowerCase(),
      quality: variant.quality ?? baseQuality,
    }));

  return {
    htmlPath,
    selector,
    outDir,
    slug,
    variants: finalVariants,
  };
}

async function main() {
  try {
    const { htmlPath, selector, outDir, slug, variants } = parseArgs();
    const absHtml = path.resolve(htmlPath);
    if (!fs.existsSync(absHtml)) {
      throw new Error(`HTML file not found: ${absHtml}`);
    }
    const exportsDir = path.resolve(outDir || DEFAULT_OUT_DIR);
    fs.mkdirSync(exportsDir, { recursive: true });

    const baseName = slug || path.basename(absHtml, path.extname(absHtml));
    const executablePath = await findChrome();
    const browser = await puppeteer.launch({
      executablePath,
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-breakpad',
        '--disable-crash-reporter',
        '--disable-crashpad',
        '--single-process',
        '--no-zygote'
      ]
    });
    const page = await browser.newPage();
    try {
      await page.goto('file://' + absHtml, { waitUntil: 'networkidle2', timeout: 120000 });
      try {
        await page.evaluate(() => (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve());
      } catch {
        // Ignore font loading errors
      }
      await new Promise(resolve => setTimeout(resolve, 800));

      for (const variant of variants) {
        await page.setViewport({
          width: Math.round(variant.width),
          height: Math.round(variant.height),
          deviceScaleFactor: variant.deviceScaleFactor,
        });

        let clip;
        if (selector && selector !== 'viewport') {
          clip = await page.$eval(selector, el => {
            const rect = el.getBoundingClientRect();
            return {
              x: Math.max(0, rect.x),
              y: Math.max(0, rect.y),
              width: Math.ceil(rect.width),
              height: Math.ceil(rect.height),
            };
          });
          if (clip.width === 0 || clip.height === 0) {
            throw new Error(`Selector "${selector}" rendered zero-sized element for variant "${variant.name}"`);
          }
        }

        const baseFileName = variant.name === 'standard' ? baseName : `${baseName}_${variant.name}`;
        const extension = variant.type === 'jpeg' ? 'jpg' : variant.type;
        const outputPath = path.join(exportsDir, `${baseFileName}.${extension}`);
        const screenshotOptions = {
          path: outputPath,
          type: variant.type,
          clip,
          captureBeyondViewport: true,
          omitBackground: false,
        };
        if (variant.type === 'jpeg') {
          screenshotOptions.quality = Math.max(1, Math.min(100, Math.round(variant.quality)));
        }

        await page.screenshot(screenshotOptions);
        console.log(`[${variant.name}] Saved image -> ${outputPath}`);
      }
    } finally {
      await browser.close();
    }
  } catch (err) {
    console.error(err.message || err);
    process.exit(1);
  }
}

main();

#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const puppeteer = require('../info-graphics/node_modules/puppeteer-core');

function findChrome() {
  const candidates = [
    process.env.CHROME || process.env.GOOGLE_CHROME_BIN,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium'
  ].filter(Boolean);

  for (const c of candidates) {
    try {
      if (fs.existsSync(c)) return c;
    } catch (_) {}
  }

  throw new Error('No Chrome/Chromium found. Set CHROME env var.');
}

function hasCmd(cmd) {
  try {
    execSync(`command -v ${cmd}`, { stdio: 'ignore' });
    return true;
  } catch (_) {
    return false;
  }
}

async function main() {
  const input = process.argv[2] || 'derma-ai-brochure_v3.html';
  const outDir = process.argv[3] || 'exports/derma-ai-brochure_v3';

  const absHtml = path.resolve(input);
  if (!fs.existsSync(absHtml)) {
    throw new Error(`HTML file not found: ${absHtml}`);
  }

  const absOutDir = path.resolve(outDir);
  fs.mkdirSync(absOutDir, { recursive: true });

  const executablePath = findChrome();
  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const slidePdfs = [];

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1240, height: 877, deviceScaleFactor: 2 });
    await page.goto('file://' + absHtml, { waitUntil: 'networkidle2', timeout: 120000 });

    await page.addStyleTag({
      content: `
        body {
          margin: 0 !important;
          padding: 0 !important;
          background: #fff !important;
          display: block !important;
          min-height: auto !important;
        }
        .deck-container {
          width: 1240px !important;
          height: 877px !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          margin: 0 !important;
        }
        .nav-controls, .slide-indicator {
          display: none !important;
        }
      `
    });

    const totalSlides = await page.evaluate(() => document.querySelectorAll('.slide').length);

    for (let i = 1; i <= totalSlides; i++) {
      await page.evaluate((slideNum) => {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');

        slides.forEach((s) => s.classList.remove('active'));
        dots.forEach((d) => d.classList.remove('active'));

        const target = document.getElementById(`slide-${slideNum}`);
        const dot = document.getElementById(`dot-${slideNum}`);
        if (target) target.classList.add('active');
        if (dot) dot.classList.add('active');

        if (typeof window.currentSlide !== 'undefined') {
          window.currentSlide = slideNum;
        }

        const fragments = target ? target.querySelectorAll('.fragment') : [];
        fragments.forEach((f) => f.classList.add('visible'));

        if (typeof window.slideSteps !== 'undefined') {
          window.slideSteps[slideNum] = fragments.length;
        }

        if (typeof window.updateButtons === 'function') {
          window.updateButtons();
        }
      }, i);

      await new Promise((resolve) => setTimeout(resolve, 1900));

      const pdfPath = path.join(absOutDir, `derma-ai-brochure_v3-slide-${i}.pdf`);
      await page.pdf({
        path: pdfPath,
        printBackground: true,
        width: '1240px',
        height: '877px',
        margin: { top: '0', right: '0', bottom: '0', left: '0' },
        pageRanges: '1'
      });

      slidePdfs.push(pdfPath);
      console.log(`Exported slide ${i}: ${pdfPath}`);
    }

    if (slidePdfs.length > 1 && hasCmd('pdfunite')) {
      const merged = path.join(absOutDir, 'derma-ai-brochure_v3-all-slides.pdf');
      execSync(`pdfunite ${slidePdfs.map((p) => `'${p.replace(/'/g, "'\\''")}'`).join(' ')} '${merged.replace(/'/g, "'\\''")}'`);
      console.log(`Merged PDF: ${merged}`);
    } else {
      console.log('Skipped merge (pdfunite not available); individual slide PDFs are exported.');
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});

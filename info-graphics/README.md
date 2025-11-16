# ML Copilot infographic exports

This folder mirrors the export flow used for the `coppr_infographic` comps: a small Node/Puppeteer
script opens any of the infographic HTML files and captures high-resolution JPG/PNG snapshots of the
artboard so the assets can be embedded in web pages, decks, or docs without manually exporting them.

## Prerequisites

- Node 18+ (needed for Puppeteer)
- Google Chrome or Chromium installed locally (the script auto-detects `google-chrome`, `chromium`,
  or respects the `CHROME` / `GOOGLE_CHROME_BIN` environment variables)

Install the lone dependency once:

```bash
npm install
```

## Shipping the default comps

Two helper npm scripts are defined in `package.json` to export the bundled HTML comps into the
`exports/` directory. Each script renders the `.html` file, targets the artboard root (the `#page`
element or `.max-w-6xl` container), and emits standard/medium/high-resolution JPGs.

```bash
# Machine Learning Copilot infographic
npm run export:ml-copilot

# DeepSite sample
npm run export:deepsite

# Gemini variant
npm run export:gemini

# Unbranded ML Copilot variant
npm run export:ml-copilot-unbranded

# Run both back-to-back
npm run export:all
```

The exported files are written into `exports/` with the following naming pattern:

- `ml-copilot-infographic.jpg`
- `ml-copilot-infographic_medium.jpg`
- `ml-copilot-infographic_high.jpg`

## Custom exports

The core logic lives in `scripts/export_infographic_images.js`. Run it directly for any new HTML
file and tweak the selector, slug, output directory, or the list of variants (sizes). Full usage:

```
node scripts/export_infographic_images.js <htmlPath> [--selector=#page] [--outDir=exports] [--slug=name]
                                           [--type=jpeg|png] [--quality=92] [--scale=2]
                                           [--variant=name:WIDTHxHEIGHT@SCALE[,type=png][,quality=95]]
```

Key flags:

- `--selector=#page` captures a specific DOM node (use `--selector=viewport` to capture the entire viewport)
- `--variant=preview:1600x900@2` adds an extra export with custom geometry and device scale
- `--variant=poster:2400x1350@3,quality=95` demonstrates optional overrides per variant
- `--outDir=exports/custom` writes the images somewhere else (folders are created automatically)

Each run waits for the page to settle, ensures fonts are loaded, and produces deterministic JPG/PNG
files similar to the previous `coppr` pipeline. Use the `CHROME` env var to point at a non-standard
Chrome binary when needed.

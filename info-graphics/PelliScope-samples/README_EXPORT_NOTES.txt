PelliScope Infographic Export Notes
===================================

Goal:
  - Treat every Pelliscope print canvas as a true A4 page (210mm x 297mm) while keeping the older screen layouts available.
  - Export high-quality JPEGs from those HTML canvases (pelliscoe-print1/2/3 + pelliscope-infographic) using the same workflow as the ml-copilot assets.

Current State:
  - The active HTML files set `.infographic-canvas/.canvas { width: 210mm; height: 297mm; }` plus `@media print` rules so browsers respect A4 sizing, remove shadows, and keep backgrounds when printing/exporting.
  - The original fixed-pixel versions (1240px wide, auto height) are archived in `PelliScope-samples/original/` (print1.html, print2.html, print3.html, etc.) if you need the previous “full width” look for screen comps.
  - Each page references `hawk_logo.png` inside this folder, so it does not rely on external placeholders.
  - Output folder: `PelliScope-samples/exports/` is ready to receive the rendered files.

Why Pixel vs. A4 Matters:
  - Earlier versions used `width: 1240px; height: auto;`. Browsers render those at arbitrary physical sizes, so printing/scaling never matched real A4.
  - A4 definitions (210mm x 297mm) ensure the HTML artboard matches the intended PDF/paper size. Browsers can then honor it exactly.
  - The @media print block also removes gray backgrounds and ensures backgrounds are printed, preventing the browser from inserting its own margins or white strips.

Required Export Workflow:
  - Use the provided Puppeteer script (`scripts/export_infographic_images.js`) with a working Chrome/Chromium binary.
  - Commands to run from `/home/vatsal1/Documents/g2/hfr.github.io/info-graphics`:

        CHROME=/usr/bin/google-chrome node scripts/export_infographic_images.js PelliScope-samples/pelliscoe-print1.html --selector=#page --slug=pelliscope-print1 --outDir=PelliScope-samples/exports
        CHROME=/usr/bin/google-chrome node scripts/export_infographic_images.js PelliScope-samples/pelliscope-print2.html --selector=#page --slug=pelliscope-print2 --outDir=PelliScope-samples/exports
        CHROME=/usr/bin/google-chrome node scripts/export_infographic_images.js PelliScope-samples/pelliscope-print3.html --selector=#page --slug=pelliscope-print3 --outDir=PelliScope-samples/exports
        CHROME=/usr/bin/google-chrome node scripts/export_infographic_images.js PelliScope-samples/pelliscope-infographic.html --selector=#page --slug=pelliscope-infographic --outDir=PelliScope-samples/exports

  - Each command produces standard/medium/high JPEGs (default sizes 1920/1600/2400 px). Those go into the `exports` folder.

Sandbox Limitation:
  - On this machine, headless Chrome currently fails to start (Crashpad’s setsockopt call is blocked). That prevents the script from running locally.
  - Solution: Run the above commands on a host where Chrome can launch (e.g., outside the restricted sandbox). As soon as Chrome starts successfully, the script works exactly like it did for the ml-copilot assets.

Summary:
  1. HTML is A4-sized with print-optimized CSS.
  2. Originals (pixel-based canvases) live under `PelliScope-samples/original/` for reference.
  3. Logos/assets are local; no broken references.
  4. All that remains is to run the export commands on a machine that allows headless Chrome so the new A4 canvases can be rendered to JPG.
*** End Patch

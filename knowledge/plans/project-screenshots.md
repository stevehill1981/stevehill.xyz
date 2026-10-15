# Show real project images on Home

Steve approved obtaining screenshots for the selected projects. Use existing public product assets without invented imagery or release claims.

1. Download and inspect the existing images into `src/assets/projects/`: Rachel's `images/emissary-table.webp`, Chaotic Tanx's `screenshots/screenshot-3.png`, and Code198x's `images/learning/nes.png` (Dash). Source sites: https://rachel.stevehill.xyz, https://chaotictanx.stevehill.xyz and https://www.code198x.com. Preserve original files; the Tanx image is a development build and the NES image is curriculum output.
2. In `src/pages/index.astro`, use Astro Image for local optimized, lazy-loaded images with dimensions, descriptive alternatives and short captions. Preserve whole frames; keep NES pixel art sharp. No dependencies or schema changes.
3. Build and verify generated image files, dimensions, alternatives, image sizes and responsive rendering. Commit/push; clean up task server and logs.

Verification: full production build passed, including 11 regressions and 123 indexed pages. All three generated images and every responsive variant exist, with nonempty alternatives, intrinsic dimensions and lazy loading. Fallbacks total approximately 133KB; responsive WebP variants are generated at 360/720px for the larger captures. Browser checks confirmed loaded images, full-frame containment and pixelated NES rendering; desktop/mobile layouts were inspected and mobile width/scroll width both measured 390px. The final NES output is PNG. Existing heading-gradient findings remain for the broader design review; no suppressions added. Original downloaded assets are retained in source control with their source paths above.

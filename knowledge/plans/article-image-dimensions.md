# Reserve article image space

## Cause and scope

The generated Spectrum tutorial has four dimensionless PNG images; the Shiki article has one dimensionless SVG. `src/plugins/rehype-lazy-images.mjs` only supplies loading and decoding. File metadata supplies all five aspect ratios. Keep authored Markdown, URLs, alternatives and existing explicit sizes intact; add no dependency.

## Steps

1. Extend the existing rehype plugin to infer missing dimensions for root-relative public images using installed Sharp. Do not fetch external images. Resolve within public and fail the build for missing/invalid local assets rather than silently shipping a dimensionless image.
2. Add focused plugin regression tests for actual dimensions, explicit-size preservation and missing local files. Demonstrate the new tests fail against the old plugin, then pass against the fix.
3. Run the full build; compare all five generated article images with the actual assets, confirm lazy/async attributes and responsive CSS remain. Record outcome, commit and push through normal CI.

No performance trace tool is available. This verifies reserved aspect ratios in shipped markup; it does not establish a measured CLS improvement.

## Outcome

The seven focused regressions initially produced five failures against the old plugin (missing raster/SVG dimensions, partial size completion, missing-file failure and public-directory boundary). After the change, all 18 tests pass and the production build indexes all 123 pages. Built markup was checked against Sharp metadata for all five article images: two 1504×1228 PNGs, two 1392×933 PNGs and the 400×300 SVG. Lazy loading, async decoding, image URLs and alternatives are preserved; responsive `max-width:100%; height:auto` CSS is unchanged.

The initial full build reused cached Markdown despite the plugin change, so the generated-output assertion failed. `astro.config.mjs` now explicitly passes the public asset directory to the plugin. The normal build reported “Astro config changed” and “Clearing content store”, then emitted the correct dimensions without a force flag. No cache deletion or dependency change was needed.

This fixes the absent sizing information. No cold-load trace or numerical CLS improvement was measured.

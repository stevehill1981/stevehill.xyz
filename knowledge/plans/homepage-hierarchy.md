# Put selected work before writing

Steve approved a short introduction, selected projects, then recent writing, reflecting his infrequent posting. Preserve the incumbent visual identity; this is a hierarchy change rather than a redesign.

1. Update `src/pages/index.astro`: add a short factual introduction; select Rachel, Code198x and Chaotic Tanx with source-backed statuses; put projects first in DOM order. Stack the sections, use three project columns where space allows, and show three recent posts below. Keep links to both complete indexes. Exclude draft posts.
2. Run the production build (including existing regression tests); inspect generated section order, links, counts and statuses. Inspect desktop and mobile rendering, overflow and project discovery position. Run the Impeccable layout detector; leave pre-existing unrelated decoration findings for the broader design review without suppression.
3. Commit and push; close task preview tabs and stop the task server.

Real product screenshots are not present in the repository. This change preserves the current project presentation; obtaining appropriate screenshots remains a follow-up.

Verification: production build passed with all 11 regressions and 123 indexed pages. Generated Home has projects before writing, the three confirmed statuses, three posts, and six valid detail destinations. Browser inspection: 1728px uses three project columns, 820px uses two, 390px uses one; none had horizontal overflow. At 390px the first project begins at approximately 686px, compared with approximately 2129px in the original audit (the rotating tagline can affect exact position). Layout detector returned no findings before and after. Existing decorative styles remain unchanged; no suppressions added. Preview tab closed and temporary viewport reset.

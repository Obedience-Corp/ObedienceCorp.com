/**
 * Feature flags.
 *
 * diffusionGraph — the organized-diffusion campaign graph demo. It lives on its
 * own unlinked, noindexed page (/preview/organized-diffusion) and is OFF in
 * production until it is ready to surface. It is always visible in `npm run dev`
 * so it can be worked on locally, and can be enabled for a production build by
 * setting the env var PUBLIC_SHOW_DIFFUSION_GRAPH=true.
 */
export const FEATURES = {
  diffusionGraph:
    import.meta.env.DEV ||
    import.meta.env.PUBLIC_SHOW_DIFFUSION_GRAPH === "true",
} as const;

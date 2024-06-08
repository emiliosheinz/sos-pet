import nextBundleAnalyzer from "@next/bundle-analyzer";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {};

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(config);

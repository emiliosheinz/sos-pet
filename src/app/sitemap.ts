export default async function sitemap() {
  const routes = ["", "/about", "/privacy-policy", "/terms-of-use"].map(
    (route) => ({
      url: `https://www.sos-pet.org${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    }),
  );

  return routes;
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ceramic-porcelain")({
  head: () => ({
    meta: [
      { title: "Ceramic & Porcelain Cleaning Riyadh | Khidmat" },
      {
        name: "description",
        content:
          "Professional ceramic and porcelain floor cleaning in Riyadh - deep grout cleaning, tough stain removal and shine restoration for homes, villas and commercial spaces.",
      },
      { property: "og:title", content: "Ceramic & Porcelain Cleaning Riyadh | Khidmat" },
      { property: "og:url", content: "https://www.khidmatmarble.com/ceramic-porcelain" },
    ],
    links: [{ rel: "canonical", href: "https://www.khidmatmarble.com/ceramic-porcelain" }],
  }),
  component: () => <div>Ceramic & Porcelain Cleaning</div>,
});

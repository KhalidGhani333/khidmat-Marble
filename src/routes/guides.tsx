import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: [
      { title: "Expert Care Guides - Marble & Tile Maintenance | Khidmat" },
      {
        name: "description",
        content:
          "Practical guides on tile crack repair, marble maintenance and water tank cleaning from Khidmat's marble and tile care experts in Riyadh.",
      },
      { property: "og:title", content: "Expert Care Guides - Marble & Tile Maintenance | Khidmat" },
      { property: "og:url", content: "https://www.khidmatmarble.com/guides" },
    ],
    links: [{ rel: "canonical", href: "https://www.khidmatmarble.com/guides" }],
  }),
  component: () => <div />, // Will be overridden by lazy component
});

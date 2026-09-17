import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us - Marble & Tile Polishing Experts | Khidmat" },
      {
        name: "description",
        content:
          "Meet the team behind Khidmat's marble, tile and granite polishing in Riyadh - 5+ years of experience, Italian equipment and genuine diamond polishing for a lasting shine.",
      },
      { property: "og:title", content: "About Us - Marble & Tile Polishing Experts | Khidmat" },
      { property: "og:url", content: "https://www.khidmatmarble.com/about-us" },
    ],
    links: [{ rel: "canonical", href: "https://www.khidmatmarble.com/about-us" }],
  }),
  component: () => <div>About Us</div>,
});

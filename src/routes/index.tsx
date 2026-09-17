import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Khidmat | Marble & Tile Polishing Riyadh" },
      { name: "description", content: "Riyadh's #1 marble specialists. Restore the brilliance of your floors with premium Italian polishing equipment." },
      { property: "og:title", content: "Khidmat | Marble & Tile Polishing Riyadh" },
      { property: "og:url", content: "https://www.khidmatmarble.com/" },
    ],
    links: [{ rel: "canonical", href: "https://www.khidmatmarble.com/" }],
  }),
});

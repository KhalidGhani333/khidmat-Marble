import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - Khidmat Marble & Tile Care Riyadh" },
      { name: "description", content: "Get in touch with Khidmat for professional marble and tile polishing services in Riyadh. Free quotes available." },
      { property: "og:title", content: "Contact - Khidmat Marble & Tile Care Riyadh" },
      { property: "og:url", content: "https://www.khidmatmarble.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://www.khidmatmarble.com/contact" }],
  }),
});

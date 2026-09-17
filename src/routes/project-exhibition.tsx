import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/project-exhibition")({
  head: () => ({
    meta: [
      { title: "Project Exhibition - Our Work | Khidmat Marble & Tile Care" },
      {
        name: "description",
        content:
          "Browse Khidmat's portfolio of completed marble polishing and tile restoration projects across Riyadh homes, villas, hotels and commercial spaces.",
      },
      {
        property: "og:title",
        content: "Project Exhibition - Our Work | Khidmat Marble & Tile Care",
      },
      { property: "og:url", content: "https://www.khidmatmarble.com/project-exhibition" },
    ],
    links: [{ rel: "canonical", href: "https://www.khidmatmarble.com/project-exhibition" }],
  }),
  component: () => <div>Project Exhibition</div>,
});

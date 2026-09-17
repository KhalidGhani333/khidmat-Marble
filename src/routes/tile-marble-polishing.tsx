import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tile-marble-polishing")({
  head: () => ({
    meta: [
      { title: "Tile Cleaning & Marble Polishing Riyadh | Khidmat" },
      {
        name: "description",
        content:
          "Diamond polishing for tile and marble floors in Riyadh - removes scratches and stains and restores a long-lasting, crystal-like shine for any surface.",
      },
      { property: "og:title", content: "Tile Cleaning & Marble Polishing Riyadh | Khidmat" },
      { property: "og:url", content: "https://www.khidmatmarble.com/tile-marble-polishing" },
    ],
    links: [{ rel: "canonical", href: "https://www.khidmatmarble.com/tile-marble-polishing" }],
  }),
  component: () => <div>Tile and Marble Polishing</div>,
});

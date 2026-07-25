export type HomeHeroMediaId = "coffee" | "dessert" | "seating" | "together";

export type HomeHeroMediaSource = {
  src: string;
  type: "video/mp4" | "video/webm";
};

export type HomeHeroMedia = {
  id: HomeHeroMediaId;
  label: string;
  word: string | null;
  placement: "left" | "center" | "right" | "full";
  poster: string | null;
  sources: readonly HomeHeroMediaSource[];
};

export const homeHeroTimeline = {
  clipDurationMs: 3000,
  crossfadeMs: 500,
  phaseStartsMs: [0, 2500, 5000, 7500] as const,
  finalPhaseIndex: 3,
} as const;

// Add optimized MP4/WebM sources and matching posters here when final media is approved.
export const homeHeroMedia: readonly HomeHeroMedia[] = [
  {
    id: "coffee",
    label: "Luxe Coffee Bar",
    word: "Luxury",
    placement: "left",
    poster: null,
    sources: [],
  },
  {
    id: "dessert",
    label: "Luxe Sweet Cart",
    word: "events,",
    placement: "center",
    poster: null,
    sources: [],
  },
  {
    id: "seating",
    label: "Luxe Seating Rentals",
    word: "gathered.",
    placement: "right",
    poster: null,
    sources: [],
  },
  {
    id: "together",
    label: "",
    word: null,
    placement: "full",
    poster: null,
    sources: [],
  },
] as const;

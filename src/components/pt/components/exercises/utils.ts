import type { Category } from "../categories/types";
import type { ChipType, Exercise } from "./types";

export const getYouTubeEmbedUrl = (url: string): string | null => {
  if (!url) return null;

  try {
    const urlObj = new URL(url);
    let videoId: string | null = null;

    if (urlObj.hostname.includes("youtube.com")) {
      videoId = urlObj.searchParams.get("v");
    } else if (urlObj.hostname.includes("youtu.be")) {
      videoId = urlObj.pathname.slice(1);
    } else if (urlObj.pathname.includes("/embed/")) {
      videoId = urlObj.pathname.split("/embed/")[1]?.split("?")[0];
    }

    if (!videoId) return null;

    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    return null;
  }
};

export const getCategoryChips = (
  node: Exercise,
  categories: Category[]
): ChipType[] => {
  const categoryId = node.category;

  const mainCategory = categories.find((cat) => cat.id === categoryId);
  if (mainCategory) {
    return [
      {
        id: mainCategory.id,
        label: mainCategory.name,
      },
    ];
  }

  for (const category of categories) {
    if (category.subcategories) {
      const subcategory = category.subcategories.find(
        (sub) => sub.id === categoryId
      );
      if (subcategory) {
        return [
          {
            id: category.id,
            label: category.name,
          },
          {
            id: subcategory.id,
            label: subcategory.name,
          },
        ];
      }
    }
  }

  return [];
};

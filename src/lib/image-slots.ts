import {
  schoolConfig as defaultSchoolConfig,
  type GalleryItem,
  type ImageAsset,
  type SchoolConfig
} from "@/data/school.config";

export type ImageSlot = {
  key: string;
  label: string;
  description: string;
  path: Array<string | number>;
  defaultImage: ImageAsset;
  recommended: string;
  viewPath: string;
};

function imageAt(path: Array<string | number>) {
  return path.reduce<unknown>((value, part) => {
    if (value && typeof value === "object") {
      return (value as Record<string | number, unknown>)[part];
    }

    return undefined;
  }, defaultSchoolConfig) as ImageAsset;
}

export const imageSlots: ImageSlot[] = [
  {
    key: "home-hero",
    label: "Home Hero",
    description: "Large image in the first section of the home page.",
    path: ["hero", "image"],
    defaultImage: imageAt(["hero", "image"]),
    recommended: "16:9 landscape",
    viewPath: "/"
  },
  {
    key: "about-header",
    label: "About Header",
    description: "Top image on the About page.",
    path: ["pageContent", "about", "image"],
    defaultImage: imageAt(["pageContent", "about", "image"]),
    recommended: "4:3 landscape",
    viewPath: "/about"
  },
  {
    key: "programs-header",
    label: "Programs Header",
    description: "Top image on the Programs page.",
    path: ["pageContent", "programs", "image"],
    defaultImage: imageAt(["pageContent", "programs", "image"]),
    recommended: "4:3 landscape or portrait crop",
    viewPath: "/programs"
  },
  {
    key: "admissions-header",
    label: "Admissions Header",
    description: "Top image on the Admissions page.",
    path: ["pageContent", "admissions", "image"],
    defaultImage: imageAt(["pageContent", "admissions", "image"]),
    recommended: "4:3 landscape",
    viewPath: "/admissions"
  },
  {
    key: "contact-header",
    label: "Contact Header",
    description: "Top image near the admissions contact heading.",
    path: ["pageContent", "contact", "image"],
    defaultImage: imageAt(["pageContent", "contact", "image"]),
    recommended: "4:3 landscape",
    viewPath: "/contact"
  },
  {
    key: "daycare-main",
    label: "Daycare Section",
    description: "Image used in the daycare section and page.",
    path: ["daycare", "image"],
    defaultImage: imageAt(["daycare", "image"]),
    recommended: "4:3 landscape",
    viewPath: "/daycare"
  },
  {
    key: "safety-main",
    label: "Safety Main",
    description: "Main safety section image.",
    path: ["safety", "image"],
    defaultImage: imageAt(["safety", "image"]),
    recommended: "Portrait or 4:3",
    viewPath: "/daycare"
  },
  {
    key: "safety-zoom",
    label: "Safety CCTV Zoom",
    description: "Image shown when parents view the CCTV close-up.",
    path: ["safety", "zoomImage"],
    defaultImage: imageAt(["safety", "zoomImage"]),
    recommended: "4:3 close-up",
    viewPath: "/"
  },
  ...defaultSchoolConfig.programs.items.map((program, index) => ({
    key: `program-${index}`,
    label: `Program: ${program.title}`,
    description: `Image used on the ${program.title} program card.`,
    path: ["programs", "items", index, "image"] as Array<string | number>,
    defaultImage: program.image,
    recommended: "4:3 landscape",
    viewPath: "/programs"
  })),
  ...defaultSchoolConfig.faculty.teachers.map((teacher, index) => ({
    key: `faculty-${index}`,
    label: `Faculty: ${teacher.name}`,
    description: `Photo used for ${teacher.name}.`,
    path: ["faculty", "teachers", index, "image"] as Array<string | number>,
    defaultImage: teacher.image,
    recommended: "Square or portrait",
    viewPath: "/about"
  }))
];

export function getValueAtPath<T>(object: unknown, path: Array<string | number>) {
  return path.reduce<unknown>((value, part) => {
    if (value && typeof value === "object") {
      return (value as Record<string | number, unknown>)[part];
    }

    return undefined;
  }, object) as T | undefined;
}

export function setValueAtPath<T extends object>(
  object: T,
  path: Array<string | number>,
  value: unknown
) {
  const clone = structuredClone(object);
  let target: Record<string, unknown> | unknown[] = clone as Record<string, unknown>;

  path.slice(0, -1).forEach((part) => {
    target = (target as Record<string | number, unknown>)[part] as
      | Record<string, unknown>
      | unknown[];
  });

  const finalKey = path[path.length - 1];
  (target as Record<string | number, unknown>)[finalKey] = value;

  return clone;
}

export function restoreImageSlot(config: SchoolConfig, slotKey: string) {
  const slot = imageSlots.find((item) => item.key === slotKey);

  if (!slot) {
    throw new Error("Unknown image slot.");
  }

  return setValueAtPath(config, slot.path, slot.defaultImage) as SchoolConfig;
}

export function restoreDefaultGallery(config: SchoolConfig) {
  return {
    ...config,
    gallery: {
      ...config.gallery,
      items: structuredClone(defaultSchoolConfig.gallery.items) as GalleryItem[]
    }
  };
}

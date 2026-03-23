const galleryImageModules = import.meta.glob(
  "../assets/others/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  {
    eager: true,
    import: "default",
  }
);

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

export const galleryImages = Object.entries(galleryImageModules)
  .sort(([a], [b]) => collator.compare(a, b))
  .map(([, image]) => image);


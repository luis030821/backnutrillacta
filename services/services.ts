export function obtenerArrayConImagenes(variants: any[]) {
  return variants.map((variant, i, arr) => {
    if (!variant.img) {
      for (let j = i - 1; j >= 0; j--) {
        if (arr[j].img) {
          return { ...variant, img: arr[j].img };
        }
      }
    }
    return variant;
  });
}
export function getArrayImages(variants: any[]) {
  return variants.map((variant, i, arr) => {
    if (!variant.img) {
      for (let j = i - 1; j >= 0; j--) {
        if (arr[j].img) {
          return { ...variant, img: arr[j].img };
        }
      }
    }
    return variant;
  });
}

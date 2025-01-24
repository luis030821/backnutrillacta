export const formatString = (
  string: { es: string; en: string } | string | undefined
) => {
  return typeof string == "string" ? string : string?.es;
};

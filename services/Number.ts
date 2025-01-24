export const formatPrice = (
  number: string | number | undefined,
  toFixed: number = 2
) => {
  return typeof number == "string"
    ? parseFloat(number)?.toFixed(toFixed)
    : number?.toFixed(toFixed);
};
export const formatNumber = (
  number: string | number | undefined,
  toFixed: number = 0
) => {
  return typeof number == "string"
    ? parseFloat(number)?.toFixed(toFixed)
    : number?.toFixed(toFixed);
};

export const formatInteger = (number: string | number | undefined) => {
  return typeof number == "string" ? parseInt(number) : number;
};

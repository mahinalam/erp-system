export function generateSku(styleNo: string, color: string, size: string) {
  const shortColor = color.slice(0, 3).toUpperCase();

  const shortSize = size.toUpperCase();

  return `${styleNo}-${shortColor}-${shortSize}`;
}

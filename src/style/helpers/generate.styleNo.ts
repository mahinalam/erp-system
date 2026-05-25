export function generateStyleNo(
  buyerCode: string,
  season: string,
  year: number,
  sequence: number,
) {
  return `${buyerCode}-${season}${String(year).slice(-2)}-${String(sequence).padStart(3, '0')}`;
}

export function generateBuyerCode(lastCode?: string) {
  if (!lastCode) return 'BUY-001';

  const num = parseInt(lastCode.split('-')[1]);
  return `BUY-${String(num + 1).padStart(3, '0')}`;
}

export function generateBarcodePattern(barcode: string): string {
  // Simple barcode pattern generation
  // In a real implementation, you'd use a proper barcode library
  const patterns = ['w-px', 'w-1', 'w-2'];
  const heights = ['h-6', 'h-8'];
  
  let pattern = '';
  for (let i = 0; i < barcode.length; i++) {
    const digit = parseInt(barcode[i]);
    const widthClass = patterns[digit % 3];
    const heightClass = heights[digit % 2];
    pattern += `<div class="${widthClass} ${heightClass} bg-white"></div>`;
  }
  
  return pattern;
}
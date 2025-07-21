interface BarcodeDisplayProps {
  barcode: string;
}

export function BarcodeDisplay({ barcode }: BarcodeDisplayProps) {
  if (!barcode) return null;
  
  return (
    <div className="bg-primary p-2 rounded w-full">
      <div className="flex space-x-px justify-center w-full">
        {Array.from(barcode).map((digit, index) => {
          const digitVal = parseInt(digit) || 0;
          const widthClass = digitVal % 3 === 0 ? 'w-px' : digitVal % 3 === 1 ? 'w-1' : 'w-2';
          const heightClass = digitVal % 2 === 0 ? 'h-6' : 'h-8';
          
          return (
            <div 
              key={index}
              className={`${widthClass} ${heightClass} bg-white flex-shrink-0`}
            />
          );
        })}
      </div>
      <div className="text-center mt-1">
        <span className="text-xs text-primary-foreground font-mono tracking-wider">{barcode}</span>
      </div>
    </div>
  );
}
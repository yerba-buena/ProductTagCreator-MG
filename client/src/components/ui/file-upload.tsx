import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { CloudUpload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  className?: string;
  disabled?: boolean;
}

export function FileUpload({ 
  onFileSelect, 
  accept = { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
  maxSize = 5 * 1024 * 1024, // 5MB
  className,
  disabled = false
}: FileUploadProps) {
  const [error, setError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError('');
    
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError('File is too large. Maximum size is 5MB.');
      } else if (rejection.errors[0]?.code === 'file-invalid-type') {
        setError('Invalid file type. Please upload an image.');
      } else {
        setError('File upload failed. Please try again.');
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
    disabled
  });

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 cursor-pointer",
          isDragActive 
            ? "border-primary bg-primary/5" 
            : "border-slate-300 hover:border-primary",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <CloudUpload className="mx-auto h-8 w-8 text-slate-400 mb-2" />
        <p className="text-slate-600 mb-2">
          {isDragActive 
            ? "Drop image here..." 
            : "Drop image here or click to upload"
          }
        </p>
        <p className="text-xs text-slate-500">
          Supports JPG, PNG, WebP (Max 5MB)
        </p>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

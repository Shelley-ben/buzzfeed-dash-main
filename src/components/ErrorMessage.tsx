import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ 
  message = 'Failed to load news. Please try again.',
  onRetry 
}: ErrorMessageProps) => {
  return (
    <div className="container mx-auto px-4 py-20">
      <Alert variant="destructive" className="max-w-2xl mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="mt-2">
          {message}
        </AlertDescription>
        {onRetry && (
          <Button 
            onClick={onRetry}
            variant="outline"
            className="mt-4"
          >
            Try Again
          </Button>
        )}
      </Alert>
    </div>
  );
};

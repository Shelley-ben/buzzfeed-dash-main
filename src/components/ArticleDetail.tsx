import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Article } from '@/services/newsApi';
import { Calendar, ExternalLink, User } from 'lucide-react';
import { format } from 'date-fns';

interface ArticleDetailProps {
  article: Article | null;
  open: boolean;
  onClose: () => void;
}

export const ArticleDetail = ({ article, open, onClose }: ArticleDetailProps) => {
  if (!article) return null;

  const formattedDate = article.publishedAt 
    ? format(new Date(article.publishedAt), 'MMMM dd, yyyy • HH:mm')
    : 'Unknown date';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {article.urlToImage && (
          <div className="relative -mx-6 -mt-6 mb-6 h-64 overflow-hidden">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=600&fit=crop';
              }}
            />
          </div>
        )}
        
        <DialogHeader>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary">{article.source.name}</Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </div>
          </div>
          
          <DialogTitle className="text-2xl leading-tight mb-2">
            {article.title}
          </DialogTitle>
          
          {article.author && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
          )}
        </DialogHeader>

        <DialogDescription className="text-base leading-relaxed mt-4">
          {article.description}
        </DialogDescription>

        {article.content && (
          <div className="mt-4 text-foreground leading-relaxed">
            {article.content.replace(/\[\+\d+ chars\]/, '')}
          </div>
        )}

        <div className="mt-6 pt-6 border-t flex justify-end">
          <Button asChild className="gap-2">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read Full Article
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

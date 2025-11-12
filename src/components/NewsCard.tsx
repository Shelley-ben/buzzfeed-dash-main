import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Article } from '@/services/newsApi';
import { Calendar, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface NewsCardProps {
  article: Article;
  onClick: () => void;
}

export const NewsCard = ({ article, onClick }: NewsCardProps) => {
  const formattedDate = article.publishedAt 
    ? format(new Date(article.publishedAt), 'MMM dd, yyyy')
    : 'Unknown date';

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/50"
      onClick={onClick}
    >
      {article.urlToImage && (
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop';
            }}
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {article.source.name}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </div>
        </div>
        
        <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
          {article.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <CardDescription className="line-clamp-3">
          {article.description || 'No description available.'}
        </CardDescription>
        
        <div className="mt-4 flex items-center gap-2 text-sm text-primary font-medium">
          Read more
          <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </CardContent>
    </Card>
  );
};

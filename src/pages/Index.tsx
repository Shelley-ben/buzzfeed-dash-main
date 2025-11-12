import { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from '@/components/Header';
import { CategoryNav } from '@/components/CategoryNav';
import { SearchBar } from '@/components/SearchBar';
import { NewsCard } from '@/components/NewsCard';
import { ArticleDetail } from '@/components/ArticleDetail';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { fetchTopHeadlines, searchNews, Article } from '@/services/newsApi';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState('general');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLanguage, setSearchLanguage] = useState('en');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const loadNews = useCallback(async (pageNum: number, reset: boolean = false) => {
    try {
      setLoading(pageNum === 1);
      setError(null);

      let response;
      if (searchQuery) {
        response = await searchNews(searchQuery, searchLanguage, pageNum);
      } else {
        response = await fetchTopHeadlines('us', activeCategory, pageNum);
      }

      const newArticles = response.articles.filter(
        (article) => article.title !== '[Removed]' && article.urlToImage
      );

      setArticles((prev) => reset ? newArticles : [...prev, ...newArticles]);
      setHasMore(newArticles.length > 0);

      if (reset) {
        toast({
          title: 'News Updated',
          description: `Loaded ${newArticles.length} articles`,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load news');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load news articles',
      });
    } finally {
      setLoading(false);
    }
  }, [activeCategory, searchQuery, searchLanguage, toast]);

  useEffect(() => {
    const savedCategory = localStorage.getItem('lastCategory');
    if (savedCategory) {
      setActiveCategory(savedCategory);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    setArticles([]);
    loadNews(1, true);
  }, [activeCategory, searchQuery, searchLanguage]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && articles.length > 0) {
          setPage((prev) => {
            const nextPage = prev + 1;
            loadNews(nextPage, false);
            return nextPage;
          });
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [hasMore, loading, articles.length, loadNews]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchQuery('');
    localStorage.setItem('lastCategory', category);
  };

  const handleSearch = (query: string, language: string) => {
    setSearchQuery(query);
    setSearchLanguage(language);
    setActiveCategory('general');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CategoryNav activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
      <SearchBar onSearch={handleSearch} />

      <main className="container mx-auto px-4 py-8">
        {loading && page === 1 ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => loadNews(1, true)} />
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No articles found</p>
            <p className="text-sm text-muted-foreground mt-2">Try a different search or category</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <NewsCard
                  key={`${article.url}-${index}`}
                  article={article}
                  onClick={() => setSelectedArticle(article)}
                />
              ))}
            </div>

            {hasMore && (
              <div ref={loadMoreRef} className="py-8 flex justify-center">
                {loading && <LoadingSpinner />}
              </div>
            )}

            {!hasMore && articles.length > 0 && (
              <p className="text-center py-8 text-muted-foreground">
                No more articles to load
              </p>
            )}
          </>
        )}
      </main>

      <ArticleDetail
        article={selectedArticle}
        open={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  );
};

export default Index;

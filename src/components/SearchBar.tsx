import { Search, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LANGUAGES } from '@/config/api';
import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string, language: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedQuery = localStorage.getItem('lastSearch');
    if (savedQuery) {
      setQuery(savedQuery);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      localStorage.setItem('lastSearch', query);
      onSearch(query, language);
    }
  };

  return (
    <div className="bg-card/50 border-b">
      <div className="container mx-auto px-4 py-6">
        <form onSubmit={handleSearch} className="flex gap-2 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search news by keyword..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 transition-smooth focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[140px]">
              <Globe className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button type="submit" className="transition-smooth">
            Search
          </Button>
        </form>
      </div>
    </div>
  );
};

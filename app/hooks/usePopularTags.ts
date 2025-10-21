import { useState, useEffect } from 'react';
import {
  getPopularTags,
  type PopularTag,
} from '~/services/api/search/search.service';

interface FormattedTag {
  name: string;
  count: string;
}

export function usePopularTags(limit: number = 20) {
  const [tags, setTags] = useState<FormattedTag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPopularTags() {
      try {
        setLoading(true);
        setError(null);
        const data = await getPopularTags(limit);

        if (!isMounted) return;

        const formatted = data.map((t: PopularTag) => ({
          name: t.tag.toUpperCase(),
          count: `${t.count}+`,
        }));

        setTags(formatted);
      } catch (err) {
        if (isMounted) {
          console.error('Failed to load popular tags:', err);
          setError('Failed to load popular tags');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchPopularTags();

    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { tags, loading, error };
}

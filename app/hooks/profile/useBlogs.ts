import { useState, useEffect } from 'react';
import { getUserBlogs } from '~/services/api/blog/blog.service';
import type { BlogListResponse } from '~/models/res/blog.response';

export type BlogPost = BlogListResponse['data'][0];

export function useBlogs(userId: string | undefined) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBlogs = async () => {
      if (!userId) {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const blogData = await getUserBlogs(userId);

        if (isMounted) {
          const mappedBlogs = blogData.data.map((blog: any) => ({
            id: blog._id,
            coverImage: blog.coverImage,
            upvotes: blog.upvotes,
            downvotes: blog.downvotes,
            tags: blog.tags,
            title: blog.title,
            slug: blog.slug,
            summary: blog.summary,
            author: {
              userId: blog.user?._id,
              avatar: blog.user?.avatar,
              nickName: blog.user?.nickName,
            },
            createdAt: blog.createdAt,
          }));

          setBlogs(mappedBlogs);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching blog posts:', err);
          setError('Failed to load blogs');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBlogs();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return { blogs, loading, error };
}

import { useState, useEffect } from 'react';
import { getUserBlogs } from '~/services/api/blog/blog.service';
import type { BlogListResponse } from '~/models/res/blog.response';
import tags from '~/lang/en/tags';

export type BlogPost = BlogListResponse['data'][0];

export function useBlogs(userId: string | undefined) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchBlogs = async () => {
      if (!userId) {
        console.log('User ID not available yet');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log('Fetching blog posts for user:', userId);

        const blogData = await getUserBlogs(userId);
        console.log('Fetched blog data:', blogData);

        if (isMounted) {
          const mappedBlogs = blogData.data.map((blog: any) => ({
            id: blog._id,

            upvotes: blog.upvotedBy.length,
            downvotes: blog.downvotedBy.length,

            tags: blog.tags,

            coverImage: blog.coverImage,
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
          console.log('Mapped Blog Data:', mappedBlogs);
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

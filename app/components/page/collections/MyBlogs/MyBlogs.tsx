import * as React from 'react';

import blog from '~/lang/en/blog';
import { getUserBlogs } from '~/services/api/blog/blog.service';
import type { BlogListResponse } from '~/models/res/blog.response';
import { getUser } from '~/services/api/user/user.service';

import BlogCard from '~/components/ui/BlogCard/BlogCard';

type BlogPost = BlogListResponse['data'][0];

function MyBlogs() {
  const [blogs, setBlogs] = React.useState<BlogPost[]>([]);

  React.useEffect(() => {
    async function fetchBlog() {
      try {
        const { data: user } = await getUser();
        const blogData = await getUserBlogs(user.userId);

        const mappedBlogs = blogData.data.map((blog: any) => ({
          id: blog._id,
          coverImage: blog.coverImage,
          title: blog.title,
          slug: blog.slug,
          summary: blog.summary,
          author: {
            avatar: blog.user?.avatar,
            nickName: blog.user?.nickName,
          },
          createdAt: blog.createdAt,
        }));

        setBlogs(mappedBlogs);
        console.log('Blog Data', mappedBlogs);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    }

    fetchBlog();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">My Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>
    </div>
  );
}

export default MyBlogs;

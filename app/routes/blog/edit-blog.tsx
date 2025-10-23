import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import blog from '../../lang/en/blog';
import {
  getBlogDetail,
  updateBlog,
} from '../../services/api/blog/blog.service';
import TagSelector from '../../components/ui/TagSelector';
import { parseJwt } from '../../utils/jwt';

interface ToastState {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

export default function EditBlog() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content_html: '',
    tags: [] as string[],
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [currentCoverImage, setCurrentCoverImage] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    type: 'success',
    message: '',
  });

  // Fetch blog detail when component mounts
  useEffect(() => {
    const fetchBlogDetail = async () => {
      if (!slug) {
        navigate('/');
        return;
      }

      try {
        setIsLoading(true);
        const response = await getBlogDetail(slug);

        if (response.success) {
          const blogData = response.data;

          // Check if current user is the owner of the blog
          const token = localStorage.getItem('token');
          if (token) {
            const decoded = parseJwt(token);
            const currentUserId = decoded?.sub;

            if (currentUserId !== blogData.author.userId) {
              showToast(
                'error',
                'You do not have permission to edit this blog'
              );
              setTimeout(() => {
                navigate(`/blog/${slug}`);
              }, 2000);
              return;
            }
          }

          setFormData({
            title: blogData.title,
            summary: blogData.summary,
            content_html: blogData.contentHtml,
            tags: blogData.tags,
          });
          setCurrentCoverImage(blogData.coverImage);
          setImagePreview(blogData.coverImage);
        }
      } catch (error) {
        console.error('Error fetching blog detail:', error);
        showToast('error', 'Failed to load blog data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogDetail();
  }, [slug, navigate]);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: 'success', message: '' });
      if (type === 'success') {
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    }, 3000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleEditorChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content_html: content }));
    if (errors.content_html) {
      setErrors((prev) => ({ ...prev, content_html: '' }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagsChange = (tags: string[]) => {
    setFormData((prev) => ({ ...prev, tags }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = blog.validation.titleRequired;
    }
    if (!formData.content_html.trim()) {
      newErrors.content_html = blog.validation.contentRequired;
    }
    if (!formData.summary.trim()) {
      newErrors.summary = blog.validation.summaryRequired;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !slug) return;

    try {
      setIsSubmitting(true);

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content_html', formData.content_html);
      formDataToSend.append('summary', formData.summary);

      if (coverImage) {
        formDataToSend.append('coverImage', coverImage);
      }

      formData.tags.forEach((tag) => {
        formDataToSend.append('tags[]', tag);
      });

      const response = await updateBlog(slug, formDataToSend);

      if (response.success) {
        showToast('success', 'Blog updated successfully!');
      } else {
        throw new Error(response.message || 'Failed to update blog post');
      }
    } catch (error) {
      console.error('Error updating blog post:', error);
      showToast('error', 'Failed to update blog post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          } text-white`}
        >
          <div className="flex items-center space-x-2">
            <span>{toast.message}</span>
            {toast.type === 'success' && (
              <span className="text-sm opacity-80">
                (Redirecting to home in 3s...)
              </span>
            )}
          </div>
        </div>
      )}

      {/* Header with Title and Update Button */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Edit Blog Post</h1>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Updating...' : 'Update Blog'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {blog.form.title}
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder={blog.form.titlePlaceholder}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {blog.form.summary}
              </label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleInputChange}
                placeholder={blog.form.summaryPlaceholder}
                rows={4}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
              />
              {errors.summary && (
                <p className="text-red-500 text-sm mt-1">{errors.summary}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {blog.form.coverImage}
              </label>
              <div className="space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600"
                />
                {imagePreview && (
                  <div className="space-y-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    {!coverImage && currentCoverImage && (
                      <span className="text-xs text-gray-400">
                        Current image
                      </span>
                    )}
                    {coverImage && (
                      <span className="text-xs text-green-400">
                        New image selected
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {blog.form.tags}
              </label>
              <TagSelector
                selectedTags={formData.tags}
                onTagsChange={handleTagsChange}
                placeholder="Search and select tags..."
              />
            </div>
          </div>
          <div className="lg:col-span-2">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {blog.form.content}
              </label>
              <Editor
                apiKey="sbay189tsx7gougpz6wk7vas0bdeqj4afwdiya8p9n4ap6mx"
                value={formData.content_html}
                init={{
                  height: 700,
                  menubar: false,
                  plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'preview',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'code',
                    'help',
                    'wordcount',
                  ],
                  toolbar:
                    'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style:
                    'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; }',
                  skin: 'oxide-dark',
                  content_css: 'dark',
                }}
                onEditorChange={handleEditorChange}
              />
              {errors.content_html && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.content_html}
                </p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

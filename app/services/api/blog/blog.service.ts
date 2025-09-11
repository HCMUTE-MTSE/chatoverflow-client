import axios from 'axios';

const API_URL = 'http://localhost:3000/blog';

export interface BlogListResponse {
  success: boolean;
  message: string;
  data: Array<{
    id: string;
    coverImage: string;
    title: string;
    slug: string;
    summary: string;
    author: {
      avatar: string;
      nickName: string;
    };
    createdAt: string;
  }>;
  pagination: {
    page: number;
    limit: number;
    nextUrl: string | null;
  };
}

export interface BlogDetailResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    coverImage: string;
    title: string;
    contentHtml: string;
    summary: string;
    author: {
      avatar: string;
      nickName: string;
    };
    createdAt: string;
    tags: string[];
    upvotes: number;
    downvotes: number;
  };
}

export const getBlogList = async (page: number = 1) => {
  const response = await axios.get<BlogListResponse>(`${API_URL}?page=${page}`);
  return response.data;
};

export const getBlogDetail = async (slug: string) => {
  const response = await axios.get<BlogDetailResponse>(`${API_URL}/${slug}`);
  return response.data;
};

export const createBlog = async (formData: FormData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await axios.post(`${API_URL}/create`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateBlog = async (slug: string, formData: FormData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await axios.put(`${API_URL}/${slug}/edit`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

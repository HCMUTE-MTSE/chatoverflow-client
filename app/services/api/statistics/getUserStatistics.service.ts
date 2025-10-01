import axios from 'axios';
import type { UserStatisticsData } from '~/components/page/statistics/UserSatistics';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Helper function to get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export interface UserStatisticsResponse {
  success: boolean;
  data: UserStatisticsData;
  message?: string;
}

export const getUserStatistics = async (): Promise<UserStatisticsData> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/statistics`, {
      headers: {
        ...getAuthHeaders(),
      },
    });

    return response.data.data || response.data;
  } catch (error) {
    console.error('Error fetching user statistics:', error);

    // Generate sample daily data for GitHub-style chart
    const generateDailyData = () => {
      const data = [];
      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(endDate.getMonth() - 12); // 12 months of data

      const currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        // Generate random activity with some days having no activity
        const hasActivity = Math.random() > 0.3; // 70% chance of having activity
        const questions = hasActivity ? Math.floor(Math.random() * 3) : 0;
        const answers = hasActivity ? Math.floor(Math.random() * 5) : 0;
        const blogs = hasActivity ? Math.floor(Math.random() * 2) : 0;

        data.push({
          date: dateStr,
          questions,
          answers,
          blogs,
          total: questions + answers + blogs,
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }

      return data;
    };

    // Return mock data for now (until backend API is implemented)
    return {
      totalQuestions: 24,
      totalBlogs: 12,
      totalAnswers: 86,
      totalViews: 15420,
      totalVotes: 342,
      joinDate: 'Jan 2024',
      historyData: generateDailyData(),
    };
  }
};

import axios from 'axios';
import type { ApiResponse } from '~/models/res/api.response';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Question {
   _id: string;
   title: string;
   content: string;
   tags: string[];
   views: number;
   upvotedBy: string[];
   downvotedBy: string[];
   user: {
      _id: string;
      name: string;
      avatar: string;
   };
   askedTime: string;
   createdAt: string;
   updatedAt: string;
   answerCount?: number;
}

export async function getQuestionsByType(type: string): Promise<Question[]> {
   console.log(`Fetching questions (${type}): `);
   console.log(`API_BASE_URL: `, API_BASE_URL);
   try {
      const response = await axios.get<ApiResponse<Question[]>>(
         `${API_BASE_URL}/question/${type}`
      );
      return response.data.data || [];
   } catch (error) {
      console.error(`Failed to fetch questions (${type}):`, error);
      return [];
   }
}

export async function getQuestionDetail(
   id: string | undefined
): Promise<Question | null> {
   console.log(`Fetching question detail (id=${id})`);
   try {
      const response = await axios.get<ApiResponse<Question>>(
         `${API_BASE_URL}/question/detail/${id}`
      );
      return response.data.data || null;
   } catch (error) {
      console.error(
         `Faliure raised while fetching question detail, in question.service (id=${id}):`,
         error
      );
      return null;
   }
}

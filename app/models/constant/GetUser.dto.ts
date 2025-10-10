export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
  questionsCount?: number;
  answersCount?: number;
  email?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

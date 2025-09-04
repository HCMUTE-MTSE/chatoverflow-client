export interface User {
  name: string;
  avatar: string;
}

export interface EditQuestionCardProps {
  title?: string;
  tags?: string[];
  user?: User;
  time?: string;
  votes?: number;
  answers?: number;
  views?: number;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

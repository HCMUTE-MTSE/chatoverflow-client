export interface User {
  name: string;
  avatar: string;
}

export interface SavedQuestionCardProps {
  title?: string;
  tags?: string[];
  user?: User;
  time?: string;
  votes?: number;
  answers?: number;
  views?: number;
  onClick?: () => void;
  onSave?: () => void;
}

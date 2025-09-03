import {
  QuestionCardEditIcon,
  QuestionCardDeleteIcon,
} from "../../../../../libs/icons";

interface CardHeaderProps {
  title: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function CardHeader({
  title,
  onEdit,
  onDelete,
}: CardHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-3">
      <h2 className="text-lg font-semibold flex-1">{title}</h2>
      <div className="flex gap-2">
        {onEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="card-header__button card-header__button--edit"
            title="Edit"
          >
            <QuestionCardEditIcon />
          </button>
        )}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="card-header__button card-header__button--delete"
            title="Delete"
          >
            <QuestionCardDeleteIcon />
          </button>
        )}
      </div>
    </div>
  );
}

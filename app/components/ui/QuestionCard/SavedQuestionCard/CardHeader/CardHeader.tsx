import { QuestionCardSavedIcon } from '../../../../../libs/icons';

interface CardHeaderProps {
  title: string;
  onSave?: () => void;
}

export default function CardHeader({ title, onSave }: CardHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-3">
      <h2 className="text-lg font-semibold flex-1 text-white">{title}</h2>
      {onSave && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave();
          }}
          className="card-header__button card-header__button--hover"
          title="Saved"
        >
          <QuestionCardSavedIcon />
        </button>
      )}
    </div>
  );
}

interface QuestionHeaderProps {
  title: string;
  onAskQuestion: () => void;
}

export default function Header({ title, onAskQuestion }: QuestionHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-5">
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
      <button
        onClick={onAskQuestion}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-5 rounded transition-colors"
      >
        Ask a Question
      </button>
    </div>
  );
}

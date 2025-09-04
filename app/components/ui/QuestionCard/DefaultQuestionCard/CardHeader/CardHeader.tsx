interface CardHeaderProps {
  title: string;
}

export default function CardHeader({ title }: CardHeaderProps) {
  return <h2 className="text-xl font-semibold mb-3 text-white">{title}</h2>;
}

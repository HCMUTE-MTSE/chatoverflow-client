import Card from '../Card';
import CardHeader from '../CardHeader';
import CardTags from '../CardTags';
import CardFooter from '../CardFooter';
import type { EditQuestionCardProps } from '../type';

export default function EditQuestionCard(props: EditQuestionCardProps) {
  const {
    title = 'The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this',
    tags = ['JAVASCRIPT', 'REACT.JS', 'INVALID FIELDS', 'SALESFORCE'],
    user = { name: 'Satheesh', avatar: '/avatar.png' },
    time = '2 mins ago',
    votes = 1200,
    answers = 900,
    views = 5200,
    onEdit,
    onDelete,
    onClick,
  } = props;

  return (
    <Card onClick={onClick}>
      <CardHeader title={title} onEdit={onEdit} onDelete={onDelete} />
      <CardTags tags={tags} />
      <CardFooter
        user={user}
        time={time}
        votes={votes}
        answers={answers}
        views={views}
      />
    </Card>
  );
}

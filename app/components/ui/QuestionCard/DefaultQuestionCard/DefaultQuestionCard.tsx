import React from "react";
import styles from "./DefaultQuestionCard.module.css";
import {
  QuestionCardLikeIcon,
  QuestionCardAnswerIcon,
  QuestionCardViewIcon,
} from "../../../../libs/icons";

interface DefaultQuestionCardProps {
  title?: string;
  tags?: string[];
  user?: { name: string; avatar: string };
  time?: string;
  votes?: number;
  answers?: number;
  views?: number;
  onClick?: () => void;
}

const DefaultQuestionCard: React.FC<DefaultQuestionCardProps> = ({
  title = "The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this",
  tags = ["JAVASCRIPT", "REACT.JS", "INVALID FIELDS", "SALESFORCE"],
  user = { name: "Satheesh", avatar: "/avatar.png" },
  time = "2 mins ago",
  votes = 1200,
  answers = 900,
  views = 5200,
  onClick,
}) => (
  <div className={styles.card} onClick={onClick}>
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
    </div>
    <div className={styles.tags}>
      {tags.map((tag) => (
        <span key={tag} className={styles.tag}>
          {tag}
        </span>
      ))}
    </div>
    <div className={styles.footer}>
      <img src={user.avatar} alt={user.name} className={styles.avatar} />
      <span className={styles.user}>{user.name}</span>
      <span className={styles.time}>• asked {time}</span>
      <span className={styles.stats}>
        <span className={styles.stat}>
          <QuestionCardLikeIcon /> {votes.toLocaleString()} Votes
        </span>
        <span className={styles.stat}>
          <QuestionCardAnswerIcon /> {answers} Answers
        </span>
        <span className={styles.stat}>
          <QuestionCardViewIcon /> {views.toLocaleString()} Views
        </span>
      </span>
    </div>
  </div>
);

export default DefaultQuestionCard;

import React from "react";
import Card from "../Card";
import CardHeader from "../CardHeader";
import CardTags from "../CardTags";
import CardFooter from "../CardFooter";
import type { SavedQuestionCardProps } from "../type";

export default function SavedQuestionCard(props: SavedQuestionCardProps) {
  const {
    title = "The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this",
    tags = ["JAVASCRIPT", "REACT.JS", "INVALID FIELDS", "SALESFORCE"],
    user = { name: "Satheesh", avatar: "/avatar.png" },
    time = "2 mins ago",
    votes = 1200,
    answers = 900,
    views = 5200,
    onClick,
    onSave,
  } = props;

  return (
    <Card onClick={onClick}>
      <CardHeader title={title} onSave={onSave} />
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

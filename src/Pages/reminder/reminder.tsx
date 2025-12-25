import React from "react";
import { useParams } from "react-router-dom";

export const Reminder = () => {
  const id = useParams().id;
  console.log("id:", id);
  return <div>remindeR</div>;
};

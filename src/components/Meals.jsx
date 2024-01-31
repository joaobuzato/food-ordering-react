import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";

export default function Meals() {
  const { data, isLoading, error } = useHttp(
    "http://localhost:8080/meals",
    {},
    []
  );

  return (
    <ul id="meals">
      {data.map((meal) => {
        return <MealItem key={meal.id} meal={meal}></MealItem>;
      })}
    </ul>
  );
}

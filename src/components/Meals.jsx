import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Meals() {
  const [isLoading, setIsLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  async function fetchMeals() {
    const response = await fetch("http://localhost:8080/meals");

    if (!response.ok) {
      //
    }
    const resData = await response.json();
    setMeals(resData);
  }

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {meals.map((meal) => {
        return <MealItem key={meal.id} meal={meal}></MealItem>;
      })}
    </ul>
  );
}

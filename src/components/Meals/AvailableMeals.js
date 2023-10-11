import Card from "../UI/Card";
import { useEffect, useState } from "react";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meal, setmeals] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [httpError, setHttpError] = useState();


  useEffect(() => {
  
    const fetchMeals = async () => {
  
      const response = await fetch(
        "https://food-order-a3669-default-rtdb.firebaseio.com/meals.json"
      );


      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();
      const loadedData = [];


      for (const key in responseData) {
        loadedData.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setmeals(loadedData);
      setIsloading(false);
    };
    fetchMeals().catch((error) => {
      setIsloading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealLoading}>
        <h3>Loading....</h3>
      </section>
    );
  }

  if(httpError){
    return(
     <section className={classes.mealError}>
      <h2>{httpError}</h2>
     </section>
    )
  }

  const mealsList = meal.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

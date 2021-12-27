import React, {useEffect, useState} from "react";
import classes from './AvailableMeals.module.css';
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorHttp, setHttpError] = useState();

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://learn-react-c17bf-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            const responseData = await response.json();
            const loadedMeals = [];
            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                })
            }
            setMeals(loadedMeals);
            setIsLoading(false);
        }

        fetchMeals().catch(error => {
            setIsLoading(false);
            setHttpError('Something went wrong!');
        });

    }, []);

    if (isLoading) {
        return <section className={classes.mealsLoading}>
            <p>Loading</p>
        </section>
    }

    if (errorHttp) {
        return <section className={classes.mealsError}>
            <p>{errorHttp}</p>
        </section>
    }

    const mealsList = meals.map(meal => <MealItem key={meal.id}
                                                  name={meal.name}
                                                  description={meal.description}
                                                  price={meal.price}/>);
    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
}

export default AvailableMeals;

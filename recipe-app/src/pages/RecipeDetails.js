import {
    useEffect,
    useState
} from "react";

import axios from "axios";

import {
    useParams
} from "react-router-dom";


function RecipeDetails() {

    const { id } =
        useParams();

    const [recipe, setRecipe] =
        useState(null);

    const [error, setError] =
        useState("");


    useEffect(() => {

        const loadRecipe = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                console.log(
                    "Recipe ID:",
                    id
                );

                console.log(
                    "Token:",
                    token
                );


                const response =
                    await axios.get(

                        `http://127.0.0.1:8000/api/recipes/${id}/`,

                        {
                            headers: {

                                Authorization:
                                    `Token ${token}`

                            }

                        }

                    );


                console.log(
                    "Recipe response:",
                    response.data
                );


                setRecipe(
                    response.data
                );

            }

            catch (error) {

                console.log(
                    "Status:",
                    error.response?.status
                );

                console.log(
                    "Django error:",
                    error.response?.data
                );

                setError(
                    "Unable to load recipe."
                );

            }

        };


        loadRecipe();

    }, [id]);


    if (error) {

        return (

            <p>
                {error}
            </p>

        );

    }


    if (!recipe) {

        return (

            <p>
                Loading recipe details...
            </p>

        );

    }


    return (

        <div>

            <h2>
                {recipe.title}
            </h2>


            {recipe.image && (

                <img
                    src={
                        `http://127.0.0.1:8000${recipe.image}`
                    }
                    className="img-fluid mb-4"
                    alt={recipe.title}
                     style={{ width: "50%", height: "400px", objectFit: "fit" }}
                />

            )}


            <p>

                <strong>
                    Created by:
                </strong>

                {" "}

                {recipe.creator}

            </p>


            <p>

                <strong>
                    Cooking Time:
                </strong>

                {" "}

                {recipe.cooking_time}

                {" "}

                minutes

            </p>


            <p>

                <strong>
                    Difficulty:
                </strong>

                {" "}

                {recipe.difficulty_level}

            </p>


            <p>

                <strong>
                    Views:
                </strong>

                {" "}

                {recipe.view_count}

            </p>


            <h4>
                Ingredients
            </h4>

            <p>
                {recipe.ingredients}
            </p>


            <h4>
                Steps
            </h4>

            <p>
                {recipe.steps}
            </p>

        </div>

    );

}


export default RecipeDetails;
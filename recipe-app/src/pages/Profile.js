import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";


function Profile() {

    const [profile, setProfile] =
        useState({
            recipes: []
        });


    useEffect(() => {

        loadProfile();

    }, []);


    const loadProfile = async () => {

        const token =
            localStorage.getItem("token");


        try {

            const response =
                await axios.get(
                    "http://127.0.0.1:8000/api/profile/",
                    {
                        headers: {
                            Authorization:
                                `Token ${token}`
                        }
                    }
                );


            setProfile(response.data);

        } catch (error) {

            console.error(
                "Error loading profile:",
                error
            );

        }

    };


    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this recipe?"
            );


        if (!confirmed) {

            return;

        }


        const token =
            localStorage.getItem("token");


        await axios.delete(

            `http://127.0.0.1:8000/api/recipes/${id}/`,

            {
                headers: {

                    "Authorization":
                        `Token ${token}`

                }

            }

        );


        loadProfile();

    };


    return (

        <div className="container mt-4">

            <h3>
                My Recipes
            </h3>


            <div className="row">

                {profile.recipes.map(

                    recipe => (

                        <div
                            className="col-md-6 mb-4"
                            key={recipe.id}
                        >

                            <RecipeCard

                                recipe={recipe}

                                showActions={true}

                                onDelete={handleDelete}

                            />

                        </div>

                    )

                )}

            </div>

        </div>

    );

}


export default Profile;
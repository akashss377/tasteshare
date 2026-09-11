import RecipeCard from "../components/RecipeCard";

import {
    useState,
    useEffect
} from "react";

import axios from "axios";


function RecipeList() {

    const [search, setSearch] =
        useState("");

    const [recipes, setRecipes] =
        useState([]);


    useEffect(() => {

        loadRecipes();

    }, []);


    const loadRecipes = async (
        keyword = ""
    ) => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await axios.get(
                    "http://127.0.0.1:8000/api/recipes/",
                    {
                        params: {
                            search: keyword
                        },

                        headers: {
                            Authorization:
                                `Token ${token}`
                        }
                    }
                );

            setRecipes(
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

        }

    };


    const handleSearch = (
        event
    ) => {

        event.preventDefault();

        loadRecipes(search);

    };


    return (

        <div className="container py-5">

            {/* HEADER */}

            <div className="text-center mb-5">

                <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">

                    DISCOVER • COOK • ENJOY

                </span>


                <h1 className="display-4 fw-bold mt-3 mb-3">

                    Explore Our{" "}

                    <span className="text-primary">
                        Recipes
                    </span>

                </h1>


                <p className="text-muted mx-auto w-75 lead">

                    Discover delicious recipes, explore
                    new flavors and find the perfect dish
                    for your next meal.

                </p>

            </div>


            {/* SEARCH */}

            <div className="row justify-content-center mb-5">

                <div className="col-lg-8">

                    <form
                        onSubmit={handleSearch}
                    >

                        <div className="input-group input-group-lg shadow-sm">

                            <span className="input-group-text bg-white border-end-0">

                                🔍

                            </span>


                            <input
                                type="text"
                                className="form-control border-start-0"
                                placeholder="Search delicious recipes..."
                                value={search}
                                onChange={
                                    event =>
                                        setSearch(
                                            event.target.value
                                        )
                                }
                            />


                            <button
                                type="submit"
                                className="btn btn-primary px-4"
                            >

                                Search

                            </button>

                        </div>

                    </form>

                </div>

            </div>


            {/* LATEST RECIPES TITLE */}

            <div className="d-flex justify-content-between align-items-end mb-4">

                <div>

                    <small className="text-primary fw-bold">

                        OUR COLLECTION

                    </small>


                    <h2 className="fw-bold mb-1 mt-2">

                        Latest Recipes

                    </h2>


                    <p className="text-muted mb-0">

                        Fresh recipes waiting for you to discover

                    </p>

                </div>


                <span className="badge bg-primary rounded-pill fs-6 px-3 py-2">

                    {recipes.length} Recipes

                </span>

            </div>


            {/* RECIPES */}

            {recipes.length > 0 ? (

                <div className="row g-4">

                    {recipes.map(
                        recipe => (

                            <div
                                className="col-xl-4 col-lg-4 col-md-6"
                                key={recipe.id}
                            >

                                <RecipeCard
                                    recipe={recipe}
                                />

                            </div>

                        )
                    )}

                </div>

            ) : (

                <div className="text-center py-5">

                    <div
                        className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center"
                        style={{
                            width: "110px",
                            height: "110px"
                        }}
                    >

                        <span className="display-5">
                            🍽️
                        </span>

                    </div>


                    <h3 className="fw-bold mt-4">

                        No Recipes Found

                    </h3>


                    <p className="text-muted">

                        Try searching for another recipe.

                    </p>

                </div>

            )}

        </div>

    );

}


export default RecipeList;
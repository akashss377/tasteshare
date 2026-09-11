import {
    useEffect,
    useState
} from "react";

import axios from "axios";

import {
    useNavigate,
    useParams
} from "react-router-dom";


function EditRecipe() {

    const { id } =
        useParams();

    const navigate =
        useNavigate();


    const [form, setForm] =
        useState({

            title: "",
            ingredients: "",
            steps: "",
            cooking_time: "",
            difficulty_level: "Easy"

        });


    const [image, setImage] =
        useState(null);


    useEffect(() => {

        const loadRecipe = async () => {

            try {

                const token =
                    localStorage.getItem("token");


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


                const recipe =
                    response.data;


                setForm({

                    title:
                        recipe.title || "",

                    ingredients:
                        recipe.ingredients || "",

                    steps:
                        recipe.steps || "",

                    cooking_time:
                        recipe.cooking_time || "",

                    difficulty_level:
                        recipe.difficulty_level || "Easy"

                });

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


        loadRecipe();

    }, [id]);


    const handleChange = (event) => {

        setForm({

            ...form,

            [event.target.name]:
                event.target.value

        });

    };


    const handleSubmit = async (event) => {

        event.preventDefault();


        try {

            const token =
                localStorage.getItem("token");


            const formData =
                new FormData();


            formData.append(
                "title",
                form.title
            );


            formData.append(
                "ingredients",
                form.ingredients
            );


            formData.append(
                "steps",
                form.steps
            );


            formData.append(
                "cooking_time",
                form.cooking_time
            );


            formData.append(
                "difficulty_level",
                form.difficulty_level
            );


            if (image) {

                formData.append(
                    "image",
                    image
                );

            }


            await axios.put(

                `http://127.0.0.1:8000/api/recipes/${id}/`,

                formData,

                {
                    headers: {

                        Authorization:
                            `Token ${token}`

                    }

                }

            );


            alert(
                "Recipe updated successfully"
            );


            navigate("/profile");

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

            alert(
                JSON.stringify(
                    error.response?.data
                )
            );

        }

    };


    return (

        <div>

            <h2>
                Edit Recipe
            </h2>


            <form
                onSubmit={handleSubmit}
            >

                <div className="form-group">

                    <label>
                        Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={form.title}
                        onChange={handleChange}
                    />

                </div>


                <div className="form-group">

                    <label>
                        Ingredients
                    </label>

                    <textarea
                        name="ingredients"
                        className="form-control"
                        rows="5"
                        value={form.ingredients}
                        onChange={handleChange}
                    />

                </div>


                <div className="form-group">

                    <label>
                        Steps
                    </label>

                    <textarea
                        name="steps"
                        className="form-control"
                        rows="7"
                        value={form.steps}
                        onChange={handleChange}
                    />

                </div>


                <div className="form-group">

                    <label>
                        Cooking Time
                    </label>

                    <input
                        type="number"
                        name="cooking_time"
                        className="form-control"
                        value={form.cooking_time}
                        onChange={handleChange}
                    />

                </div>


                <div className="form-group">

                    <label>
                        Difficulty Level
                    </label>

                    <select
                        name="difficulty_level"
                        className="form-control"
                        value={form.difficulty_level}
                        onChange={handleChange}
                    >

                        <option value="Easy">
                            Easy
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="Hard">
                            Hard
                        </option>

                    </select>

                </div>


                <div className="form-group">

                    <label>
                        Recipe Image
                    </label>

                    <input
                        type="file"
                        className="form-control-file"
                        onChange={
                            event =>
                                setImage(
                                    event.target.files[0]
                                )
                        }
                    />

                </div>


                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Update Recipe
                </button>

            </form>

        </div>

    );

}


export default EditRecipe;
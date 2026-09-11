import {
    Link
} from "react-router-dom";



function RecipeCard({
    recipe,
    showActions = false,
    onDelete
}) {

    return (

        <div className="card h-100">

            <div className="card-body">

                <h5 className="card-title">
                    {recipe.title}
                </h5>

                <p className="card-text">
                    By{" "}
                    {recipe.creator}
                </p>

                <p className="card-text">
                    Cooking Time:
                    {" "}
                    {recipe.cooking_time}
                    {" "}
                    minutes
                </p>

                <p className="card-text">
                    Difficulty:
                    {" "}
                    {recipe.difficulty_level}
                </p>

                <p className="card-text">
                    Views:
                    {" "}
                    {recipe.view_count}
                </p>

                <Link
                    to={`/recipes/${recipe.id}`}
                    className="btn btn-primary"
                >
                    View Recipe
                </Link>


                {showActions && (

    <div className="mt-3">

        <Link
            to={`/recipes/edit/${recipe.id}`}
            className="btn btn-warning mr-2"
        >
            Edit
        </Link>

        <button
            className="btn btn-danger"
            onClick={() =>
                onDelete(recipe.id)
            }
        >
            Delete
        </button>

    </div>

)}

            </div>

        </div>
    );
}


export default RecipeCard;
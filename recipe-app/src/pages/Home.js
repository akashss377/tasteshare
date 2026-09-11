import {
    Link
} from "react-router-dom";


function Home() {

    return (

        <div>

            <div className="jumbotron">

                <h1 className="display-4">
                    Recipe Sharing Platform
                </h1>

                <p className="lead">
                    Discover and share delicious recipes.
                </p>

                <hr className="my-4" />

                <p>
                    Explore recipes shared by our
                    cooking community.
                </p>

                <Link
                    to="/recipes"
                    className="btn btn-primary"
                >
                    View Recipes
                </Link>

            </div>

        </div>
    );
}

export default Home;
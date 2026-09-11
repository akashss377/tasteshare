import {
    Link
} from "react-router-dom";
import {
    useSelector,
    useDispatch
} from "react-redux";
import {
    useNavigate
} from "react-router-dom";
import axios from "axios";


function Navigation() {

    const isLoggedIn =
        useSelector(
            state =>
                state.auth.isLoggedIn
        );
    const dispatch =
        useDispatch();


    const navigate =
        useNavigate();
    const handleLogout = async () => {

        const token =
            localStorage.getItem(
                "token"
            );


        await axios.post(

            "http://127.0.0.1:8000/api/logout/",

            {},

            {
                headers: {

                    "Authorization":
                        `Token ${token}`

                }

            }

        );


        localStorage.removeItem(
            "token"
        );


        dispatch({

            type: "LOGOUT"

        });


        navigate("/login");
    };


    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">

            <div className="container">

                <Link
                    className="navbar-brand"
                    to="/"
                >
                    Recipe Sharing
                </Link>


                <div className="navbar-nav">

                    <Link
                        className="nav-link"
                        to="/"
                    >
                        Home
                    </Link>


                    <Link
                        className="nav-link"
                        to="/recipes"
                    >
                        Recipes
                    </Link>


                    {isLoggedIn && (

                        <>

                            <Link
                                className="nav-link"
                                to="/profile"
                            >
                                Profile
                            </Link>


                            <Link
                                className="nav-link"
                                to="/recipes/create"
                            >
                                Create Recipe
                            </Link>


                            <Link
                                className="nav-link"
                                to="/change-password"
                            >
                                Change Password
                            </Link>
                            <button
                                className="btn btn-link nav-link"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>

                        </>

                    )}


                    {!isLoggedIn && (

                        <>

                            <Link
                                className="nav-link"
                                to="/login"
                            >
                                Login
                            </Link>


                            <Link
                                className="nav-link"
                                to="/register"
                            >
                                Register
                            </Link>

                        </>

                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navigation;
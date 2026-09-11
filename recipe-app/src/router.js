import {
    createBrowserRouter
} from "react-router-dom";

import App from "./App";

import Home
    from "./pages/Home";

import RecipeList
    from "./pages/RecipeList";

import Register
    from "./pages/Register";

import Login
    from "./pages/Login";
import RecipeDetails
    from "./pages/RecipeDetails";
import Profile
    from "./pages/Profile";
import CheckAuth
    from "./auth/checkAuth";
import CreateRecipe
    from "./pages/CreateRecipe";
import EditRecipe
    from "./pages/EditRecipe";
import ChangePassword
    from "./pages/ChangePassword";
const router =
    createBrowserRouter([

        {

            path: "",

            element: <App />,

            children: [

                {

                    path: "",

                    element: <Home />

                },

                {

                    path: "recipes",

                    element: <RecipeList />

                },

                {

                    path: "register",

                    element: <Register />

                },

                {

                    path: "login",

                    element: <Login />

                },
                {
                    path: "recipes/:id",
                    element: <RecipeDetails />
                },
                {
                    path: "profile",
                    element: <Profile />
                },
                {
                    path: "profile",
                    element: (
                        <CheckAuth>
                            <Profile />
                        </CheckAuth>
                    )
                },
                {
                    path: "recipes/create",

                    element: (
                        <CheckAuth>
                            <CreateRecipe />
                        </CheckAuth>
                    )
                },
                {
                    path: "recipes/edit/:id",

                    element: (
                        <CheckAuth>
                            <EditRecipe />
                        </CheckAuth>
                    )
                },
                {
                    path: "change-password",

                    element: (
                        <CheckAuth>
                            <ChangePassword />
                        </CheckAuth>
                    )
                }


            ]

        }

    ]);


export default router;
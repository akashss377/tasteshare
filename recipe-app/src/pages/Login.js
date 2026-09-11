import { useState } from "react";

import axios from "axios";

import {
    useDispatch
} from "react-redux";

import {
    useNavigate
} from "react-router-dom";


function Login() {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");


    const dispatch =
        useDispatch();

    const navigate =
        useNavigate();


    const handleSubmit = async (event) => {

    event.preventDefault();

    try {

        const response = await axios.post(
            "http://127.0.0.1:8000/api/login/",
            {
                email: email,
                password: password
            }
        );

        const data = response.data;

        console.log("Login response:", data);

        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(
            "userId",
            data.user_id
        );

        dispatch({
            type: "LOGIN",
            payload: {
                token: data.token,
                userId: data.user_id
            }
        });

        navigate("/recipes");

    } catch (error) {

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

        <div className="row justify-content-center">

            <div className="col-md-5">

                <h2 className="mb-4">
                    Login
                </h2>


                <form
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={
                                event =>
                                    setEmail(
                                        event.target.value
                                    )
                            }
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={
                                event =>
                                    setPassword(
                                        event.target.value
                                    )
                            }
                        />

                    </div>


                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>

    );

}


export default Login;
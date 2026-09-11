import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();


    const handleChange = (event) => {

        setForm({
            ...form,
            [event.target.name]: event.target.value
        });

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setMessage("");

        setError("");

        try {

            await axios.post(
                "http://127.0.0.1:8000/api/register/",
                form
            );

            setMessage(
                "Registration successful! Redirecting to login..."
            );

            setForm({
                first_name: "",
                last_name: "",
                email: "",
                password: ""
            });

            setTimeout(() => {

                navigate("/login");

            }, 2000);

        } catch (error) {

            console.log(
                "Register Error:",
                JSON.stringify(
                    error.response?.data,
                    null,
                    2
                )
            );

            if (error.response?.data?.email) {

                setError(
                    error.response.data.email[0]
                );

            } else if (error.response?.data?.first_name) {

                setError(
                    error.response.data.first_name[0]
                );

            } else if (error.response?.data?.last_name) {

                setError(
                    error.response.data.last_name[0]
                );

            } else if (error.response?.data?.password) {

                setError(
                    error.response.data.password[0]
                );

            } else {

                setError(
                    "Registration failed. Please try again."
                );

            }

        }

    };


    return (

        <div className="row justify-content-center">

            <div className="col-md-7">

                <h2 className="mb-4">
                    Create Account
                </h2>


                {message && (

                    <div className="alert alert-success">

                        {message}

                    </div>

                )}


                {error && (

                    <div className="alert alert-danger">

                        {error}

                    </div>

                )}


                <form onSubmit={handleSubmit}>

                    <div className="form-row">

                        <div className="form-group col-md-6">

                            <label>
                                First Name
                            </label>

                            <input
                                type="text"
                                name="first_name"
                                className="form-control"
                                value={form.first_name}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        <div className="form-group col-md-6">

                            <label>
                                Last Name
                            </label>

                            <input
                                type="text"
                                name="last_name"
                                className="form-control"
                                value={form.last_name}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>


                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Register
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Register;
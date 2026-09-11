import {
    useState
} from "react";

import axios from "axios";
function ChangePassword() {

    const [
        currentPassword,
        setCurrentPassword
    ] = useState("");


    const [
        newPassword,
        setNewPassword
    ] = useState("");


    const [
        confirmPassword,
        setConfirmPassword
    ] = useState("");


    const [error, setError] =
        useState("");


    const [message, setMessage] =
        useState("");


    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        setMessage("");


        if (
            newPassword !==
            confirmPassword
        ) {

            setError(
                "New passwords do not match."
            );

            return;
        }


        const token =
            localStorage.getItem(
                "token"
            );


        const response = await axios.put(

            "http://127.0.0.1:8000/api/change-password/",

            {
                current_password:
                    currentPassword,

                new_password:
                    newPassword
            },

            {
                headers: {

                    "Content-Type":
                        "application/json",

                    "Authorization":
                        `Token ${token}`

                }

            }

        );


        const data =
            response.data;


        if (
            response.status >= 200 &&
            response.status < 300
        ) {

            setMessage(
                "Password updated successfully."
            );


            setCurrentPassword("");

            setNewPassword("");

            setConfirmPassword("");

        } else {

            setError(

                data.current_password?.[0]
                ||
                data.new_password?.[0]
                ||
                "Unable to update password."

            );
        }
    };


    return (

        <div className="row justify-content-center">

            <div className="col-md-6">
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

                <h2 className="mb-4">
                    Change Password
                </h2>

                <form
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label>
                            Current Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            value={
                                currentPassword
                            }
                            onChange={
                                event =>
                                    setCurrentPassword(
                                        event.target.value
                                    )
                            }
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            New Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            value={
                                newPassword
                            }
                            onChange={
                                event =>
                                    setNewPassword(
                                        event.target.value
                                    )
                            }
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Confirm New Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            value={
                                confirmPassword
                            }
                            onChange={
                                event =>
                                    setConfirmPassword(
                                        event.target.value
                                    )
                            }
                        />

                    </div>


                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Change Password
                    </button>

                </form>

            </div>

        </div>
    );
}


export default ChangePassword;
import { React, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './error.css';

function ForgotPasswordPage() {

    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const btnEle = document.getElementById("btn_reset");
        btnEle.disabled = true;
        try {
            const url = `https://password-reset-sj.onrender.com/api/password-reset`;
            const { data } = await axios.post(url, { email });
            setMsg(data.message);
            setError("");
            btnEle.disabled = false;
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
                setMsg("");
                btnEle.disabled = false;
            }
        }
    };

    return (
        <div className="container">

            {/* Outer Row */}
            <div className="row justify-content-center">

                <div className="col-xl-10 col-lg-12 col-md-9">

                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            {/* Nested Row within Card Body */}
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                                            <p className="mb-4">We get it, stuff happens. Just enter your email address below
                                                and we'll send you a link to reset your password!</p>
                                        </div>
                                        <form className="user" onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    className="form-control form-control-user"
                                                    id="exampleInputEmail"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Email"
                                                    name="email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    value={email}
                                                    required
                                                ></input>
                                            </div>
                                            {error && <div className="error_msg">{error}</div>}
                                            {msg && <div className="success_msg">{msg}</div>}
                                            <button type="submit" id="btn_reset" className="btn btn-primary btn-user btn-block">
                                                Reset Password
                                            </button>
                                        </form>
                                        <hr></hr>
                                        <div className="text-center">
                                            <Link className="small" to="/register">Create an Account!</Link>
                                        </div>
                                        <div className="text-center">
                                            <Link className="small" to="/login">Already have an account? Login!</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default ForgotPasswordPage;

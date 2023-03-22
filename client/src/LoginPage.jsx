import React from 'react';
import { Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import './error.css';

function LoginPage() {

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [err, setErr] = useState("");

    const handleChange = ({ target: ip }) => {
        setData({ ...data, [ip.name]: ip.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const btnEle = document.getElementById("btn_login");
        btnEle.disabled = true;
        try {
            const url = "http://localhost:1000/api/auth";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            window.location = "/";
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500) {
                      setErr(error.response.data.message);
                      btnEle.disabled = false;
            }
        }
    }

    return (
        <div className="container">

            {/* Outer Row */}
            <div className="row justify-content-center">

                <div className="col-xl-10 col-lg-12 col-md-9">

                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            {/* Nested Row within Card Body */}
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <form className="user" onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    className="form-control form-control-user"
                                                    id="exampleInputEmail"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter Email Address..."
                                                    name="email"
                                                    onChange={handleChange}
                                                    value={data.email}
                                                    required
                                                ></input>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-user"
                                                    id="exampleInputPassword"
                                                    placeholder="Password"
                                                    name="password"
                                                    onChange={handleChange}
                                                    value={data.password}
                                                    required
                                                ></input>
                                            </div>
                                            {err && <div className="error_msg">{err}</div>}
                                            <button type="submit" id="btn_login" className="btn btn-primary btn-user btn-block">
                                                Login
                                            </button>
                                        </form>
                                        <hr></hr>
                                        <div className="text-center">
                                            <Link to="/forgot-password" className="small">Forgot Password?</Link>
                                        </div>
                                        <div className="text-center">
                                            <Link to="/register" className="small">Create an Account!</Link>
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

export default LoginPage;
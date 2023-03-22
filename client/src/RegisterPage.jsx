import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import './error.css';

function RegisterPage() {

    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [err, setErr] = useState("");
    const [msg, setMsg] = useState("");

    const navigate = useNavigate();
 
    const handleChange = ({ target: ip }) => {
         setInput({ ...input, [ip.name]: ip.value});    
    }

    const handleSubmit = async (e) => {
          e.preventDefault();
          const btnEle = document.getElementById("btn_register");
          btnEle.disabled = true;
          try {
              const url = "https://password-reset-sj.onrender.com/api/users";
              const { input: res } = await axios.post(url, input);
              navigate("/login");
              setMsg(res.message);
              btnEle.disabled = false;
          } catch (error) {
               if(error.response &&
                  error.response.status >= 400 &&
                  error.response.status <= 500) {
                       setErr(error.response.data.message);
                       btnEle.disabled = false;
                }
          }
    }

    return (
        <div className="container">

            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    {/* Nested Row within Card Body */}
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                </div>
                                <form className="user" onSubmit={handleSubmit}>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input 
                                                type="text" 
                                                className="form-control form-control-user" 
                                                id="exampleFirstName"
                                                placeholder="First Name"
                                                name="firstName"
                                                onChange={handleChange}
                                                value={input.firstName}
                                                required
                                            ></input>
                                        </div>
                                        <div className="col-sm-6">
                                            <input
                                                type="text"
                                                className="form-control form-control-user"
                                                id="exampleLastName"
                                                placeholder="Last Name"
                                                name="lastName"
                                                onChange={handleChange}
                                                value={input.lastName}
                                                required
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control form-control-user"
                                            id="exampleInputEmail"
                                            placeholder="Email"
                                            name="email"
                                            onChange={handleChange}
                                            value={input.email}
                                            required
                                        ></input>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input
                                                type="password"
                                                className="form-control form-control-user"
                                                id="exampleInputPassword"
                                                placeholder="Password"
                                                name="password"
                                                onChange={handleChange}
                                                value={input.password}
                                                required
                                            ></input>
                                        </div>
                                        <div className="col-sm-6">
                                            <input
                                                type="password"
                                                className="form-control form-control-user"
                                                id="exampleRepeatPassword"
                                                placeholder="Confirm Password"
                                                name="confirmPassword"
                                                onChange={handleChange}
                                                value={input.confirmPassword}
                                                required
                                            ></input>
                                        </div>
                                    </div>
                                    {err && <div className="error_msg">{err}</div>}
                                    {msg && <div className="success_msg">{msg}</div>}
                                    <button type="submit" id="btn_register" className="btn btn-primary btn-user btn-block">
                                        Register Account
                                    </button>
                                </form>
                                <hr></hr>
                                <div className="text-center">
                                    <Link className="small" to="/forgot-password">Forgot Password?</Link>
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
    )
}

export default RegisterPage;

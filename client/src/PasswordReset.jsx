import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import './error.css';

function PasswordResetPage() {

    const [validUrl, setValidUrl] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const param = useParams();
    const url = `https://password-reset-sj.onrender.com/api/password-reset/${param.id}/${param.token}`;

    useEffect(() => {
        const verifyUrl = async () => {
            try {
                await axios.get(url);
                setValidUrl(true);
            } catch (error) {
                setValidUrl(false);
            }
        }
        verifyUrl();
    }, [param, url]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const btnEle = document.getElementById("btn_submit");
        btnEle.disabled = true;
        try {
            const { data } = await axios.post(url, { password, confirmPassword });
            setMsg(data.message);
            setError("");
            window.location= "/login";
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500) {
                setError(error.response.data.message);
                setMsg("");
                btnEle.disabled = false;
            }
        }
    }

    return (
        <Fragment>
            {validUrl ? (
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
                                                    <h1 className="h4 text-gray-900 mb-4">Add New Password!</h1>
                                                </div>
                                                <form className="user" onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                        <input
                                                            type="password"
                                                            className="form-control form-control-user"
                                                            id="exampleInputEmail"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Password"
                                                            name="password"
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            value={password}
                                                            required
                                                        ></input>
                                                    </div>
                                                    <div className="form-group">
                                                        <input
                                                            type="password"
                                                            className="form-control form-control-user"
                                                            id="exampleInputPassword"
                                                            placeholder="Confirm Password"
                                                            name="confirmPassword"
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                            value={confirmPassword}
                                                            required
                                                        ></input>
                                                    </div>
                                                    {error && <div className="error_msg">{error}</div>}
                                                    {msg && <div className="success_msg">{msg}</div>}
                                                    <button type="submit" id="btn_submit" className="btn btn-primary btn-user btn-block">
                                                        Submit
                                                    </button>
                                                </form>
                                                <hr></hr>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            ) : (
                <h1>404 Not Found</h1>
            )}
        </Fragment>
    )
}

export default PasswordResetPage;

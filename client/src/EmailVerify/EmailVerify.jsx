import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../images/success.png";
import styles from "./styles.module.css";

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(false);
	const param = useParams();
    const url = `http://localhost:1000/api/users/${param.id}/verify/${param.token}`;

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		}
		verifyEmailUrl();
	}, [param, url]);

	console.log()

	return (
		<>
			{validUrl ? (
				<div className={styles.container}>
					<img src={success} alt="success_img" className={styles.success_img}></img>
					<h1>Email verified successfully</h1>
					<Link to="/login">
						<button className={styles.green_btn}>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</>
	);
}

export default EmailVerify;

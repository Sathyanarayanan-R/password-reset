import { Route, Routes, Navigate } from 'react-router-dom';
import Signup from './RegisterPage';
import Login from './LoginPage';
import ForgotPassword from './ForgotPasswordPage';
import Main from './Main/index';
import EmailVerify from './EmailVerify/EmailVerify';
import PasswordReset from './PasswordReset';
import './css/sb-admin-2.min.css';

function App() {
  const user = localStorage.getItem('token');
  document.body.className = "bg-gradient-primary";
	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/register" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/password-reset/:id/:token" element={<PasswordReset />} />
		</Routes>
	);
}

export default App;

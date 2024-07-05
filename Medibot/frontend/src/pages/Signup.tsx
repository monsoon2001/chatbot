// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import Study from "/page-photos/study2.png"
// import FormLabel from "../components/auth/FormLabel";

// import './styles.css'


// import { useAuth } from "../context/context";

// import axios from "axios";
// import toast from "react-hot-toast";
// axios.defaults.baseURL = "http://localhost:5001/api";
// axios.defaults.withCredentials = true; // Enable sending credentials (e.g., cookies) in cross-origin requests

// const Signup = () => {
// 	const [buttonName, setButtonName] = useState("Login");

// 	const navigate = useNavigate();

// 	const auth = useAuth();

// 	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
// 		event.preventDefault();

// 		const formData = new FormData(event.currentTarget);
// 		const username = formData.get("username") as string;
//         const email = formData.get("email") as string;
// 		const password = formData.get("password") as string;
// 		// const confirmPassword = formData.get("confirm-password") as string;

// 		try {
// 			setButtonName("Loading ...");
// 			toast.loading("Signing up ..", { id: "signup" });
// 			await auth?.signup(username, email, password);
// 			setButtonName("SignUp");
// 			toast.success("Account created and Logged In", { id: "signup" });
// 			navigate('/login');
//         } catch (error: any) {
// 			setButtonName("SignUp");
// 			toast.error(error.message, { id: "signup" });
// 			console.log(error, "error");
// 		}
// 	};
	

// 	return (
// 			<div className="w-full h-screen md:h-screen bg-[#05101c] pt-[100px]">
// 				{/* signup with image */}
// 				<div className="flex flex-col md:flex-row justify-around items-center max-w-7xl mx-auto">
// 					{/* image */}
// 					<img className="hidden md:flex md:h-[450px] md:w-[450px]" src={Study} alt="study" />

// 					{/* signup form */}
// 					<div className="flex flex-col justify-center items-center space-y-5">
// 						<h1 className="text-4xl font-bold">Create a new account</h1>
// 						<form className="flex flex-col space-y-4 w-[350px]" onSubmit={handleSubmit}>
// 						<FormLabel
// 							className=''
// 							htmlFor='username'
// 							id='username'
// 							name='username'
// 							type='text'
// 							required={true}
// 							maxLength={25}
// 							minLength={2}
// 							label='Full Name:'
// 							onChange={() => {}}
// 							inputPH='Enter your name...'
							
// 						/>

// 						<FormLabel
// 							className=''
// 							htmlFor='email'
// 							id='email'
// 							name='email'
// 							type='text'
// 							required={true}
// 							maxLength={50}
// 							minLength={5}
// 							label='Email:'
// 							onChange={() => {}}
// 							inputPH='name@example.com'
// 						/>

// 						<FormLabel
// 							className=''
// 							htmlFor='Password'
// 							name='password'
// 							id='password'
// 							type='password'
// 							required={true}
// 							maxLength={16}
// 							minLength={8}
// 							label='Password'
// 							onChange={() => {}}
// 							inputPH='Password'
// 						/>

// 						<FormLabel
// 							className=''
// 							htmlFor='Confirm-Password'
// 							id='confirm-password'
// 							name='confirm-password'
// 							type='password'
// 							required={true}
// 							maxLength={16}
// 							minLength={8}
// 							label='Confirm Password'
// 							onChange={() => {}}
// 							inputPH='Confirm Password'
// 						/>

// 						<button className="text-xl bg-teal-600 w-full px-4 py-1 rounded-xl hover:bg-teal-800 duration-300">SignUp</button>
// 						</form>
// 						<p>Already have account? <Link className="text-blue-700 font-bold" to="/login">{buttonName}</Link> </p>
// 					</div>
// 				</div>
// 			</div>
// 	);
// };

// export default Signup;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import Study from "/page-photos/study2.png";
import FormLabel from "../components/auth/FormLabel";

import './styles.css';
import { useAuth } from "../context/context";

axios.defaults.baseURL = "http://localhost:5001/api";
axios.defaults.withCredentials = true; // Enable sending credentials (e.g., cookies) in cross-origin requests

const Signup = () => {
	const [buttonName, setButtonName] = useState("Login");
	const navigate = useNavigate();
	const auth = useAuth();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const username = formData.get("username") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		try {
			setButtonName("Loading ...");
			toast.loading("Signing up ..", { id: "signup" });
			await auth?.signup(username, email, password);
			setButtonName("SignUp");
			toast.dismiss("signup");
			toast.success("Account created and Logged In", { id: "signup" });
			navigate('/login');
		} catch (error: any) {
			setButtonName("SignUp");
			toast.dismiss("signup");
			toast.error(error.response?.data?.message || error.message, { id: "signup" });
			console.log(error, "error");
		}
	};

	return (
		<div className="w-full h-screen md:h-screen bg-[#05101c] pt-[100px]">
			{/* signup with image */}
			<div className="flex flex-col md:flex-row justify-around items-center max-w-7xl mx-auto">
				{/* image */}
				<img className="hidden md:flex md:h-[450px] md:w-[450px]" src={Study} alt="study" />

				{/* signup form */}
				<div className="flex flex-col justify-center items-center space-y-5">
					<h1 className="text-4xl font-bold">Create a new account</h1>
					<form className="flex flex-col space-y-4 w-[350px]" onSubmit={handleSubmit}>
						<FormLabel
							className=''
							htmlFor='username'
							id='username'
							name='username'
							type='text'
							required={true}
							maxLength={25}
							minLength={2}
							label='Full Name:'
							onChange={() => {}}
							inputPH='Enter your name...'
						/>

						<FormLabel
							className=''
							htmlFor='email'
							id='email'
							name='email'
							type='text'
							required={true}
							maxLength={50}
							minLength={5}
							label='Email:'
							onChange={() => {}}
							inputPH='name@example.com'
						/>

						<FormLabel
							className=''
							htmlFor='Password'
							name='password'
							id='password'
							type='password'
							required={true}
							maxLength={16}
							minLength={8}
							label='Password'
							onChange={() => {}}
							inputPH='Password'
						/>

						<FormLabel
							className=''
							htmlFor='Confirm-Password'
							id='confirm-password'
							name='confirm-password'
							type='password'
							required={true}
							maxLength={16}
							minLength={8}
							label='Confirm Password'
							onChange={() => {}}
							inputPH='Confirm Password'
						/>

						<button className="text-xl bg-teal-600 w-full px-4 py-1 rounded-xl hover:bg-teal-800 duration-300">SignUp</button>
					</form>
					<p>Already have account? <Link className="text-blue-700 font-bold" to="/login">{buttonName}</Link> </p>
				</div>
			</div>
		</div>
	);
};

export default Signup;

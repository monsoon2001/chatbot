// import React, {useState} from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// import Study from "/page-photos/study.png";

// import FormLabel from "../components/auth/FormLabel";


// import axios from "axios";
// axios.defaults.baseURL = "http://localhost:5001/api";
// axios.defaults.withCredentials = true; // Enable sending credentials (e.g., cookies) in cross-origin requests

// import { useAuth } from "../context/context";

// const Login = () => {

//     const [buttonName, setButtonName] = useState('Login')

//     const navigate = useNavigate()

// 	const auth = useAuth();

// 	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
// 		event.preventDefault();

// 		const formData = new FormData(event.currentTarget);
// 		const email = formData.get("email") as string;
// 		const password = formData.get("password") as string;

// 		try {
//             setButtonName('Loading ...')
// 			toast.loading("Signing in ..", { id: "login" });
// 			await auth?.login(email, password);
//             setButtonName('Login')
//             toast.success("Signed in successfully", { id: "login" })
//             navigate('/chat')
// 		} catch (error: any) {
//             setButtonName('Login')
//             toast.error(error.message, { id: "login" })
// 			console.log(error, 'error');
// 		}
// 	};

// 	return (
// 			<div className="w-full h-screen bg-[#05101c] px:4 md:px-8 pt-[150px]">
// 				{/* login with image */}
// 				<div className="flex flex-col md:flex-row md:justify-around md:items-center max-w-7xl mx-auto">
// 					{/* login form */}
// 					<div className="flex flex-col justify-center items-center space-y-8">
// 						<h1 className="text-3xl font-semibold">Log Into Your Account</h1>
// 						<form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-[350px]">
// 							{/* email */}
// 							<FormLabel 
// 								htmlFor="email"
// 								id="email"
// 								name="email"
// 								type="text"
// 								required={true}
// 								onChange={() => {}}
// 								label ="EMAIL:"
// 								maxLength={50} 
// 								minLength={5}
// 								inputPH="name@gmail.com"
// 							/>
// 							{/* password */}
// 							<FormLabel 
// 								htmlFor="password"
// 								id="password"
// 								name="password"
// 								type="password"
// 								required={true}
// 								onChange={() => {}}
// 								label="PASSWORD:"
// 								maxLength={20} 
// 								minLength={8}
// 								inputPH="password"
// 							/>
// 							<button type="submit" className="bg-teal-600 text-xl px-4 py-1 rounded-2xl w-full hover:bg-teal-800 duration-300">{buttonName}</button>
// 						</form>
// 						<p>Don't have an account? <Link className="font-bold text-blue-800" to="/signup">Create a new one</Link></p>
// 					</div>

// 					{/* image */}
// 					<img className="hidden md:flex md:h-[400px] md:w-[400px]" src={Study} alt="" />
// 				</div>
// 			</div>
		
// 	);
// };

// export default Login;


import React, {useState} from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Study from "/page-photos/study.png";

import FormLabel from "../components/auth/FormLabel";

import './styles.css'


import axios from "axios";
axios.defaults.baseURL = "http://localhost:5001/api";
axios.defaults.withCredentials = true; // Enable sending credentials (e.g., cookies) in cross-origin requests

import { useAuth } from "../context/context";

const Login = () => {

    const [buttonName, setButtonName] = useState('Login')

    const navigate = useNavigate()

	const auth = useAuth();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		// try {
        //     setButtonName('Loading ...')
		// 	toast.loading("Signing in ..", { id: "login" });
		// 	await auth?.login(email, password);
        //     setButtonName('Login')
        //     toast.success("Signed in successfully", { id: "login" })
		// 	console.log(auth?.user);
        //     navigate('/chat')
		// } catch (error: any) {
        //     setButtonName('Login')
        //     toast.error(error.message, { id: "login" })
		// 	console.log(error, 'error');
		// }

		try {
			setButtonName('Loading ...');
			toast.loading("Signing in ..", { id: "login" });

			const userData = await auth?.login(email, password);

			setButtonName('Login');
			toast.success("Signed in successfully", { id: "login" });

			console.log("User Data:", userData);

			if (userData) {
				if (userData.role === 0) {
					navigate('/chat');
				} else if (userData.role === 1) {
					navigate('/admin');
				} else {
					toast.error("Invalid user role", { id: "login" });
				}
			} else {
				toast.error("Invalid user data or role", { id: "login" });
			}
		} catch (error: any) {
			setButtonName('Login');
			toast.error(error.message, { id: "login" });
			console.log("Login Error:", error);
		}
		
		
	};

	return (
			<div className="w-full h-screen bg-[#05101c] px:4 md:px-8 pt-[150px]">
				{/* login with image */}
				<div className="flex flex-col md:flex-row md:justify-around md:items-center max-w-7xl mx-auto">
					{/* login form */}
					<div className="flex flex-col justify-center items-center space-y-8">
						<h1 className="text-3xl font-semibold">Log Into Your Account</h1>
						<form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-[350px]">
							{/* email */}
							<FormLabel 
								htmlFor="email"
								id="email"
								name="email"
								type="text"
								required={true}
								onChange={() => {}}
								label ="EMAIL:"
								maxLength={50} 
								minLength={5}
								inputPH="name@gmail.com"
							/>
							{/* password */}
							<FormLabel 
								htmlFor="password"
								id="password"
								name="password"
								type="password"
								required={true}
								onChange={() => {}}
								label="PASSWORD:"
								maxLength={20} 
								minLength={8}
								inputPH="password"
							/>
							<button type="submit" className="bg-teal-600 text-xl px-4 py-1 rounded-2xl w-full hover:bg-teal-800 duration-300">{buttonName}</button>
						</form>
						<p>Don't have an account? <Link className="font-bold text-blue-800" to="/signup">Create a new one</Link></p>
					</div>

					{/* image */}
					<img className="hidden md:flex md:h-[400px] md:w-[400px]" src={Study} alt="" />
				</div>
			</div>
		
	);
};

export default Login;



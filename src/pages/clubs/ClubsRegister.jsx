import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import registrationImage from "../../assets/pictures/clubRegistrationImage.png";
import { Link, useNavigate } from "react-router-dom";
import { RegisterClub } from "../../service/MilanApi";
import "../../styles/ClubsRegister.css";

const ClubLogin = () => {
	document.title = "Club Register | Milan";
    const navigate = useNavigate();

	function Anchor(props) {
		return (
			<div>
				<p>
					{props.para}
					<Link to={props.link}>{props.details}</Link>
				</p>
			</div>
		);
	}

	const [credentials, setCredentials] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		address: "",
		pincode: "",
		description: "",
	});

	const [isEmailValid, setIsEmailValid] = useState(false);

	const handleChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
		if (
			e.target.name === "email" &&
			e.target.value.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
		)
			setIsEmailValid(true);
	};

	//* Submitting form
	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(credentials);
		console.log("Form submitted");

        await RegisterClub(credentials);
        navigate("/clubs/login");
	};

	return (
		<>
			<Navbar />
			<div className="mobile-sec container py-5 h-100">
				<div className="row d-flex align-items-center justify-content-center h-100">
					<div className="col-md-8 col-lg-7 col-xl-6">
						<img
							src={registrationImage}
							className="img-fluid"
							alt="Club Registration"
							width="90%"
						/>
					</div>

					<div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
						<form onSubmit={handleSubmit}>
							<h2 className="mobile-txt">Club Register</h2>

							<div className="form-outline mb-4">
								<label className=" col-form-label col-form-label-lg mobile-label">
									Club Name
								</label>
								<input
									type="text"
									className="form-control form-control-lg"
									placeholder="Enter your club name"
									name="name"
									value={credentials.name}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="form-outline mb-4">
								<label className=" col-form-label col-form-label-lg mobile-label">
									Club Email
								</label>
								<input
									type="email"
									className="form-control form-control-lg"
									placeholder="Enter your email address"
									name="email"
									value={credentials.email}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="form-outline mb-4">
								<label className="col-form-label col-form-label-lg mobile-label">
									Password
								</label>
								<input
									type="password"
									className="form-control form-control-lg"
									placeholder="Enter your password"
									name="password"
									value={credentials.password}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="form-outline mb-4">
								<label className="col-form-label col-form-label-lg mobile-label">
									Confirm your Password
								</label>
								<input
									type="password"
									className="form-control form-control-lg"
									placeholder="Confirm your password"
									name="confirmPassword"
									value={credentials.confirmPassword}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="form-outline mb-4">
								<label className="col-form-label col-form-label-lg mobile-label">
									Address
								</label>
								<input
									type="text"
									className="form-control form-control-lg"
									placeholder="Enter your club address"
									name="address"
									value={credentials.address}
									onChange={handleChange}
									required
								/>
							</div>

							<div className="form-outline mb-4">
								<label className="col-form-label col-form-label-lg mobile-label">
									Pincode
								</label>
								<input
									type="text"
									maxLength="6"
									className="form-control form-control-lg"
									placeholder="Enter your pincode"
									name="pincode"
									value={credentials.pincode}
									onChange={handleChange}
									required
								/>
							</div>
							<label
								htmlFor="desc"
								className="col-form-label col-form-label-lg mobile-label"
							>
								Description
							</label>
							<textarea
								type="text"
								className="form-control"
								id="desc"
								aria-describedby="textDemo"
								placeholder="Describe your club in at least 20 characters"
								name="description"
								value={credentials.description}
								onChange={handleChange}
								required
							/>
							<small
								id="textDemo"
								className="form-text text-muted"
							></small>

							<div className="d-grid gap-2 py-4">
								<button
									disabled={
										credentials.description.trim().length <
											20 ||
										credentials.password.length <= 4 ||
										!isEmailValid
									}
									type="submit"
									className="registration-btn btn btn-primary py-2"
								>
									Register
								</button>
							</div>

							<Anchor
								para="Already have an account? "
								details="Login here"
								link="/clubs/login"
								className="link-info"
							/>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default ClubLogin;

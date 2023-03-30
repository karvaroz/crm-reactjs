import React, { Fragment } from "react";
import {
	useNavigate,
	Form as FormRouter,
	useActionData,
	redirect,
} from "react-router-dom";
import Error from "../components/Error";
import Form from "../components/Form";
import { addClient } from "../data/clients";

export const Action = async ({ request }) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	const email = formData.get("email");
	const errors = [];
	if (Object.values(data).includes("")) {
		errors.push("All fields must be provided");
	}

	let regex = new RegExp(
		"([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
	);

	if (!regex.test(email)) {
		errors.push("Must be a valid email address");
	}

	if (Object.keys(errors).length) {
		return errors;
	}

	await addClient(data);
	return redirect("/");
};

const NewClient = () => {
	const errors = useActionData();
	const navigate = useNavigate();
	return (
		<Fragment>
			<h1 className="font-black text-4xl text-blue-900">New Client</h1>
			<p className="mt-3">Fill the form to create a new client</p>

			<div className="flex justify-end">
				<button
					className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
					onClick={() => navigate(-1)}>
					Back
				</button>
			</div>

			<div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10">
				{errors?.length &&
					errors.map((error, idx) => <Error key={idx}>{error}</Error>)}
				<FormRouter
					method="post"
					noValidate>
					<Form />
					<input
						type="submit"
						className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
						value="Register"
					/>
				</FormRouter>
			</div>
		</Fragment>
	);
};

export default NewClient;

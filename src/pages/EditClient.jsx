import React from "react";
import {
	useActionData,
	useNavigate,
	Form as FormRouter,
	useLoaderData,
	redirect,
} from "react-router-dom";
import Error from "../components/Error";
import Form from "../components/Form";
import { getClientById, updateClient } from "../data/clients";

export const loader = async ({ params }) => {
	const client = await getClientById(params.id);
	if (Object.values(client).length === 0) {
		throw new Response("", {
			status: 404,
			statusText: "No client found",
		});
	}
	return client;
};

export const Action = async ({ request, params }) => {
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

	await updateClient(params.id, data);
	return redirect("/");
};

const EditClient = () => {
	const errors = useActionData();
	const navigate = useNavigate();
	const client = useLoaderData();
	return (
		<React.Fragment>
			<h1 className="font-black text-4xl text-blue-900">Edit Client</h1>
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
					<Form client={client} />
					<input
						type="submit"
						className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
						value="Update"
					/>
				</FormRouter>
			</div>
		</React.Fragment>
	);
};

export default EditClient;

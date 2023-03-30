import React from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import { deleteClient } from "../data/clients";

export const Action = async ({ params }) => {
	deleteClient(params.id);
	return redirect("/");
};

const Client = ({ client }) => {
	const { nombre, empresa, email, telefono, id } = client;
	const navigate = useNavigate();
	return (
		<tr className="border-b">
			<td className="p-6 space-y-2">
				<p className="text-2xl text-gray-800">{nombre}</p>
				<p>{empresa}</p>
			</td>

			<td className="p-6">
				<p className="text-gray-600">
					<span className="text-gray-800 uppercase font-bold">Email: </span>
					{email}
				</p>
				<p className="text-gray-600">
					<span className="text-gray-800 uppercase font-bold">Tel: </span>
					{telefono}
				</p>
			</td>

			<td className="p-6 flex gap-3">
				<button
					className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"
					type="button"
					onClick={() => navigate(`/client/${id}`)}>
					Edit
				</button>

				<Form
					method="post"
					action={`/client/${id}/delete`}
					onSubmit={(e) => {
						if (!confirm("Are you sure you want to delete this client?")) {
							e.preventDefault();
						}
					}}>
					<button
						className="text-red-600 hover:text-red-700 uppercase font-bold text-xs"
						type="submit">
						Delete
					</button>
				</Form>
			</td>
		</tr>
	);
};

export default Client;

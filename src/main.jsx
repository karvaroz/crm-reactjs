import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import EditClient, { loader as EditLoader } from "./pages/EditClient";
import ErrorPage from "./pages/Error";
import Index, { Loader } from "./pages/Index";
import NewClient, { Action as NewAction } from "./pages/NewClient";
import { Action as EditAction } from "./pages/EditClient";

import Layout from "./components/Layout";
import { Action as DeleteAction } from "./components/Client";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Index />,
				loader: Loader,
				errorElement: <ErrorPage />,
			},
			{
				path: "client",
				element: <NewClient />,
				action: NewAction,
			},
			{
				path: "client/:id",
				element: <EditClient />,
				loader: EditLoader,
				action: EditAction,
				errorElement: <ErrorPage />,
			},
			{
				path: `client/:id/delete`,
				action: DeleteAction,
				errorElement: <ErrorPage />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

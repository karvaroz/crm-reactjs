import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {
	const location = useLocation();
	return (
		<main className="md:flex md:min-h-screen">
			<aside className="md:w-1/4 bg-blue-900 px-5 py-10">
				<h2 className="text-4xl font-black text-center text-white">
					CRM - Clients
				</h2>
				<nav className="mt-10">
					<Link
						to="/"
						className={`${
							location.pathname === "/" ? "text-blue-300" : "text-white"
						} text-2xl block mt-2 hover:text-blue-300`}>
						Clients
					</Link>
					<Link
						to="client"
						className={`${
							location.pathname === "/client" ? "text-blue-300" : "text-white"
						} text-2xl block mt-2 hover:text-blue-300`}>
						New Client
					</Link>
				</nav>
			</aside>
			<section className="md:w-3/4 p-10 md:h-screen overflow-scroll">
				<Outlet />
			</section>
		</main>
	);
};

export default Layout;

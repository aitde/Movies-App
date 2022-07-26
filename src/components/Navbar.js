import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Navbar extends Component {
	render() {
		return (
			<div style={{ display: "flex" }}>
				<Link to="/">
					<h1>Movies App</h1>
				</Link>
				<Link to="/favourites">
					<h2 style={{ marginLeft: "2rem", marginTop: "0.7rem" }}>
						Favourites
					</h2>
				</Link>

				<div>
					<button type="button" class="btn btn-outline-success nav-button">
						Upcoming
					</button>

					<button type="button" class="btn btn-outline-success nav-button">
						Top rated
					</button>

					<button type="button" class="btn btn-outline-success nav-button">
						Latest
					</button>
				</div>
			</div>
		);
	}
}

export default Navbar;

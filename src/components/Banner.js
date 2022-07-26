import React, { Component } from "react";
import { movies } from "../movieData";

export class Banner extends Component {
	render() {
		let index = Math.floor(Math.random() * 20);
		let bannerImg = movies.results[index].backdrop_path;
		let title = movies.results[index].title;
		let description = movies.results[index].overview;
		return (
			<div className="card banner-card">
				<img
					src={`https://image.tmdb.org/t/p/original/${bannerImg}`}
					className="card-img-top banner-img"
					alt="..."
				/>

				<h5 className="card-title banner-title">{title}</h5>
				<p className="card-text banner-subtitle">{description}</p>
			</div>
		);
	}
}

export default Banner;

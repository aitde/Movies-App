import React, { Component } from "react";

import axios from "axios";

export class MovieList extends Component {
	constructor() {
		super();

		this.state = {
			hoverid: "",
			currPage: 1,
			moviesarr: [],
			parr: [1],

			favourites: [],
		};
	}

	async componentDidMount() {
		let res = await axios.get(
			`https://api.themoviedb.org/3/movie/popular?api_key=0b5415eb9bf023d556ef265b425e0e4a&language=en-US&page=${this.state.currPage}`
		);

		let datafromapi = res.data;

		this.setState({ moviesarr: [...datafromapi.results] });
	}

	changeMovies = async () => {
		let res = await axios.get(
			`https://api.themoviedb.org/3/movie/popular?api_key=fc1815ae074d93079721c2bd4a540895&language=en-US&page=${this.state.currPage}`
		);

		let datafromapi = res.data;

		this.setState({ moviesarr: [...datafromapi.results] });
	};

	handleNext = () => {
		let temparr = [];

		for (let i = 1; i <= this.state.parr.length + 1; i++) {
			temparr.push(i);
		}
		this.setState(
			{
				parr: [...temparr],
				currPage: this.state.currPage + 1,
			},
			this.changeMovies
		);
	};
	handlePrev = () => {
		//if (this.state.currPage != 1) {
		this.setState({ currPage: this.state.currPage - 1 }, this.changeMovies);
		//}
	};

	handlePageClick = (value) => {
		if (value != this.state.currPage) {
			this.setState({ currPage: value }, this.changeMovies);
		}
	};

	handleFavourite = (movieobj) => {
		let data = JSON.parse(localStorage.getItem("movies") || "[]");

		if (this.state.favourites.includes(movieobj.id)) {
			data = data.filter((movie) => movie.id != movieobj.id);
		} else {
			data.push(movieobj);
		}

		localStorage.setItem("movies", JSON.stringify(data));

		this.handleFavouriteState();
	};

	handleFavouriteState = () => {
		let data = JSON.parse(localStorage.getItem("movies") || "[]");
		let temp = data.map((movie) => movie.id);

		this.setState({
			favourites: [...temp],
		});
	};

	render() {
		return (
			<>
				<div>
					<h3 className="text-center">
						<strong>Trending</strong>
					</h3>
				</div>

				<div className="movie-list">
					{this.state.moviesarr.map((movie) => (
						<div
							className="card movie-card"
							onMouseEnter={() => {
								this.setState({ hoverid: movie.id });
							}}
							onMouseLeave={() => {
								this.setState({ hoverid: "" });
							}}
						>
							<img
								src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
								className="card-img-top movie-img"
								alt="..."
							/>

							<h5 class="card-title movie-title">
								{movie.original_title}
							</h5>

							{this.state.hoverid === movie.id && (
								<a
									className="btn btn-primary movie-button"
									onClick={() => this.handleFavourite(movie)}
								>
									{this.state.favourites.includes(movie.id)
										? "Remove from favourite"
										: "Add to favourite"}
								</a>
							)}
							<div className="movie-rating">
								<div className="rating">{movie.vote_average}</div>
								<div class="star">
									<i class="sc-rbbb40-1 iFnyeo" color="#FFFFFF">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="#FFFFFF"
											width="0.6rem"
											height="0.6rem"
											viewBox="0 0 20 20"
											aria-labelledby="icon-svg-title- icon-svg-desc-"
											role="img"
											class="sc-rbbb40-0 fauQLv"
										>
											<title>star-fill</title>
											<path d="M6.76 6.8l-6.38 0.96c-0.22 0.040-0.38 0.22-0.38 0.44 0 0.12 0.040 0.24 0.12 0.32v0l4.64 4.76-1.1 6.66c0 0.020 0 0.040 0 0.080 0 0.24 0.2 0.44 0.44 0.44 0.1 0 0.16-0.020 0.24-0.060v0l5.7-3.12 5.68 3.12c0.060 0.040 0.14 0.060 0.22 0.060 0.24 0 0.44-0.2 0.44-0.44 0-0.040 0-0.060 0-0.080v0l-1.1-6.66 4.64-4.76c0.080-0.080 0.12-0.2 0.12-0.32 0-0.22-0.16-0.4-0.36-0.44h-0.020l-6.38-0.96-2.96-6.18c-0.060-0.12-0.18-0.2-0.32-0.2s-0.26 0.080-0.32 0.2v0z"></path>
										</svg>
									</i>
								</div>
							</div>
						</div>
					))}
				</div>

				<div style={{ display: "flex", justifyContent: "center" }}>
					<nav aria-label="Page navigation example">
						<ul className="pagination">
							<li
								className={`page-item ${
									this.state.currPage == 1 && "disabled"
								}`}
							>
								<a className="page-link" onClick={this.handlePrev}>
									Previous
								</a>
							</li>

							{this.state.parr.map((value) => (
								<li class="page-item">
									<a
										class="page-link"
										onClick={() => this.handlePageClick(value)}
									>
										{value}
									</a>
								</li>
							))}

							<li className="page-item">
								<a
									className="page-link"
									href="#"
									onClick={this.handleNext}
								>
									Next
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</>
		);
	}
}

export default MovieList;

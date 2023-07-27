import { useState, useEffect } from "react";
import "./Movies.css";
const fakeFetch = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://example.com/api/movies") {
                resolve({
                    status: 200,
                    message: "Success",
                    data: [
                        {
                            id: 1,
                            title: "The Shawshank Redemption",
                            rating: 9.3,
                            year: 1994,
                            category: "Drama",
                        },
                        {
                            id: 2,
                            title: "The Godfather",
                            rating: 9.2,
                            year: 1972,
                            category: "Crime",
                        },
                        {
                            id: 3,
                            title: "The Dark Knight",
                            rating: 9.0,
                            year: 2008,
                            category: "Action",
                        },
                        {
                            id: 4,
                            title: "Pulp Fiction",
                            rating: 8.9,
                            year: 1994,
                            category: "Crime",
                        },
                        {
                            id: 5,
                            title: "The Lion King",
                            rating: 8.5,
                            year: 1994,
                            category: "Drama",
                        },
                        {
                            id: 6,
                            title: "Inception",
                            rating: 8.8,
                            year: 2010,
                            category: "Action",
                        },
                    ],
                });
            } else {
                reject({
                    status: 404,
                    message: "Movies not found.",
                });
            }
        }, 2000);
    });
};

const URL = "https://example.com/api/movies";

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [storeMovies, setStoreMovies] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [filterCategory, setFilterCategory] = useState("All");
    const [filterRating, setFilterRating] = useState("All");

    const categoryType = ["All", "Action", "Crime", "Drama"];
    const Ratings = ["8.0", "8.5", "9.0", "9.5"];

    const handleSuccessResponse = () => {
        if (isError) {
            setIsError(false);
            setErrorMessage("");
        }

        setIsLoading(false);
    };

    const handleFailedResponse = (error) => {
        setIsLoading(false);
        setIsError(true);
        setErrorMessage(error);
    };

    const getMovies = async () => {
        try {
            const Movies = await fakeFetch(URL);
            const { data, status } = Movies;

            if (status === 200) {
                setMovies(data);
                setStoreMovies(data);
                handleSuccessResponse();
            } else {
                const message = "error occurred";
                handleFailedResponse(message);
            }
        } catch (err) {
            handleFailedResponse(err.message);
        }
    };

    const handleRadioSelect = (e) => {
        const filterByCategory = e.target.value;

        setFilterCategory(filterByCategory);

        if (filterByCategory === "All") {
            setMovies(storeMovies);
        } else {
            const filterMovieByCategory = storeMovies.filter(
                (movie) => movie.category === filterByCategory
            );
            setMovies(filterMovieByCategory);
        }
    };

    const handleSelect = (e) => {
        const filterByRating =
            e.target.value === "All" ? e.target.value : Number(e.target.value);

        setFilterRating(filterByRating);

        if (filterByRating === "All") {
            setMovies(storeMovies);
        } else {
            const filterMovieByRating = storeMovies?.filter(
                (movie) => movie?.rating >= filterByRating
            );
            setMovies(filterMovieByRating);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div className="Movies">
            <div className="Filters">
                <div className="CategoryFilter">
                    <div className="Title"> Category Filter:</div>
                    {categoryType?.map((category) => (
                        <div className="FilterType" key={category}>
                            <input
                                type="radio"
                                value={category}
                                name={category}
                                id={category}
                                onChange={handleRadioSelect}
                                checked={category === filterCategory}
                            />

                            <label htmlFor={category}>{category}</label>
                        </div>
                    ))}
                </div>
                <div className="RatingFilter">
                    <label htmlFor="select">Rating Filter:</label>
                    <select
                        name="select"
                        id="select"
                        value={filterRating}
                        onChange={handleSelect}
                    >
                        <option value="All">All</option>
                        {Ratings.map((rate) => (
                            <option value={Number(rate)} key={rate}>
                                {rate}+
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <h1>Movies List</h1>
            {isLoading && <h2>Loading.....</h2>}
            {isError && <h2>{errorMessage}!!!</h2>}
            <div className="MovieList">
                {movies?.map((movie, index) => (
                    <div className="MovieCard" key={index}>
                        <div className="Title">
                            <h2> {movie?.title}</h2>
                        </div>
                        <div className="Description">
                            <p>Rating:{movie?.rating}</p> -{" "}
                            <p>Year:{movie?.year}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Movies;

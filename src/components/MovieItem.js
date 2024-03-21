import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, Image } from "react-native";

const MovieItem = ({ movieId, movieName }) => {
  const { width, height } = Dimensions.get("window");
  const [loaded, setLoaded] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [year, setYear] = useState("");

  const url =
    "https://api.themoviedb.org/3/search/movie?query=Everything%20Everywhere%20All%20At%20Once&include_adult=false&language=en-US&primary_release_year=545611&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGFmY2YyZTJjMWQyMzBkYWM5NzIzNGU5MWUxMjQ5MyIsInN1YiI6IjY1ZjhlMjFhMzNhMzc2MDE4NDM1YmRmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R-_0PyJQAm80I6PKvEfGXnwYhBPjyKIZSSW6yJnPCfE",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const searchQuery = await movieName.replace(/ /g, "%20");
      const movieDataRaw = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&primary_release_year=545611&page=1`,
        options
      );
      const movieData = await movieDataRaw.json();

      for (const movie of movieData.results) {
        if (movie.id == movieId) {
          setImgUrl(movie.poster_path);
          setYear(movie.release_date.substring(0, 4));
          setLoaded(true);
          break;
        }
      }
    };

    fetchData();
  }, []);

  if (loaded) {
    return (
      <View
        style={{
          backgroundColor: "rgba(202, 240, 248, 0.41)",
          width: width * 0.9,
          height: height * 0.1,
          borderRadius: "10%",
          flexDirection: "row",
          marginBottom: width * 0.02,
        }}
      >
        <View
          style={{
            flex: 5,
            paddingTop: width * 0.01,
            paddingBottom: width * 0.01,
            paddingLeft: width * 0.03,
            paddingRight: width * 0.03,
            justifyContent: "space-evenly",
          }}
        >
          <Text
            style={{
              color: "#004275",
              fontSize: width * 0.038,
              fontWeight: "bold",
              width: "90%",
            }}
          >
            {movieName}
          </Text>
          <Text
            style={{
              color: "#008AF5",
              fontWeight: "bold",
              fontSize: width * 0.038,
            }}
          >
            ({year})
          </Text>
        </View>

        <View
          style={{
            flex: 2,
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w185${imgUrl}` }}
            style={{
              height: "80%",
            }}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={{
          backgroundColor: "rgba(202, 240, 248, 0.41)",
          width: width * 0.9,
          height: height * 0.1,
          borderRadius: "10%",
          flexDirection: "row",
          marginBottom: width * 0.02,
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }
};

export default MovieItem;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";

const MovieAddScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  const [query, setQuery] = useState("");

  const { width, height } = Dimensions.get("window");

  const handleSearch = async () => {
    true;
    const searchQuery = query.replace(/ /g, "%20");
    console.log(searchQuery);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGFmY2YyZTJjMWQyMzBkYWM5NzIzNGU5MWUxMjQ5MyIsInN1YiI6IjY1ZjhlMjFhMzNhMzc2MDE4NDM1YmRmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R-_0PyJQAm80I6PKvEfGXnwYhBPjyKIZSSW6yJnPCfE",
      },
    };

    const movieDataRaw = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&primary_release_year=545611&page=1`,
      options
    );

    const movieData = await movieDataRaw.json();
    const movieResults = movieData.results;
    setMovies(movieResults);
    setIsLoading(false);
  };

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <TextInput
          placeholder="Search..."
          style={{
            backgroundColor: "white",
            width: "90%",
            height: height * 0.05,
            margin: 10,
            padding: 10,
            borderRadius: 10,
            borderColor: "black",
            borderWidth: 1,
          }}
          onChangeText={(text) => {
            setQuery(text);
          }}
          onSubmitEditing={() => {
            console.log("Submitted");
            console.log(query);
            setIsLoading(true);
            handleSearch();
          }}
        />
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
            }}
          >
            {movies.map((movie, index) => {
              return (
                <View
                  style={{
                    width: "90%",
                    height: height * 0.1,
                    backgroundColor: "rgba(202, 240, 248, 0.41)",
                    margin: 10,
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <Text>{movie.title}</Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MovieAddScreen;

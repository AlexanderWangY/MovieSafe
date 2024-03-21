import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useRouter, useRootNavigationState } from "expo-router";
import MovieItem from "../../components/MovieItem";
import MovieList from "../../components/MovieList";
import { getMovies, saveMovie, clearMovies } from "../../actions/storage";

const Home = () => {
  const router = useRouter();
  const { width, height } = Dimensions.get("window");
  const [movieArray, setMovieArray] = useState([]);

  const handleAddMovie = () => {
    router.replace("/movieadd");
  };

  useEffect(() => {
    const saveSomeMovies = async () => {
      const movies = await getMovies();
      setMovieArray(movies);
    };

    saveSomeMovies();
  }, []);

  return (
    <View style={styles.main_container}>
      <View
        style={{
          flex: 1,
        }}
      >
        <TouchableOpacity
          onPress={handleAddMovie}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgba(144, 224, 239, 0.46)",
            borderRadius: width * 0.1,
            margin: width * 0.04,
            paddingLeft: width * 0.04,
            paddingRight: width * 0.04,
            paddingTop: width * 0.025,
            paddingBottom: width * 0.025,
          }}
        >
          <Text
            style={{
              fontSize: width * 0.04,
              fontWeight: "bold",
              color: "#2097F3",
            }}
          >
            Add a movie
          </Text>
          <Image
            source={require("../../../assets/plus.png")}
            style={{
              width: width * 0.06,
              height: width * 0.06,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",
          flex: 9.5,
          alignItems: "center",
          height: "100%",
        }}
      >
        {movieArray.length === 0 ? (
          <Text>No Movies Added</Text>
        ) : (
          <MovieList movieArray={movieArray} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main_container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
});

export default Home;

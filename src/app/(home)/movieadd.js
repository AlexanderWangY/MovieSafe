import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import SelectableMovieItem from "../../components/SelectableMovieItem";
import { saveMovie } from "../../actions/storage";
import { router } from "expo-router";

const MovieAddScreen = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [selectedName, setSelectedName] = useState('')
  const [query, setQuery] = useState("");

  const { width, height } = Dimensions.get("window");

  const handleSubmit = async () => {
    if (selectedName === '' || selectedId === '') {
      Alert.alert('Error', 'No movie selected!', [
        {
          text: 'OK'
        }
      ],
      { cancelable: false })

    } else {
      await saveMovie(selectedName, selectedId)
      router.replace('home')
    }
  }

  const handleSearch = async () => {
    true;
    const searchQuery = query.replace(/ /g, "%20");

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
      <View
        style={{
          width: "100%",
          height: '100%',
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
            setIsLoading(true);
            handleSearch();
          }}
        />
        {loading ? (
          <Text>Loading...</Text>
        ) : (
            <FlatList
              style={{ flex: 1, width: '100%' }}
              contentContainerStyle={{
                alignItems: 'center'
              }}
              data={movies}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                if (item.id === selectedId) {
                  return (<SelectableMovieItem movieName={item.title} imgUrl={item.poster_path} year={item.release_date.substring(0, 4)} selected={true} setSelected={() => {setSelectedId(item.id)
                  setSelectedName(item.title)}}/>)
                } else {
                  return (<SelectableMovieItem movieName={item.title} imgUrl={item.poster_path} year={item.release_date.substring(0, 4)} selected={false} setSelected={() => {setSelectedId(item.id)
                    setSelectedName(item.title)}}/>)
                }
              }}
            />
        )}
        <TouchableOpacity style={{
          backgroundColor: '#C7F4FC',
          height: height * 0.05,
          width: "90%",
          position: 'absolute',
          bottom: height * 0.05,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '15%',
          shadowColor: 'black',
          shadowOpacity: '1%',
          shadowOffset: 0,
          shadowRadius: 3
        }}
        onPress={handleSubmit}
        >
          <Text style={{
            fontWeight: 'bold',
            fontSize: width * 0.04,
            color: '#2097F3'
          }}>Add Selected Movie</Text>
        </TouchableOpacity>
      </View>
  );
};

export default MovieAddScreen;

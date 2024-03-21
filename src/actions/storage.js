import AsyncStorage from "@react-native-async-storage/async-storage";

export const getMovies = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('movies');
        let movies = [];
        if (jsonValue !== null) {
          movies = JSON.parse(jsonValue);
        }
        return movies;
      } catch (e) {
        console.error('Error retrieving movies:', e);
        return [];
      }
}

export const saveMovie = async (movieName, movieId) => {
    const newMovie = {
        'id': movieId,
        'name': movieName
    }

    try {

    const existingMovies = await getMovies()
    const appendedMovies = [newMovie, ...existingMovies]
    const jsonValue = JSON.stringify(appendedMovies);
    await AsyncStorage.setItem('movies', jsonValue);
    } catch (e) {
        console.error("Coudl not add movie")
    }

}
export const clearMovies = async () => {
    try {
        const movies = [];
        const jsonMovies = JSON.stringify(movies)
        await AsyncStorage.setItem('movies', jsonMovies)
    } catch (e) {
        console.log("Bruh")
    }
}
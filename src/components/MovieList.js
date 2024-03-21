import React from 'react'
import { Text, View, ScrollView, FlatList } from 'react-native'
import MovieItem from './MovieItem'

const MovieList = ({ movieArray }) => {
    return (
        <FlatList
        contentContainerStyle={{
          alignItems: 'center',
        }}
        style={{
            width: '100%'
        }}
        data={movieArray}
        keyExtractor={(item, index) => index.toString()} // Use index as key
        renderItem={({ item }) => (
          <MovieItem movieId={item.id} movieName={item.name} />
        )}
      />
    )
}

export default MovieList
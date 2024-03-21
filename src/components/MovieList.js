import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import MovieItem from './MovieItem'

const MovieList = ({ movieArray }) => {
    return (
        <ScrollView
            contentContainerStyle={{
                alignItems: 'center',
            }}
            scrollEnabled={false}
        >
            {movieArray.map((item, index) => (
                <MovieItem movieId={item.id} movieName={item.name} key={index} />
            ))}
        </ScrollView>
    )
}

export default MovieList
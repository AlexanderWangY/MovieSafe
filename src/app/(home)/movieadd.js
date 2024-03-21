import React, {useState} from 'react'
import { View, Text } from 'react-native'

const MovieAddScreen = () => {
  const [movies, setMovies] = useState([])
  const [loading, setIsLoading] = useState(true)
  const [selected, setSelected] = useState(false)
  const [runSearch, setRunSearch] = useState(false)

  return (
    <View>
        <Text>Add a new movie</Text>
    </View>
  )
}

export default MovieAddScreen
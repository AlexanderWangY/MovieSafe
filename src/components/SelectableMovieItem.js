import React, { useState } from "react";
import { Text, View, Dimensions, Image, TouchableOpacity } from "react-native";

const SelectableMovieItem = ({
  movieName,
  imgUrl,
  year,
  selected,
  setSelected,
}) => {
  const { width, height } = Dimensions.get("window");

  return (
    <TouchableOpacity
      style={{
        backgroundColor: selected ? "#AAAAAA" : "#EFEFEF",
        width: width * 0.9,
        height: height * 0.1,
        borderRadius: 10,
        flexDirection: "row",
        marginBottom: width * 0.02,
      }}
      onPress={setSelected}
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
    </TouchableOpacity>
  );
};

export default SelectableMovieItem;

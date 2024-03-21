import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, Dimensions } from "react-native";
import { useRouter, useRootNavigationState } from "expo-router";

const Home = () => {
  const router = useRouter();
  const { width, height } = Dimensions.get("window");

  const handleAddMovie = () => {
    router.push("/movieadd");
  }


  return (
    <View style={styles.main_container}>
      <TouchableOpacity onPress={handleAddMovie} style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(144, 224, 239, 0.46)',
        borderRadius: width * 0.1,
        margin: width * 0.04,
        paddingLeft: width * 0.06,
        paddingRight: width * 0.04,
        paddingTop: width * 0.03,
        paddingBottom: width * 0.03,
      }}>
        <Text style={{
          fontSize: width * 0.04,
          fontWeight: 'bold',
          color: '#2097F3',
        }}>Add a movie</Text>
        <Image 
        source={require('../../../assets/plus.png')}
        style={{width: width * 0.06, height: width * 0.06, resizeMode: 'contain'}}
        />
      </TouchableOpacity>
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

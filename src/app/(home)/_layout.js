import React from "react";
import { Text, Pressable, Dimensions } from "react-native";
import { Stack, Tabs, router } from "expo-router";

const HomeLayout = () => {
  const { height, width } = Dimensions.get("window");

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#03045E",
        },
        headerTintColor: "#FFF",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 22,
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          title: "Watched Movies",
        }}
      />
      <Stack.Screen
        name="movieadd"
        options={{
          title: "Add a New Movie",
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.replace("/home");
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: width * 0.04,
                  marginBottom: height * 0.005,
                }}
              >
                Cancel
              </Text>
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
};

export default HomeLayout;

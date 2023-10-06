import React from "react";
import { View, Text, Button } from "react-native";
import GlobalNavbar from "../components/GlobalNavbar"; // Import the GlobalNavbar component

function Home({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <GlobalNavbar navigation={navigation} />
      {/* Include the GlobalNavbar component */}
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate("Details", {
            itemId: 86,
            otherParam: "anything you want here",
          });
        }}
      />
    </View>
  );
}

export default Home;

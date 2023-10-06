import React from "react";
import { View, Button } from "react-native";

function GlobalNavbar({ navigation }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Button
        title="Register"
        onPress={() => {
          navigation.navigate("Register", {
            next: null,
            ref: null,
          });
        }}
      />
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate("Login", {
            next: null,
            ref: null,
          });
        }}
      />
    </View>
  );
}

export default GlobalNavbar;

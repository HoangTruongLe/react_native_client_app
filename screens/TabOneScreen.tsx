import * as React from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View, Button } from "../components/Themed";
import { performLogout } from "../store/actions/auth";

export default function TabOneScreen() {
  const dispatch = useDispatch();
  function logout() {
    dispatch(performLogout());
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.js" />
      <Button title={"Log Out"} onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

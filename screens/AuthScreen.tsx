import * as React from "react";
import { StyleSheet, View, Button } from "react-native";
import { useDispatch } from "react-redux";
import { performLogin } from "../store/actions/auth";

const AuthScreen = (props) => {
  const dispatch = useDispatch();
  function login() {
    dispatch(performLogin());
  }

  return (
    <View style={styles.container}>
      <Button title="Sign in" onPress={login} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthScreen;

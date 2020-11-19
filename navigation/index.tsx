import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { ColorSchemeName } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { RootStackParamList, AuthStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import NotFoundScreen from "../screens/NotFoundScreen";
import AuthScreen from "../screens/AuthScreen";
import { setLogin } from "../store/actions/auth";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(setLogin());
  }, []);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {isLoggedIn && <HomeStackNavigator />}
      {!isLoggedIn && <AuthStackNavigator />}
    </NavigationContainer>
  );
}

const HomeStack = createStackNavigator<RootStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Root" component={BottomTabNavigator} />
      <HomeStack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </HomeStack.Navigator>
  );
}

const AuthStack = createStackNavigator<AuthStackParamList>();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SignIn" component={AuthScreen} />
    </AuthStack.Navigator>
  );
}

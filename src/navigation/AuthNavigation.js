import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, CardScreen } from "../screens";
import Basket from "../components/Basket/Basket";
import LoginScreen from "../screens/OnboardingScreen/Login";
import OnboardingScreen from "../screens/OnboardingScreen/Onboarding";
import NumberVerification from "../screens/OnboardingScreen/NumberVerification";

const Stack = createStackNavigator();

const AuthNavigatior = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Verification" component={NumberVerification} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AuthNavigatior;

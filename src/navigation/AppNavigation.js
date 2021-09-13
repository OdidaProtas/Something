import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, CardScreen } from "../screens";
import Basket from "../components/Basket/Basket";
import ExploreScreen from "../ExploreScreen/ExploreScreen";
import Details from "../components/Details/Details";
import ShopForm from "../Shop/ShopForm";
import ShopScreen from "../Shop/ShopScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Card" component={CardScreen} />
          <Stack.Screen name="Discover" component={ExploreScreen} />
          <Stack.Screen name="NewShop" component={ShopForm} />
          <Stack.Screen name="Shop" component={ShopScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Basket />
    </>
  );
};

export default AppNavigator;

import { Animated, Easing, StatusBar } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import * as Haptics from "expo-haptics";
import { Button } from "react-native-paper";

import Onboarding from "react-native-onboarding-swiper";
import LoginScreen from "./Login";

class BasicExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
    }).start();
  }

  render() {
    return (
      <>
        <StatusBar
          animated={true}
          backgroundColor={"#B7999C"}
          barStyle={"default"}
        />
        <LottieView
          loop
          autoPlay
          style={{
            height: 144,
            width: 144,
            borderRadius: 2,
          }}
          source={require("../../assets/lottie/24151-ecommerce-animation.json")}
          // progress={this.state.progress}
        />
      </>
    );
  }
}

const OnboardingScreen = ({ navigation }) => (
  <Onboarding
    showDone={false}
    showSkip={false}
    pages={[
      {
        title: "Hey!",
        subtitle: "Welcome to Artik!",
        backgroundColor: "#4B4A67",
        image: <BasicExample />,
      },
      {
        title: "Amazing Items",
        subtitle:
          "Find a wide range of unique, custom and exciting items and gifts",
        backgroundColor: "#AC3931",
        image: (
          <>
            <LottieView
              loop
              autoPlay
              style={{
                height: 160,
                width: 160,
                borderRadius: 2,
              }}
              source={require("../../assets/lottie/3616-shopping-bag.json")}
              // progress={this.state.progress}
            />
          </>
        ),
      },
      {
        title: "Make your brand visible",
        subtitle:
          "Sign up as a seller and grow your market with a shop customized to your needs and customer experience.",
        backgroundColor: "#507255",
        image: (
          <LottieView
            autoPlay={true}
            loop={true}
            style={{
              height: 160,
              width: 160,
              borderRadius: 2,
            }}
            source={require("../../assets/lottie/54350-online-shopping-delivery.json")}
            // progress={this.state.progress}
          />
        ),
      },
      {
        backgroundColor: "#30343F",
        image: <LoginScreen navigation={navigation} />,
      },
    ]}
  />
);

export default OnboardingScreen;

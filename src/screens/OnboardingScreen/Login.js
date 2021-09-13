import AnimatedLottieView from "lottie-react-native";
import React from "react";
import { View, StyleSheet, LogBox } from "react-native";
import { Title, Paragraph, Button } from "react-native-paper";

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.root}>
        <View style={{ margin: 36, alignItems: "center", marginTop: 0 }}>
          <Title style={{ color: "white" }}>Artik</Title>
        </View>
        <View style={{ paddingTop: 18, alignItems: "center" }}>
          <AnimatedLottieView
            loop
            autoPlay
            style={{
              height: 144,
              width: 144,
              borderRadius: 2,
              marginBottom: 36,
            }}
            source={require("../../assets/lottie/67207-green-delivery.json")}
          />
        </View>
        <Button
          style={{ marginTop: 9 }}
          theme={{ colors: { primary: "#fff" } }}
          uppercase={false}
          onPress={() => this.props.navigation.navigate("Verification")}
        >
          Sign in to continue
        </Button>
      </View>
    );
  }
}

LogBox.ignoreAllLogs();

const styles = StyleSheet.create({
  root: {
    // backgroundColor: "#30343F",
  },
  fbBtn: {
    // marginTop: 0,
    alignSelf: "center",
  },
  title: {
    alignSelf: "center",
    color: "#fff",
  },
  gBtn: {
    marginTop: 10,
    alignSelf: "center",
  },
});

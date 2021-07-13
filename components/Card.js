import React from "react";
import {
  Animated,
  ImageBackground,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Dim = Dimensions.get("screen");

const Card = ({ item: face, animation }) => {
  return (
    <Animated.View
      style={{
        ...animation,
        bottom: 30,
      }}
    >
      <ImageBackground source={face.picture} style={styles.image}>
        <LinearGradient
          colors={["#1fa8ed", "transparent", "#88d5f7"]}
          style={styles.background}
        />
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dim.height / 2,
  },
  image: {
    height: Dim.height / 2,
    width: Dim.width,
  },
});

export default Card;

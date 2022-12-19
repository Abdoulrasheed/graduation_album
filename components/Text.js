import React from "react";
import { Text, StyleSheet } from "react-native";
import fonts from "../config/fonts";

const AppText = ({ children, style, ...otherProps }) => {
  return (
    <Text style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
};
const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.primaryFont,
  },
});

export default AppText;

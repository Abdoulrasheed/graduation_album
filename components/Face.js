import React from "react";
import {
  Animated,
  Linking,
  Platform,
  Dimensions,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import colors from "../config/colors";
import Text from "./Text";

const Face = ({ face, fadeAnim }) => {
  const marginLeft = face.id ? { marginLeft: 25 } : { marginLeft: 3 };

  return (
    <Animated.View style={(styles.card, { opacity: fadeAnim, ...marginLeft })}>
      <Svg
        width={WIDTH}
        height={HEIGHT / 2}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M0 63L310 7V180V353H0V63Z"
          fill={colors.primary}
          opacity="0.2"
        />
        <Path
          d="M2.5 39L312.5 107.5V179.5V352.5H2.5V39Z"
          fill="white"
          opacity="0.5"
        />
        <Path
          d="M2.5 85L300.5 179.5H312.5V352.5H2.5V85Z"
          fill={colors.primary}
          opacity="0.5"
        />
        <Path
          d="M2.5 109.5L68.25 86.25L134 63L312.5 0V179.5V352.5H2.5V109.5Z"
          fill="white"
          opacity="0.2"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M310 7.5L0 163L0 352.565L310 352.565L310 144.233L310 7.5Z"
          fill="white"
        />
      </Svg>
      <Image style={styles.image} source={face.picture} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {face.fullname}
        </Text>
        <Text style={styles.text}>
          <MaterialIcons
            style={styles.icon}
            name="local-phone"
            size={14}
            color="#4285F4"
          />
          {""} {face.contact.phone}
        </Text>
        <Text style={styles.text}>
          <MaterialIcons
            style={styles.icon}
            name="contact-mail"
            size={14}
            color="#4285F4"
          />
          {""} {face.contact.email}
        </Text>
        <Text style={styles.faceDescription} numberOfLines={4}>
          {face.description}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.phoneIcon}
        onPress={() => {
          Platform.OS === "android"
            ? Linking.openURL(`tel:${face.contact.phone}`)
            : Linking.openURL(`telprompt:${face.contact.phone}`);
        }}
      >
        <FontAwesome name="phone" size={24} color="green" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.twitterIcon}
        onPress={() => {
          Linking.openURL(face.contact.twitter);
        }}
      >
        <FontAwesome name="twitter" size={24} color="#00acee" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkedinIcon}
        onPress={() => {
          Linking.openURL(face.contact.linkedin);
        }}
      >
        <FontAwesome name="linkedin" size={24} color="#0e76a8" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.mailIcon}
        onPress={() => {
          Linking.openURL(
            `mailto:${face.email}?subject=Facemate [Naits]&body=Hey ${face.fullname}, I'm messaging from facemate which means we were level mates`
          );
        }}
      >
        <Ionicons name="ios-mail-open-sharp" size={24} color="#4285F4" />
      </TouchableOpacity>
      {face.isStaff ? (
        <Entypo
          style={styles.certificate}
          name="awareness-ribbon"
          size={50}
          color="green"
        />
      ) : (
        <Entypo
          style={styles.certificate}
          name="graduation-cap"
          size={50}
          color="#821BC4"
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
  },
  certificate: {
    position: "absolute",
    top: 150,
    right: 100,
  },
  faceDescription: {
    marginLeft: 35,
    marginRight: 50,
    marginTop: 20,
    fontSize: 12,
    textAlign: "left",
  },
  detailsContainer: {
    position: "absolute",
    top: 200,
    alignContent: "center",
  },
  text: {
    color: "#4285F4",
    marginLeft: 35,
    textAlign: "left",
    marginBottom: 8,
  },
  icon: {
    marginTop: 200,
  },
  image: {
    position: "absolute",
    top: 100,
    left: 30,
    borderRadius: 35,
    width: 70,
    height: 70,
  },
  title: {
    fontSize: 18,
    color: colors.black,
    textAlign: "left",
    fontFamily: "AkayaKanadaka-Regular",
    marginLeft: 35,
    marginTop: -20,
  },
  phoneIcon: {
    position: "absolute",
    top: 50,
    right: 80,
  },
  twitterIcon: {
    position: "absolute",
    top: 80,
    right: 130,
  },
  linkedinIcon: {
    position: "absolute",
    top: 100,
    right: 175,
  },
  mailIcon: {
    position: "absolute",
    top: 130,
    right: 220,
  },
});

export default Face;

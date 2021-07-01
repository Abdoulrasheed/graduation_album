import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import {
  View,
  ImageBackground,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Face from "./components/Face";
import colors from "./config/colors";
import fonts from "./config/fonts";
import Text from "./components/Text";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const faces = [
  {
    fullname: "Dr. Bamanga Ribadu",
    description: "Head of Department",
    isStaff: true,
    picture: require("./assets/faces/hod.jpg"),
    contact: {
      twitter: "https://twitter.com/aiibrahim3",
      linkedin: "https://www.linkedin.com/in/abdulrasheed-ibrahim-2b3a90103/",
      email: "abdulrasheedibrahim47@gmail.com",
      phone: "07033389645",
    },
  },
  {
    fullname: "Abdulrasheed Ibrahim",
    description:
      "Aspiring to become a great business software developer that will one day disrupt the global software industry. I'm on my way there...",
    picture: require("./assets/faces/abdul.jpg"),
    contact: {
      twitter: "https://twitter.com/aiibrahim3",
      linkedin: "https://www.linkedin.com/in/abdulrasheed-ibrahim-2b3a90103/",
      email: "abdulrasheedibrahim47@gmail.com",
      phone: "07033389645",
    },
  },
  {
    fullname: "Nafiu Yau",
    description: "UI / UX",
    picture: require("./assets/faces/naf.jpg"),
    contact: {
      twitter: "https://twitter.com/aiibrahim3",
      linkedin: "https://www.linkedin.com/in/abdulrasheed-ibrahim-2b3a90103/",
      email: "naf@gmail.com",
      phone: "08167295351",
    },
  },
  {
    fullname: "Andy Arumse",
    description: "Software Developer",
    picture: require("./assets/faces/andy.jpg"),
    contact: {
      twitter: "https://twitter.com/aiibrahim3",
      linkedin: "https://www.linkedin.com/in/abdulrasheed-ibrahim-2b3a90103/",
      email: "andyarumse1@gmail.com",
      phone: "07063169364",
    },
  },
];

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [face, setActiveFace] = useState(0);

  const onScroll = (e) => {
    setActiveFace(Math.round(e.nativeEvent.contentOffset.x / 400));
  };

  const prepareApp = async () => {
    await fonts.loadFonts();
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={prepareApp}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground source={faces[face].picture} style={styles.backdrop}>
        <LinearGradient
          colors={["#821BC4", "transparent", "#00acee"]}
          style={styles.background}
        />
      </ImageBackground>
      <FlatList
        onScroll={onScroll}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        pagingEnabled
        horizontal
        contentContainerStyle={styles.cardContainer}
        data={faces}
        keyExtractor={(face) => face.fullname}
        renderItem={({ item }) => <Face face={item} />}
      />
      <Text style={styles.counter}>
        {face + 1} / {faces.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  counter: {
    position: "absolute",
    fontSize: 35,
    fontFamily: "AkayaKanadaka-Regular",
    textAlign: "center",
    bottom: 90,
    left: WIDTH * 0.4,
    color: colors.white,
  },
  backdrop: {
    position: "absolute",
    width: "100%",
    height: 300,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: HEIGHT,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  cardContainer: {
    position: "absolute",
    top: 190,
    marginLeft: 25,
  },
});

export default App;

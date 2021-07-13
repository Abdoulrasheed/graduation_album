import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import LottieView from "lottie-react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";

import {
  Animated,
  View,
  Image,
  ImageBackground,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Easing,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Face from "./components/Face";
import colors from "./config/colors";
import fonts from "./config/fonts";
import Text from "./components/Text";
import Card from "./components/Card";

const HEIGHT = Dimensions.get("window").height;

const faces = [
  {
    id: 1,
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
    description: "Software Developer",
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState();
  const [currentItem, setcurrentItem] = useState(0);
  const [isMuted, setisMuted] = useState(false);

  const onScroll = (e) => {
    setActiveFace(Math.round(e.nativeEvent.contentOffset.x / 400));
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const start = async () => {
    setcurrentItem(faces[0]);
    for (let i = 0; i <= faces.length; i++) {
      await sleep(5000);
      faces[i] && setcurrentItem(faces[i]);

      // stop slide show when end reached
      if (i === faces.length) {
        setIsPlaying(false);
        setisMuted(false);
        sound.stopAsync();
      }
    }
  };

  const prepareApp = async () => {
    await fonts.loadFonts();
  };

  const playSound = async () => {
    setIsPlaying(!isPlaying);

    if (!isPlaying) {
      start();
      fadeIn();
      sound.playAsync();
    } else {
      sound.stopAsync();
      setisMuted(false);
      setcurrentItem(0);
    }
  };

  const scaleAnim = useRef(new Animated.Value(0)).current;

  const scale = {
    transform: [
      {
        scaleX: scaleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 1],
        }),
      },
      {
        scaleY: scaleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 1],
        }),
      },
    ],
  };

  const fadeIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    loadAudio();
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, []);

  const loadAudio = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/audio/hero.mp3")
    );
    setSound(sound);
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
      <StatusBar hidden />
      <ImageBackground
        source={isPlaying ? currentItem.picture : faces[face].picture}
        style={styles.backdrop}
      >
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
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardContainer}
        data={faces}
        keyExtractor={(face) => face.fullname}
        renderItem={({ item }) =>
          isPlaying ? (
            <Card item={currentItem} animation={scale} />
          ) : (
            <Face face={item} />
          )
        }
      />
      {isPlaying && (
        <>
          <LottieView
            autoPlay
            loop={true}
            speed={1}
            source={require("./assets/animation/siri.json")}
            style={styles.siri}
          />
          <Animated.Text
            style={{
              ...styles.animatedText,
              ...scale,
            }}
          >
            {currentItem.fullname}
            {"\n"}
            <Text style={styles.animatedTextDesc}>
              {currentItem.description || "Student"}
            </Text>
          </Animated.Text>
        </>
      )}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.playButton} onPress={playSound}>
          {isPlaying ? (
            <FontAwesome5 name="stop-circle" size={34} color="#821BC4" />
          ) : (
            <FontAwesome5
              style={styles.playIcon}
              name="play-circle"
              size={34}
              color="#821BC4"
            />
          )}
        </TouchableOpacity>
        <Text style={styles.counter}>
          {isPlaying
            ? faces.indexOf(currentItem) + 1 + " / " + faces.length
            : face + 1 + " / " + faces.length}
        </Text>
        {isPlaying && (
          <TouchableOpacity
            style={styles.muteSound}
            onPress={() => {
              setisMuted(!isMuted);
              sound.setVolumeAsync(isMuted ? 0 : 1);
            }}
          >
            {isMuted ? (
              <Ionicons name="volume-high-sharp" size={34} color="white" />
            ) : (
              <Ionicons
                style={styles.muteSound}
                name="ios-volume-mute"
                size={34}
                color="white"
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={styles.creatorButton}
        onPress={() => {
          Alert.alert(
            "App Creator",
            "Name: Abdulrasheed Ibrahim\nwebsite: abdull.dev\nPhone: 07033389645\nEmail: abdoul@tuta.io"
          );
        }}
      >
        <Image
          style={styles.creator}
          source={require("./assets/faces/abdul.jpg")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  animatedText: {
    position: "absolute",
    fontSize: 35,
    fontFamily: "AkayaKanadaka-Regular",
    textAlign: "center",
    color: colors.white,
    marginTop: 60,
    marginLeft: 20,
  },
  animatedTextDesc: {
    textAlign: "left",
    fontSize: 15,
    fontFamily: "AkayaKanadaka-Regular",
  },
  buttonsContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginBottom: 80,
  },
  counter: {
    fontSize: 25,
    fontFamily: "AkayaKanadaka-Regular",
    textAlign: "center",
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
    backgroundColor: colors.white,
  },
  cardContainer: {
    top: 190,
    position: "absolute",
  },
  siri: {
    top: HEIGHT / 3.6,
  },
  creator: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  creatorButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default App;

import * as Font from "expo-font";

let fonts = {
  "AkayaKanadaka-Regular": require("../assets/fonts/AkayaKanadaka-Regular.ttf"),
  "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
  "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
};

export default {
  loadFonts: async () => await Font.loadAsync(fonts),
  primaryFont: "Poppins-Regular",
  secondaryFont: "AkayaKanadaka-Regular",
};

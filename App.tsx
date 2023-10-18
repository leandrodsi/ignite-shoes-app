import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { NativeBaseProvider } from "native-base";
import { StatusBar } from "react-native";
import OneSignal from "react-native-onesignal";

import { Routes } from "./src/routes";

import { Loading } from "./src/components/Loading";
import { THEME } from "./src/theme";

import { useEffect } from "react";
import { CartContextProvider } from "./src/contexts/CartContext";
import { tagUserInfoCreate } from "./src/notifications/notificationsTags";

OneSignal.setAppId("329de53b-f757-42bf-bb8b-b30cc1bd55d1");

OneSignal.setEmail("leandrodsystems@gmail.com");

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler((response) => {
      const { actionId } = response.action as any;

      if (actionId) {
        console.log(actionId === "1" ? "Ver todas" : "Ver pedido");
      }
    });

    return () => unsubscribe;
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useTheme } from "native-base";

import { useEffect, useState } from "react";
import OneSignal, {
  NotificationReceivedEvent,
  OSNotification,
} from "react-native-onesignal";
import { Notification } from "../components/Notification";
import { AppRoutes } from "./app.routes";

const linking = {
  prefixes: [
    "com.leandrodsi.igniteshoes://",
    "exp+igniteshoesapp://",
    "appigniteshoes://",
  ],
  config: {
    screens: {
      details: {
        path: "details/:productId",
        parse: { productId: (productId: string) => productId },
      },
    },
  },
};

export function Routes() {
  const { colors } = useTheme();
  const [notification, setNotification] = useState<OSNotification | null>(null);

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent: NotificationReceivedEvent) => {
        const response = notificationReceivedEvent.getNotification();

        setNotification(response);
      },
    );

    return () => unsubscribe;
  }, []);

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />

      {notification?.title && (
        <Notification
          data={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </NavigationContainer>
  );
}

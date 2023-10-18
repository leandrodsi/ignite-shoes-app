import OneSignal from "react-native-onesignal";

export function tagUserEmailCreate(email: string) {
  OneSignal.sendTag("user_email", email);
}

export function tagUserEmailRemove() {
  OneSignal.deleteTag("user_email");
}

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    user_name: "Leandro",
    user_email: "leandro@hotmail.com",
  });
}

export function tagCartUpdate(itemsCount: string) {
  OneSignal.sendTag("cart_items_count", itemsCount);
}

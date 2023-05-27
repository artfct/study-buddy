import { CometChat } from "@cometchat-pro/chat";

export default async function logInCometChatUser(uid, authKey) {
  try {
    await CometChat.login(uid, authKey);
    console.log("CometChat Login Successful:", { uid });
  } catch (error) {
    console.log("Login failed with exception:", { error });
  }
}

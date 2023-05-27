import { CometChat } from "@cometchat-pro/chat";

export default async function createCometChatUser(uid, name, authKey) {
    try {
        const user = new CometChat.User(uid);
        user.setName(name);
        await CometChat.createUser(user, authKey);
        console.log("User created successfully:", user);
        // return CometChat.createUser(user, authKey);
      } catch (error) {
        console.log("User creation failed with error:", error);
        // Handle the error appropriately
        throw error;
      }

}

import { CometChat } from "@cometchat-pro/chat";

const appID = process.env.REACT_APP_COMECHAT_APP_ID;
const region = process.env.REACT_APP_COMECHAT_REGION;
const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
const cometChatInstance = CometChat.init(appID, appSetting).then(
  () => {
    console.log("CometChat Initialization completed successfully");
    // You can now call login function.
  },
  error => {
    console.log("CometChat Initialization failed with error:", error);
    // Check the reason for error and take appropriate action.
  }
);

export default cometChatInstance;
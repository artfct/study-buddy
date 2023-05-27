import React from 'react';
import cometChatInstance from './cometchat';

const CometChatContext = React.createContext();

export function useCometChat() {
  return React.useContext(CometChatContext);
}

export function CometChatProvider({ children }) {
  return (
    <CometChatContext.Provider value={cometChatInstance}>
      {children}
    </CometChatContext.Provider>
  );
}

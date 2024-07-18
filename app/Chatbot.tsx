import React from "react";
import { FullPageChat as OriginalFullPageChat } from "flowise-embed-react";

interface BotProps {
  chatflowid: string;
  apiHost: string;
  theme?: {
    chatWindow: {
      title: string;
      titleAvatarSrc: string;
      welcomeMessage: string;
      errorMessage: string;
      backgroundColor: string;
      height: number;
      width: string;
      fontSize: number;
      poweredByTextColor: string;
      botMessage: {
        backgroundColor: string;
        textColor: string;
        showAvatar: boolean;
        avatarSrc: string;
      };
      userMessage: {
        backgroundColor: string;
        textColor: string;
        showAvatar: boolean;
        avatarSrc: string;
      };
      textInput: {
        placeholder: string;
        backgroundColor: string;
        textColor: string;
        sendButtonColor: string;
        maxChars: number;
        maxCharsWarningMessage: string;
        autoFocus: boolean;
      };
      feedback: {
        color: string;
      };
      footer: {
        textColor: string;
        text: string;
        company: string;
        companyLink: string;
      };
    };
  };
  style?: React.CSSProperties;
  className?: string;
}

const FullPageChat: React.FC<BotProps> = ({ chatflowid, apiHost, theme }) => {
  // Implement logic here to apply the theme if necessary
  return <OriginalFullPageChat chatflowid={chatflowid} apiHost={apiHost} />;
};

export default FullPageChat;

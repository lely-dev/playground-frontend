import React, { createContext } from "react";
import { useState, useEffect } from "react";

export const AuthPlayer = createContext(null);

export function AuthPlayerProvider({ children }) {
  const [tokenPlayer, setTokenPlayer] = useState(
    localStorage.getItem("playerToken") || ""
  );
  const [authenticated, setAuthenticated] = useState(false);
  const [playerId, setPlayerId] = useState(
    localStorage.getItem("playerId") || ""
  );
  const [playerAvatar, setPlayerAvatar] = useState(
    localStorage.getItem("playerAvatar") || ""
  );

  useEffect(() => {
    setAuthenticated(tokenPlayer !== "");
    if (tokenPlayer) {
      localStorage.setItem("playerToken", tokenPlayer);
    } else {
      localStorage.removeItem("playerToken");
    }
    if (playerId) {
      localStorage.setItem("playerId", playerId);
    } else {
      localStorage.removeItem("playerId");
    }
    if (playerAvatar) {
      localStorage.setItem("playerAvatar", playerAvatar);
    } else {
      localStorage.removeItem("playerAvatar");
    }
  }, [tokenPlayer, playerId, playerAvatar]);

  const value = {
    tokenPlayer,
    setTokenPlayer,
    authenticated,
    playerId,
    setPlayerId,
    playerAvatar,
    setPlayerAvatar,
  };

  return <AuthPlayer.Provider value={value}>{children}</AuthPlayer.Provider>;
}

import { LayoutGroup } from "framer-motion";
import React from "react";

import Details from "../components/Details";
import Header from "../components/Header";
import IconBar from "../components/IconBar";
import Navbar from "../components/Navbar";
import PlayerControls from "../components/PlayerControl";
import ProgressBar from "../components/ProgressBar";
import Volume from "../components/Volumn";
import AppContextProvider from "../context api/AppContext";

function MusicPlayer() {
  return (
    <div
      className="relative mx-auto my-8 flex h-[700px] w-[400px] flex-col rounded-xl  py-2 px-4 text-white"
      style={{
        backgroundColor: "#421CA9",
        backgroundImage: `
            radial-gradient(at 21% 33%, #5D97F3 0px, transparent 50%),
            radial-gradient(at 79% 32%, #6067B5 0px, transparent 50%),
            radial-gradient(at 26% 83%, #421CA9 0px, transparent 50%)`,
      }}
    >
      <Header />
      <Navbar />
      <AppContextProvider>
        <Details />
        <LayoutGroup>
          <ProgressBar />

          <PlayerControls />

          <Volume />
        </LayoutGroup>
      </AppContextProvider>

      <IconBar />
    </div>
  );
}

export default MusicPlayer;

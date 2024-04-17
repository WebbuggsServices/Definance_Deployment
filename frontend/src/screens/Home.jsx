import React, { useEffect, useRef, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import "../App.css";

function Home() {
  const [zoombtn, setZoombtn] = useState(true);
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "/game-build/Definance_WebGL_Build.loader.js",
    dataUrl: "/game-build/Definance_WebGL_Build.data",
    frameworkUrl: "/game-build/Definance_WebGL_Build.framework.js",
    codeUrl: "/game-build/Definance_WebGL_Build.wasm",
  });

  const unityContainerRef = useRef(null);
  const unityFooterRef = useRef(null);
  useEffect(() => {
    const unityContainer = unityContainerRef.current;
    const unityFooter = unityFooterRef.current;
    const header = document.querySelector(".header");
    const container = document.querySelector(".root-container");

    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        setZoombtn(false);
        document.documentElement.requestFullscreen();
        header.classList.add("hidden");
        container.classList.add("full-container");
        unityContainer.classList.add("unity-container-full");
      } else {
        if (document.exitFullscreen) {
          setZoombtn(true);
          document.exitFullscreen();
          header.classList.remove("hidden");
          container.classList.remove("full-container");
          unityContainer.classList.remove("unity-container-full");
        }
      }
    };
    unityFooter.addEventListener("click", toggleFullScreen);
    return () => {
      unityFooter.removeEventListener("click", toggleFullScreen);
    };
  }, []);

  return (
    <>
      <div className="unity-container" ref={unityContainerRef}>
        {isLoaded === false && (
          <div className="loading">
            <div className="loadingText">
              {Math.round(loadingProgression * 100)}%
            </div>
            <div className="loadingBar">
              <div
                className="loadingBarFill"
                style={{ width: `${loadingProgression * 100}%` }}
              />
            </div>
          </div>
        )}
        <Unity
          unityProvider={unityProvider}
          className="game"
          style={{
            display: isLoaded ? "block" : "none",
          }}
        />
      </div>
      <div className="unity-footer" ref={unityFooterRef}>
        <img
          style={{ height:"30px",width:"30px" }}
          src={zoombtn ? "/fullscreen-button.png" : "/exitScreen-button.png"}
          alt="Fullscreen"
        />
      </div>
    </>
  );
}

export default Home;

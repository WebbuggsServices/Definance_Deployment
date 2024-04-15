import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import "../App.css";

function Home() {
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "/game-build/Definance_WebGL_Build.loader.js",
    dataUrl: "/game-build/Definance_WebGL_Build.data",
    frameworkUrl: "/game-build/Definance_WebGL_Build.framework.js",
    codeUrl: "/game-build/Definance_WebGL_Build.wasm",
  });
  function toggleFullScreen() {
    var header = document.getElementsByClassName('header')[0];
    var container=document.getElementsByClassName('root-container')[0];
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      header.classList.add('hidden');
      container.classList.add('full-container');
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        header.classList.remove('hidden');
        container.classList.remove('full-container');
      } 
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <div className="unity-container">
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
            width: "100%",
            height: "100%",
            display: isLoaded ? "block" : "none",
          }}
        />
      </div>
      <div className="unity-footer">
        <img src="/webgl-logo.png" alt="webgl-logo.png" />
        <div>
          <span>DeFinance-Passive-Empire</span>
          <img
            style={{ marginLeft: "10px", marginTop: "1px" }}
            src="/fullscreen-button.png"
            alt="Fullscreen"
            id="unity-fullscreen-button"
            onClick={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;

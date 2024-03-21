import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import "../App.css";

function Home() {
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "assets/Build.loader.js",
    dataUrl: "assets/Build.data",
    frameworkUrl: "assets/Build.framework.js",
    codeUrl: "assets/Build.wasm",
  });

  return (
    <>
      <div className="App">
        <div className="game-provider">
          {isLoaded === false && (
            <>
              <div className="loadingBar">
                <div
                  className="loadingBarFill"
                  style={{ width: loadingProgression * 100 * 4 }}
                />
              </div>
              <p className="text1" style={{ color: "white" }}>
                Loading Application... {Math.round(loadingProgression * 100)}%
              </p>
            </>
          )}
          <Unity
            unityProvider={unityProvider}
            className="unity-container"
            style={{ display: isLoaded ? "block" : "none" }}
          />
        </div>
      </div>
    </>
  );
}

export default Home;

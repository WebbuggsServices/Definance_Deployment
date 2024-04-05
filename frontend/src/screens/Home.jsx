import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import "../App.css";

function Home() {
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "assets/Build/Definance_WebGL_Build.loader.js",
    dataUrl: "assets/Build/Definance_WebGL_Build.data",
    frameworkUrl: "assets/Build/Definance_WebGL_Build.framework.js",
    codeUrl: "assets/Build/Definance_WebGL_Build.wasm",
  });

  return (
    <>  
      <div className="game-provider unity-container">
          {isLoaded === false && (
            <>
              <div className="loadingBar">
                <div
                  className="loadingBarFill"
                  style={{ width: loadingProgression * 100 * 4 }}
                />
              </div>
              <p className="text" style={{ color: "white" }}>
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
    </>
  );
}

export default Home;

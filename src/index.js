import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Polygon;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider desiredChainId={activeChainId}
    sdkOptions={{
      gasless: {
        openzeppelin: {
          relayerUrl: "https://api.defender.openzeppelin.com/autotasks/7c50e13d-988a-43ca-b519-ffb57474c363/runs/webhook/bb91c160-5af7-4067-94e9-f1416359568b/LSfZ8UWZh3av6jECkhdeUr",
        },
      },
    }}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);



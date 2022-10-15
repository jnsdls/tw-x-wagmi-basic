import React, { PropsWithChildren } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChainId, ThirdwebSDKProvider } from "@thirdweb-dev/react";
import "./styles/globals.css";

import {
  WagmiConfig,
  createClient,
  useProvider,
  useSigner,
  useQueryClient,
} from "wagmi";
import { getDefaultProvider } from "ethers";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

const ThirdwebSdkProviderWrapper: React.FC<PropsWithChildren> = () => {
  const provider = useProvider();
  const signer = useSigner();
  const queryClient = useQueryClient();
  return (
    <ThirdwebSDKProvider
      provider={provider}
      // wagmi makes this null not undefined and we expect undefined... something to clean up on our end
      signer={signer.data || undefined}
      desiredChainId={activeChainId}
      queryClient={queryClient}
    >
      <App />
    </ThirdwebSDKProvider>
  );
};

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(activeChainId),
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <ThirdwebSdkProviderWrapper>
        <App />
      </ThirdwebSdkProviderWrapper>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

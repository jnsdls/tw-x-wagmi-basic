import { useSDK } from "@thirdweb-dev/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import "./styles/Home.css";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const sdk = useSDK();

  console.log("account", { address, isConnected });
  console.log("sdk", sdk);

  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          Welcome to <a href="https://thirdweb.com/">thirdweb</a>!
        </h1>

        <p className="description">
          Get started by configuring your desired network in{" "}
          <code className="code">src/index.tsx</code>, then modify the{" "}
          <code className="code">src/App.tsx</code> file!
        </p>

        <div className="connect">
          {isConnected ? (
            <div>
              Connected to {address}
              <button onClick={() => disconnect()}>Disconnect</button>
              <button onClick={() => sdk?.wallet.sign("wagmi x thirdweb")}>
                Sign a message with wagmi wallet
              </button>
            </div>
          ) : (
            <button onClick={() => connect()}>Connect</button>
          )}
        </div>

        <div className="grid">
          <a href="https://portal.thirdweb.com/" className="card">
            <h2>Portal &rarr;</h2>
            <p>
              Guides, references and resources that will help you build with
              thirdweb.
            </p>
          </a>

          <a href="https://thirdweb.com/dashboard" className="card">
            <h2>Dashboard &rarr;</h2>
            <p>
              Deploy, configure and manage your smart contracts from the
              dashboard.
            </p>
          </a>

          <a href="https://portal.thirdweb.com/templates" className="card">
            <h2>Templates &rarr;</h2>
            <p>
              Discover and clone template projects showcasing thirdweb features.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}

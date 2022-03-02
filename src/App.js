import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { useState, useEffect } from "react";
import { WsProvider, ApiPromise } from "@polkadot/api";

function App() {
  const [wallets, setWallets] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const [api, setApi] = useState();
  const [apiReady, setApiReady] = useState(false);
  const [chainData, setChainData] = useState({
    chainName: "",
    nodeName: "",
    nodeVersion: "",
  });

  useEffect(() => {
    const provider = new WsProvider(WS_PROVIDER);

    ApiPromise.create({ provider })
      .then((api) => {
        setApi(api);
        // api.isReady.then(() => setApiReady(true));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleWalletConnection = async () => {
    const allInjected = await web3Enable("react");
    const allAccounts = await web3Accounts();
    setAccounts(allAccounts);
    setWallets(allInjected);

    const [chain, nodeName, nodeVersion] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version(),
    ]);
    setChainData({
      chainName: `${chain}`,
      nodeName: `${nodeName}`,
      nodeVersion: `${nodeVersion}`,
    });

    api.isReady.then(() => setApiReady(true));
  };

  return (
    <div>
      <button onClick={handleWalletConnection}>Connect Wallet</button>

      {wallets.map((wallet) => {
        return <p>{wallet.name}</p>;
      })}

      {accounts.map((account) => {
        return (
          <div>
            <p>
              Account Name - {account.meta.name} || Account Address -{" "}
              {account.address}
            </p>
          </div>
        );
      })}

      {apiReady ? (
        <div>
          connected to blockchain {chainData.chainName}, using{" "}
          {chainData.nodeName} v{chainData.nodeVersion}
        </div>
      ) : (
        <div>Connecting to blockchain</div>
      )}
    </div>
  );
}

export default App;

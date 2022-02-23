import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { useState } from "react";

function App() {
	const [wallets, setWallets] = useState([]);
	const [accounts, setAccounts] = useState([]);

	const handleWalletConnection = async () => {
		const allInjected = await web3Enable("react");
		const allAccounts = await web3Accounts();
		setAccounts(allAccounts);
		setWallets(allInjected);
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
		</div>
	);
}

export default App;

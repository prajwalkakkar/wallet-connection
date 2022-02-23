const polkadot = require("@polkadot/api");

const { ApiPromise, WsProvider } = polkadot;

const ADDR = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";
const wsProvider = new WsProvider("ws://127.0.0.1:9944");
const main = async () => {
  const api = await ApiPromise.create({ provider: wsProvider });

  const [now, { nonce, data: balance }] = await Promise.all([
    api.query.timestamp.now(),
    api.query.system.account(ADDR),
  ]);
  const metaData = api.runtimeMetadata;
  // console.log(`${now} : Balance of ${balance.free} and a nonce of ${nonce}`);
  const div = 10 ** 18;
  const bal = parseInt(balance.free.toString());
  console.log("Balance of alice is ", bal / div);
  console.log({ metaData });
};

main()
  .catch((err) => console.log(err))
  .finally(() => process.exit(1));

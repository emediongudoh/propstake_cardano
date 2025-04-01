import { blake2bHex } from "blakejs";
import {
  Constr,
  Data,
  fromHex,
  fromText,
  RedeemerBuilder,
  toText,
  toUnit,
  TxSignBuilder,
  UTxO,
} from "@lucid-evolution/lucid";

import { WalletConnection } from "./contexts/wallet/WalletContext";
import { koios } from "./providers/koios";
import { handleError, handleSuccess } from "./utils";

import { Cip68Metadatum } from "@/types/cip68";
import { Token } from "@/types/token";
import * as Script from "@/config/script";

async function submitTx(tx: TxSignBuilder) {
  const txSigned = await tx.sign.withWallet().complete();
  const txHash = await txSigned.submit();

  return txHash;
}

function getShortestUTxO(utxos: UTxO[]) {
  const bigint2str = (_: any, val: { toString: () => any }) =>
    typeof val === "bigint" ? val.toString() : val;

  let shortestUTxO = JSON.stringify(utxos[0], bigint2str).length;
  let utxo = utxos[0];

  for (let u = 1; u < utxos.length; u++) {
    const currLen = JSON.stringify(utxos[u], bigint2str).length;

    if (currLen < shortestUTxO) {
      shortestUTxO = currLen;
      utxo = utxos[u];
    }
  }

  return utxo;
}

export async function queryAddressAssets({ lucid, address }: WalletConnection) {
  if (!lucid) throw "Uninitialized Lucid";
  if (!address) throw "Disconnected Wallet";

  const usrTokens = await koios.queryAddressAssets(
    `${address}`,
    Script.PolicyID,
  );
  const refTokens = usrTokens.map(([policyID, assetName]: string[]) => {
    return toUnit(policyID, assetName.slice(8), 100);
  });

  const utxos = await lucid.utxosAt(Script.Address);

  const nameHex = fromText("name");
  const imageHex = fromText("image");

  let tokens: Token[] = [];

  for (const refToken of refTokens) {
    const utxo = utxos.find((utxo) => utxo.assets[refToken]);

    if (!utxo) continue; // should never happen

    const { metadata } = Data.from(`${utxo.datum}`, Cip68Metadatum);

    const name = toText(`${metadata.get(nameHex)}`);
    const image = toText(`${metadata.get(imageHex)}`);

    tokens.push({ name, image, utxo, assetName: refToken.slice(64) });
  }

  tokens.sort((l, r) => {
    return l.name.toUpperCase() < r.name.toUpperCase() ? -1 : 1;
  });

  return tokens;
}

export async function mint(
  token: { name: string; image: string },
  { lucid, walletApi }: WalletConnection,
) {
  try {
    if (!lucid) throw "Uninitialized Lucid";
    if (!walletApi) throw "Disconnected Wallet";

    if (token.name.length > 32 - 4) throw "Token Name is too long!";
    if (token.image.length > 64) throw "Image URL is too long!";

    const cip68: Cip68Metadatum = {
      metadata: new Map(
        Object.entries(token).map(([k, v]) => [fromText(k), fromText(v)]),
      ),
      version: 1n,
      extra: [],
    };
    const datum = Data.to(cip68, Cip68Metadatum);

    if (!lucid.wallet()) lucid.selectWallet.fromAPI(walletApi);
    const utxos = await lucid.wallet().getUtxos();

    if (!utxos) throw "Empty user wallet!";

    const nonce = getShortestUTxO(utxos);

    const nonceUTxO = new Constr(0, [
      String(nonce.txHash),
      BigInt(nonce.outputIndex),
    ]);
    const mintAction = new Constr(0, [nonceUTxO]);
    const redeemer = Data.to(mintAction);

    const assetName = blake2bHex(fromHex(Data.to(nonceUTxO)), undefined, 28);

    const refUnit = toUnit(Script.PolicyID, assetName, 100);
    const usrUnit = toUnit(Script.PolicyID, assetName, 222);

    const tx = await lucid
      .newTx()
      .collectFrom([nonce])
      .mintAssets(
        {
          [refUnit]: 1n,
          [usrUnit]: 1n,
        },
        redeemer,
      )
      .attach.MintingPolicy(Script.Cip68)
      .pay.ToContract(
        Script.Address,
        { kind: "inline", value: datum },
        {
          [refUnit]: 1n,
        },
      )
      .validTo(new Date().getTime() + 15 * 60_000) // 15 minutes
      .complete();

    const txHash = await submitTx(tx);

    handleSuccess(`Mint Token TxHash: ${txHash}`);

    const utxo: UTxO = {
      address: Script.Address,
      assets: { [refUnit]: 1n },
      txHash,
      outputIndex: 0,
      datum,
    };

    return { ...token, utxo, assetName };
  } catch (error) {
    handleError(error);
  }
}

export async function update(
  token: { name: string; image: string; utxo: UTxO; assetName: string },
  { lucid, walletApi, address }: WalletConnection,
) {
  try {
    if (!lucid) throw "Uninitialized Lucid";
    if (!walletApi || !address) throw "Disconnected Wallet";

    if (token.name.length > 32 - 4) throw "Token Name is too long!";
    if (token.image.length > 64) throw "Image URL is too long!";

    const cip68: Cip68Metadatum = {
      metadata: new Map(
        Object.entries({ name: token.name, image: token.image }).map(
          ([k, v]) => [fromText(k), fromText(v)],
        ),
      ),
      version: 1n,
      extra: [],
    };
    const datum = Data.to(cip68, Cip68Metadatum);

    const refUnit = toUnit(Script.PolicyID, token.assetName, 100);
    const usrUnit = toUnit(Script.PolicyID, token.assetName, 222);

    if (!lucid.wallet()) lucid.selectWallet.fromAPI(walletApi);

    const inputs = await lucid.utxosAtWithUnit(address, usrUnit);
    const utxos = [...inputs, token.utxo];

    const redeemer: RedeemerBuilder = {
      inputs,
      kind: "selected",
      makeRedeemer: (usrTokenInputIdx) => {
        const updateAction = new Constr(1, usrTokenInputIdx);

        return Data.to(updateAction);
      },
    };

    const tx = await lucid
      .newTx()
      .collectFrom(utxos, redeemer)
      .attach.SpendingValidator(Script.Cip68)
      .pay.ToContract(
        Script.Address,
        { kind: "inline", value: datum },
        {
          [refUnit]: 1n,
        },
      )
      .validTo(new Date().getTime() + 15 * 60_000) // 15 minutes
      .complete();

    const txHash = await submitTx(tx);

    handleSuccess(`Update Token TxHash: ${txHash}`);

    const utxo: UTxO = {
      address: Script.Address,
      assets: { [refUnit]: 1n },
      txHash,
      outputIndex: 0,
      datum,
    };

    return { ...token, utxo };
  } catch (error) {
    handleError(error);
  }
}

export async function burn(
  token: { name: string; image: string; utxo: UTxO; assetName: string },
  { lucid, walletApi, address }: WalletConnection,
) {
  try {
    if (!lucid) throw "Uninitialized Lucid";
    if (!walletApi || !address) throw "Disconnected Wallet";

    const refUnit = toUnit(Script.PolicyID, token.assetName, 100);
    const usrUnit = toUnit(Script.PolicyID, token.assetName, 222);

    if (!lucid.wallet()) lucid.selectWallet.fromAPI(walletApi);

    const inputs = await lucid.utxosAtWithUnit(address, usrUnit);
    const utxos = [...inputs, token.utxo];

    const burnAction = new Constr(2, []);
    const redeemer = Data.to(burnAction);

    const tx = await lucid
      .newTx()
      .collectFrom(utxos, redeemer)
      .mintAssets(
        {
          [refUnit]: -1n,
          [usrUnit]: -1n,
        },
        redeemer,
      )
      .attach.Script(Script.Cip68)
      .validTo(new Date().getTime() + 15 * 60_000) // 15 minutes
      .complete();

    const txHash = await submitTx(tx);

    handleSuccess(`Burn Token TxHash: ${txHash}`);

    const utxo: UTxO = { address: "", assets: {}, txHash, outputIndex: -1 };

    return { ...token, utxo };
  } catch (error) {
    handleError(error);
  }
}

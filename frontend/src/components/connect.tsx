import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "../client";

const wallets = [createWallet("io.metamask")];

export default function Connect() {
  return (
    <div>
      <ConnectButton client={client} wallets={wallets} />
    </div>
  );
}

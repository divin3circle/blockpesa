import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { useActiveAccount } from "thirdweb/react";

const clientId = "9d271035b137b72596768d09c30498d5";

export const client = createThirdwebClient({
  clientId: clientId,
});

export const contract = getContract({
  client,
  chain: defineChain(80002),
  address: "0xCDbFf12460C73F78CB3cB4Ad8a41731A7c60787E",
});

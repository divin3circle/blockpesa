import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

const clientId = "9d271035b137b72596768d09c30498d5";

export const client = createThirdwebClient({
  clientId: clientId,
});

export const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: "0x7fa1b0E28aE07619E86f1d0372a06b37951cE811",
});

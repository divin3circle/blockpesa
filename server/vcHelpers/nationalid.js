module.exports = {
  nationalid: (credentialSubject) => ({
    circuitId: "credentialAtomicQuerySigV2",
    id: 1725740055,
    query: {
      allowedIssuers: ["*"],
      context: "ipfs://QmNcavUJ1zywbSNjTAuwD3B7cebZmo7TqFLMNJxkoVxrn3",
      type: "NationalId",
    }
  }),
  // See more off-chain examples
  // https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/#equals-operator-1
};
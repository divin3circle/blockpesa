const { nationalid } = require("./vcHelpers/nationalid");

// design your own customised authentication requirement here using Query Language
// https://0xpolygonid.github.io/tutorials/verifier/verification-library/zk-query-language/

const humanReadableAuthReason = "Must have a valid National ID";

const credentialSubject = {
  NIN: {
    $ne: null,
  },
};

const proofRequest = nationalid(credentialSubject);

module.exports = {
  humanReadableAuthReason,
  proofRequest,
};
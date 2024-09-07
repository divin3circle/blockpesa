const { auth, resolver } = require("@iden3/js-iden3-auth");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

// Constants (these would typically be in an .env file)
const ethURL = "https://polygon-amoy.g.alchemy.com/v2/CZADxmUkKg93ma_X-e-B0Xo1HC_Z40cy";
const contractAddress = "0x1a4cC30f2aA0377b0c3bc9848766D90cb4404124";
const ipfsGatewayURL = "https://gateway.pinata.cloud";
//const verifierBackendHost = "https://your-public-ip";
//const verifierBackendPort = 3010;
const verifierBackendKeyDir = "./keys";
const verifierIpfsUrl = "https://gateway.pinata.cloud";
const verifierBackendAmoySenderDid = "did:polygonid:polygon:amoy:2qH7TstpRRJHXNN4o49Fu9H2Qismku8hQeUxDVrjqT";
const verifierBackendMainSenderDid = "did:polygonid:polygon:main:q4Q7F7tM1xpwUTgWivb6TgKX3vWirsE3mqymuYjVv";
const verifierBackendResolverSettingsPath = "./resolvers_settings.yaml";

const ethStateResolver = new resolver.EthStateResolver(ethURL, contractAddress);
const resolvers = {
  ["polygon:amoy"]: ethStateResolver,
};

async function createAuthRequest(callbackURL) {
  const sessionId = uuidv4();
  const audience = verifierBackendAmoySenderDid;
  const uri = `${callbackURL}?sessionId=${sessionId}`;
  const reason = "CrowdFunding Platform Verification";
  const messageToSign = "Please sign this message to verify your identity for the CrowdFunding platform.";

  const request = auth.createAuthorizationRequestWithMessage(reason, messageToSign, audience, uri);

  request.id = uuidv4();
  request.thid = request.id;
  request.from = audience;
  request.typ = "application/iden3comm-plain-json";
  request.type = "https://iden3-communication.io/authorization/1.0/request";
  request.body = {
    reason: reason,
    message: messageToSign,
    callbackUrl: uri,
    scope: [
      {
        id: 1,
        circuitId: "credentialAtomicQuerySigV2",
        query: {
          allowedIssuers: ["*"],
          type: "KYCAgeCredential",
          context: "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld",
          credentialSubject: {
            birthday: {
              $lt: 20000101, // User must be born before 01/01/2000
            },
          },
        },
      },
    ],
  };

  return { request, sessionId };
}

async function verifyAuthResponse(tokenStr, authRequest) {
  try {
    const verifier = new auth.Verifier({
      keyDir: verifierBackendKeyDir,
      resolverSettingsPath: verifierBackendResolverSettingsPath,
      documentLoader: auth.documentLoader,
    });

    const authResponse = await verifier.verifyAuthResponse(tokenStr, authRequest);
    return authResponse;
  } catch (error) {
    console.error("Error in verifyAuthResponse:", error);
    throw error;
  }
}

module.exports = {
  createAuthRequest,
  verifyAuthResponse,
};
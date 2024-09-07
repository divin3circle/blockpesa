const getRawBody = require("raw-body");
const { createAuthRequest, verifyAuthResponse } = require("../utils/privadoUtils");
const { v4: uuidv4 } = require('uuid');

const requestMap = new Map();

async function getAuthRequest(req, res) {
  const callbackURL = "http://localhost:8080/api/auth/callback";

  try {
    const { request, sessionId } = await createAuthRequest(callbackURL);
    requestMap.set(sessionId, request);

    console.log("Generated Session ID:", sessionId); // Log the generated session ID

    return res.status(200).set("Content-Type", "application/json").send(request);
  } catch (error) {
    console.error("Error creating auth request:", error);
    return res.status(500).send({ error: "Failed to create auth request" });
  }
}

async function handleCallback(req, res) {
  const sessionId = req.query.sessionId;

  try {
    const raw = await getRawBody(req);
    const tokenStr = raw.toString().trim();

    const authRequest = requestMap.get(sessionId);

    console.log("Session ID:", sessionId);
    console.log("Token String:", tokenStr);
    console.log("Auth Request:", authRequest);

    if (!authRequest) {
      return res.status(400).send({ error: "Invalid session ID" });
    }

    const authResponse = await verifyAuthResponse(tokenStr, authRequest);
    console.log("Auth Response:", authResponse);

    return res.status(200).set("Content-Type", "application/json").send(authResponse);
  } catch (error) {
    console.error("Error verifying auth response:", error);
    return res.status(500).send({ error: "Failed to verify auth response" });
  }
}

module.exports = {
  getAuthRequest,
  handleCallback,
};
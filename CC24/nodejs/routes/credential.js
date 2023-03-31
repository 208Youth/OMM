const express = require("express");
const router = express.Router();
const http = require("../module/http");
const did = require("../module/did");

// Issue Credential
router.post("/", async (req, res) => {
  const { holderDid, vpJwt, credentialName, id = null } = req.body;

  try {
    await did.verifyHolderDid(holderDid);
    const verifiableCredential = await did.verifyVP(vpJwt, holderDid);
    const personalId = await did.getPersonalId(verifiableCredential, holderDid);
    console.log(personalId);
    if (!personalId) {
      throw new Error("No personalId");
    }
    const data = JSON.stringify({
      credentialName: credentialName,
      personalId: personalId,
      id: id,
    });
    const jsonData = JSON.stringify(data);

    const options = {
      hostname: "localhost",
      port: 3324,
      path: "/api/cert",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": jsonData.length,
      },
    };
    const response = await http.sendHttpRequest(data, options);
    const vcJwt = await did.issueVC(
      holderDid,
      credentialName,
      JSON.parse(response)
    );
    res.json({ vcJwt: vcJwt });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Issue PersonalId Credential
router.post("/personal-id", async (req, res) => {
  const { holderDid, personalId, signature } = req.body;

  try {
    await did.verifyHolderDid(holderDid);
    var isValid = verifyData(key, personalId, signature);
    if (!isValid) {
      throw new Error("Invalid personalId");
    }
    const vcJwt = await did.issueVC(
      holderDid,
      "PersonalIdCredential",
      JSON.parse(response)
    );
    res.json({ vcJwt: vcJwt });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

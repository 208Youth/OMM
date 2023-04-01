const express = require("express");
const multer = require("multer");
const cryptoJS = require("crypto-js");


const router = express.Router();

const http = require("./module/http");
const did = require("./module/did");
const file = require("./module/file");

// multer 미들웨어 설정
const upload = multer({ dest: 'uploads/' });

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
      path: "/api/spring/cert",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": jsonData.length,
      },
    };
    const response = await http.sendHttpRequest(data, options);
    const responseJson = JSON.parse(response);
    const vcJwt = await did.issueVC(
      holderDid,
      credentialName,
      // responseJson
      responseJson[Object.keys(responseJson)[0]]
    );
    res.json({ vcJwt: vcJwt });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

function btoaUrl(input) {
  const base64 = btoa(input);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// Issue PersonalId Credential
router.post("/personal-id", upload.single('image'), async (req, res) => {
  const { holderDid, personalId, signature} = req.body;

  try {
    // 데이터 검증
    const data = JSON.stringify(personalId);
    const key = '1234';
    const hmac = cryptoJS.HmacSHA256(data, key);
    const expectedSignature = btoaUrl(hmac.toString(cryptoJS.enc.Latin1));
    if (signature !== expectedSignature) {
      throw new Error("Invalid personalId");
    }

    const vcJwt = await did.issueVC(
      holderDid,
      "PersonalIdCredential",
      { personalId: personalId }
    );

    res.json({ vcJwt: vcJwt });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
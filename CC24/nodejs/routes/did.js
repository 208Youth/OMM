const http = require("http");
const express = require("express");
const router = express.Router();
const EthrDID = require("ethr-did");
const Resolver = require("did-resolver");
const getResolver = require("ethr-did-resolver");
const {
  createVerifiableCredentialJwt,
  verifyPresentation,
} = require("did-jwt-vc");

const rpcUrl = `https://goerli.infura.io/v3/${process.env.API_KEY}`;
const didResolver = new Resolver.Resolver(
  getResolver.getResolver({ rpcUrl, name: "goerli" })
);

const issuer = new EthrDID.EthrDID({
  identifier: process.env.ISSUER_ID,
  privateKey: process.env.ISSUER_PRIVATE_KEY,
  chainNameOrId: "goerli",
});

const sendHttpRequest = (data, options) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        reject(new Error(`HTTP Error: ${res.statusCode}`));
        return;
      }
      res.on("data", (data) => {
        resolve(data.toString());
      });
    });
    req.on("error", (error) => {
      reject(error);
    });
    req.write(data);
    req.end();
  });
};

// Verify the holder DID
const verifyHolderDid = async (holderDid) => {
  const { didDocument } = await didResolver.resolve(holderDid);
  if (!didDocument) {
    return res.status(400).json({ error: "Invalid holder DID" });
  }
};

// Verify the VP and check if it was issued to the holder DID
const verifyVP = async (vpJwt, holderDid) => {
  const verifiedVP = await verifyPresentation(vpJwt, didResolver);
  // Check if the VP is expired
  if (
    verifiedVP.payload.exp &&
    new Date(verifiedVP.payload.exp * 1000) < new Date()
  ) {
    throw new Error("Expired VP");
  }
  // Verify VP
  if (verifiedVP.issuer != holderDid) {
    throw new Error("Invalid VP issuer");
  }
  if (verifiedVP.verifiablePresentation.holder != holderDid) {
    throw new Error("Invalid VP holder");
  }
  return verifiedVP.verifiablePresentation.verifiableCredential;
};

// Verify each VC in the VP
const verifyVC = async (verifiedVC, holderDid) => {
  // Check if the VC is expired
  if (
    verifiedVC.expirationDate &&
    new Date(verifiedVC.expirationDate) < new Date()
  ) {
    throw new Error("Expired VC");
  }
  // Verify each VC in the VP
  if (verifiedVC.issuer.id !== issuer.did) {
    throw new Error("Invalid VC issuer");
  }
  if (verifiedVC.credentialSubject.id !== holderDid) {
    throw new Error("Invalid VC holder");
  }
};

// Get personal id from VC
const getPersonalId = async (verifiableCredential, holderDid) => {
  for (const verifiedVC of verifiableCredential) {
    await verifyVC(verifiedVC, holderDid);
    if (verifiedVC.credentialSubject.personalId) {
      return verifiedVC.credentialSubject.personalId;
    }
  }
};

// Issue a new VC
const issueVC = async (holderDid, credentialName, data) => {
  const now = new Date();
  const vcPayload = {
    sub: holderDid,
    exp: Math.floor(
      new Date(now.setMonth(now.getMonth() + 1)).getTime() / 1000
    ),
    vc: {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      type: ["VerifiableCredential", credentialName],
      credentialSubject: {
        ...data,
      },
    },
  };
  const vcJwt = await createVerifiableCredentialJwt(vcPayload, issuer);
  return vcJwt;
};

// credential 발급
router.post("/credential", async (req, res) => {
  const { holderDid, vpJwt, credentialName, id = null } = req.body;

  try {
    await verifyHolderDid(holderDid);
    const verifiableCredential = await verifyVP(vpJwt, holderDid);
    const personalId = await getPersonalId(verifiableCredential, holderDid);
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
      hostname: "121.178.98.57",
      port: 3324,
      path: "/api/cert",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": jsonData.length,
      },
    };
    const response = await sendHttpRequest(data, options);
    const vcJwt = await issueVC(
      holderDid,
      credentialName,
      JSON.parse(response)
    );
    res.json({ vcJwt: vcJwt });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// presentation 검증, claim 반환
router.post("/presentation", async (req, res) => {
  const { holderDid, vpJwt } = req.body;

  try {
    await verifyHolderDid(holderDid);
    const verifiableCredential = await verifyVP(vpJwt, holderDid);

    const subjects = {};
    for (const verifiedVC of verifiableCredential) {
      await verifyVC(verifiedVC, holderDid);
      console.log(verifiedVC);
      // json 꺼내기
      for (const [key, value] of Object.entries(verifiedVC.credentialSubject)) {
        if (key != "id") {
          subjects[key] = value;
        }
      }
    }
    res.json({ subjects: subjects });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

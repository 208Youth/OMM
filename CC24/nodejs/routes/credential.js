const express = require('express');
const multer = require('multer');
const cryptoJS = require('crypto-js');

const router = express.Router();

const http = require('./module/http');
const did = require('./module/did');
const store = require('./module/store');

// multer 미들웨어 설정
const upload = multer({ dest: 'uploads/' });

// Issue Credential
router.post('/', async (req, res) => {
  const { holderDid, vpJwt, credentialName, id = null } = req.body;

  try {
    await did.verifyHolderDid(holderDid);
    const verifiableCredential = await did.verifyVP(vpJwt, holderDid);
    const personalId = await did.getPersonalId(verifiableCredential, holderDid);
    if (!personalId) {
      throw new Error('No personalId');
    }
    const data = JSON.stringify({
      credentialName: credentialName,
      personalId: personalId,
      id: id,
    });
    const jsonData = JSON.stringify(data);

    const options = {
      hostname: process.env.LOCALHOST,
      port: 3324,
      path: '/api/spring/cert',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': jsonData.length,
      },
    };
    const response = await http.sendHttpRequest(data, options);
    const responseJson = JSON.parse(response);
    console.log(responseJson);
    const vcJwt = await did.issueVC(
      holderDid,
      credentialName,
      responseJson[Object.keys(responseJson)[0]]
    );
    res.json({ vcJwt: vcJwt });
  } catch (error) {
    console.error(error.stack);
    res.status(400).json({ error: error.message });
  }
});

function btoaUrl(input) {
  const base64 = btoa(input);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// Issue PersonalId Credential
router.post('/personal-id', upload.single('image'), async (req, res) => {
  const { holderDid, personalId, signature } = req.body;

  try {
    // 데이터 검증
    const key = '1234';
    const hmac = cryptoJS.HmacSHA256(personalId, key);
    const expectedSignature = btoaUrl(hmac.toString(cryptoJS.enc.Latin1));
    if (signature !== expectedSignature) {
      throw new Error('Invalid personalId');
    }

    let parsePersonalId = JSON.parse(personalId);

    const url = await store.uploadImageToFirebase(req.file);
    parsePersonalId.imageUrl = url[0];

    const vcJwt = await did.issueVC(holderDid, 'PersonalIdCredential', {
      personalId: parsePersonalId,
    });
    // console.log(vcJwt);
    res.json({ vcJwt: vcJwt });
  } catch (error) {
    console.error(error.stack);
    res.status(400).json({ error: error.message });
  }
});

// Issue PersonalId Credential
router.post('/did-address', async (req, res) => {
  const { holderDid } = req.body;

  try {
    await did.verifyHolderDid(holderDid);

    const vcJwt = await did.issueVC(holderDid, 'DidAddressCredential', {
      did: {
        address: holderDid,
      },
    });

    res.json({ vcJwt: vcJwt });
  } catch (error) {
    console.error(error.stack);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

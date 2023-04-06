const express = require('express');
const router = express.Router();
const did = require('./module/did');

// Verify VP, Return claims
router.post('/', async (req, res) => {
  const { holderDid, vpJwt } = req.body;

  try {
    await did.verifyHolderDid(holderDid);
    const verifiableCredential = await did.verifyVP(vpJwt, holderDid);

    const subjects = {};
    for (const verifiedVC of verifiableCredential) {
      await did.verifyVC(verifiedVC, holderDid);
      for (const [key, value] of Object.entries(verifiedVC.credentialSubject)) {
        if (key != 'id') {
          subjects[key] = value;
        }
      }
    }
    console.log(subjects);
    res.json({ subjects: subjects });
  } catch (error) {
    console.error(error.stack);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

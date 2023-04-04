const EthrDID = require('ethr-did');
const Resolver = require('did-resolver');
const getResolver = require('ethr-did-resolver');
const { createVerifiableCredentialJwt, verifyPresentation } = require('did-jwt-vc');

const rpcUrl = `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`;
const didResolver = new Resolver.Resolver(getResolver.getResolver({ rpcUrl, name: 'goerli' }));

const issuer = new EthrDID.EthrDID({
  identifier: process.env.ISSUER_ID,
  privateKey: process.env.ISSUER_PRIVATE_KEY,
  chainNameOrId: 'goerli',
});

// Verify the holder DID
const verifyHolderDid = async (holderDid) => {
  const { didDocument } = await didResolver.resolve(holderDid);
  if (!didDocument) {
    throw new Error('Invalid holder DID');
  }
};

// Verify the VP and check if it was issued to the holder DID
const verifyVP = async (vpJwt, holderDid) => {
  const verifiedVP = await verifyPresentation(vpJwt, didResolver);
  // Check if the VP is expired
  if (verifiedVP.payload.exp && new Date(verifiedVP.payload.exp * 1000) < new Date()) {
    throw new Error('Expired VP');
  }
  // Verify VP
  if (verifiedVP.issuer != holderDid) {
    throw new Error('Invalid VP issuer');
  }
  if (verifiedVP.verifiablePresentation.holder != holderDid) {
    throw new Error('Invalid VP holder');
  }
  return verifiedVP.verifiablePresentation.verifiableCredential;
};

// Verify each VC in the VP
const verifyVC = async (verifiedVC, holderDid) => {
  // Check if the VC is expired
  if (verifiedVC.expirationDate && new Date(verifiedVC.expirationDate) < new Date()) {
    throw new Error('Expired VC');
  }
  // Verify each VC in the VP
  if (verifiedVC.issuer.id !== issuer.did) {
    throw new Error('Invalid VC issuer');
  }
  if (verifiedVC.credentialSubject.id !== holderDid) {
    throw new Error('Invalid VC holder');
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
    exp: Math.floor(new Date(now.setMonth(now.getMonth() + 1)).getTime() / 1000),
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential', credentialName],
      credentialSubject: {
        ...data,
      },
    },
  };
  const vcJwt = await createVerifiableCredentialJwt(vcPayload, issuer);
  return vcJwt;
};

module.exports = {
  verifyHolderDid: verifyHolderDid,
  verifyVP: verifyVP,
  verifyVC: verifyVC,
  getPersonalId: getPersonalId,
  issueVC: issueVC,
};

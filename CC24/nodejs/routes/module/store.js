const fs = require("fs");
const multer = require("multer");
const admin = require("firebase-admin");
const serviceAccount = require("../../cc24-3d5b1-firebase-adminsdk-flw87-a3579a4c47.json");
const { v4: uuidv4 } = require("uuid");

const oneYear = 365 * 24 * 60 * 60 * 1000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.STORAGE_BUCKET,
});

const bucket = admin.storage().bucket();

const uploadImageToFirebase = (file) => {
  return new Promise((resolve, reject) => {
    const filePath = file.path;
    const fileName = uuidv4() + "-" + file.originalname;
    const config = {
      action: "read",
      expires: Date.now() + oneYear,
    };
    bucket
      .upload(filePath, {
        destination: fileName,
      })
      .then(() => {
        // console.log(`File ${fileName} uploaded.`);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file ${filePath}: ${err}`);
          } else {
            console.log(`File ${filePath} deleted successfully.`);
          }
        });
        return bucket.file(fileName).getSignedUrl(config);
      })
      .then((url) => {
        // console.log(`URL for ${fileName}: ${url}`);
        resolve(url);
      })
      .catch((error) => {
        console.error(`Error uploading ${fileName}: ${error}`);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file ${filePath}: ${err}`);
          } else {
            console.log(`File ${filePath} deleted successfully.`);
          }
        });
        reject(
          new Error(`An error occurred when uploading ${fileName}: ${error}`)
        );
      });
  });
};

module.exports = {
  uploadImageToFirebase: uploadImageToFirebase,
};

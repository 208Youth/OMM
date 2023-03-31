const http = require("http");

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

module.exports = {
  sendHttpRequest: sendHttpRequest,
};

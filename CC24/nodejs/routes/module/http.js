const http = require('http');

const sendHttpRequest = (data, options) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        console.log(res.statusCode, res.statusMessage);
        reject(new Error(`HTTP Error: ${res.statusCode}`));
        return;
      }
      res.on('data', (data) => {
        resolve(data.toString());
      });
    });
    req.on('error', (error) => {
      console.log(error);
      reject(error);
    });
    req.write(data);
    req.end();
  });
};

module.exports = {
  sendHttpRequest: sendHttpRequest,
};

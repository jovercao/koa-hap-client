const axios = require("axios");

class HapError extends Error {}

class HapClient {
  constructor(baseUrl, options) {
    const http = axios.create(
      Object.assign(
        {
          // 此处封装错误处理程序
          transformResponse: [
            function(data, headers) {
              let dataObj = JSON.parse(data);
              if (dataObj.success === false) {
                throw new HapError(dataObj.errMsg);
              }
              return dataObj.data;
            }
          ]
        },
        options
      )
    );

    const createCall = function(url, options) {
      const call = function call(args = {}) {
        // console.log('POST', url, args);
        return http.post(url, args);
      };

      return new Proxy(call, {
        get(target, key) {
          const newUrl = url + "/" + key;
          return createCall(newUrl);
        }
      });
    };

    return createCall(baseUrl);
  }
}

const hap = new HapClient("");
module.exports = hap;
module.exports.default = hap;
module.exports.create = function(url, options) {
  return new HapClient(url, options);
};

module.exports.HapClient = HapClient;
module.exports.HapError = HapError;

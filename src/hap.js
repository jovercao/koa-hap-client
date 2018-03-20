const axios = require('axios');

class HapError extends Error {}

const createInstance = function(baseUrl, options) {
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

  const createCall = function(url) {
    const call = async function call(args = {}) {
      console.log('POST', url, args);
      const res = (await http.post(url, args));
      return res.data;
    };

    return new Proxy(call, {
      apply(target, handler, args) {
        // 如果尚未初始化url
        if (url === undefined || url === null) {
          return createInstance(args[0], args[1])
        }
        return call(args[0])
      },
      get(target, key) {
        // // 避免babel重复访问default
        // if (key === '__esModule') return true;
        const newUrl = (url || '') + '/' + key;
        return createCall(newUrl);
      },
      set() {
        throw new Error('HAP client object is readonly.');
      }
    });
  };

  return createCall(baseUrl);
}

module.exports = createInstance;
module.exports.default = createInstance;

// exports.hap = createInstance('');

// babel 将会把 import hap from 'koa-hap-client' 编译成 const hap = require('koa-hap-client').default;
// 于是乎默认就带上 default 路径了，并且 hap(baseUrl, config) 也变成直接调用了。

const cloud = require('wx-server-sdk')

cloud.init()
const rp = require('request-promise');
exports.main = async (event, context) => {
  const {
    url
  } = event
 
  return await rp({
      url: encodeURI(url),
      method: "get",
      json: true,
      headers: {
        "content-type": "application/json",
      },
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err
    });
}
// eslint-disable-next-line require-await
exports.handler = async function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: 'Hello, World'
  })
}

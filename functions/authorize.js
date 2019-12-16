const fetch = require('node-fetch')
const { REST_API_URL } = process.env

// eslint-disable-next-line require-await
exports.handler = async function(event, context, callback) {
  return fetch(`${REST_API_URL}/authorization`, {
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    body: event.body
  })
    .then(res => res.json()) // expecting a json response
    .then(json => console.log({ json }))
    .catch(error => ({ statusCode: 422, body: String(error) }))
}

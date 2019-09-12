const jwt = require('express-jwt');
const jwtRsa = require('jwks-rsa');

module.exports = jwt({
  credentialsRequired: process.env.NODE_ENV !== 'test',
  secret: jwtRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-c8-ngsk7.auth0.com/.well-known/jwks.json'
  }),
  audience: 'FZM68P8kik4anBu9Yy2wtHqSknKasi7V',
  issuer: 'https://dev-c8-ngsk7.auth0.com/',
  algorithms: ['RS256']
});

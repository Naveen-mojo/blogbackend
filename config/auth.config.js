module.exports = {
  secret: "naveen-secret-key",
  jwtExpiration: 3600,         // 1 hour
  jwtRefreshExpiration:86400, // 1 days

  /* for test */
  // jwtExpiration: 60,          // 1 minute
  // jwtRefreshExpiration: 120,  // 2 minutes
};

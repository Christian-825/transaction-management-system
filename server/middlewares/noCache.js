// noCache.js
module.exports = (req, res, next) => {
  // Prevent caching so table always shows fresh CSV data
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
};

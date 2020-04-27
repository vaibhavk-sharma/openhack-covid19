const pacakgeInfo = require("../package.json");
/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.json({
    AppName: pacakgeInfo.name,
    Version: pacakgeInfo.version,
    License: pacakgeInfo.license,
    Description: pacakgeInfo.description
  });
};

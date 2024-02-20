const fs = require("fs");
const path = require("path");

const createUploadsDir = () => {
  const uploadDir = path.join(__dirname, "..", "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  return uploadDir;
};

// const generateFileName = (originalname) => {
//   return `${Date.now()}${path.extname(originalname)}`;
// };

module.exports = {
  createUploadsDir,
  // generateFileName,
};

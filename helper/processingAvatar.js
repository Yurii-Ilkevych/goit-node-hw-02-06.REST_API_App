const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const processingAvatar = async (patchPhoto, filename) => {
  const newNameLogo = generateUniqName(filename);
  const uploadDir = path.join(process.cwd(), `/public/avatars/${newNameLogo}`);
  try {
    const image = await Jimp.read(patchPhoto);
    image.resize(250, 250);
    await image.writeAsync(uploadDir);
    fs.unlink(patchPhoto);
    return newNameLogo;
  } catch (err) {
    return err;
  }
};

const generateUniqName = (filename) => {
    console.log(filename)
  const format = filename.slice(-4);

  return `logoUser${nanoid(7)}${format}`;
};
module.exports = processingAvatar;

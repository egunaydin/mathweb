import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "djb74ithr",
  api_key: "317381479571225",
  api_secret: "s_8-elaVduV2ALXrrUPzX_z-KPs",
});

module.exports = async (file) => {
  try {
    const res = await cloudinary.uploader.upload(file);
    return res.secure_url;
  } catch (error) {
    return error;
  }
};

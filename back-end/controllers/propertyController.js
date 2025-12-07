import Property from "../models/PropertyModel.js";

export const createProperty = async (req, res) => {
  try {
    const {
      title,
      type,
      description,
      price,
      squareFeet,
      bedrooms,
      bathrooms,
      city,
      state,
      address,
      lat,
      lng,
    } = req.body;

    // uploaded image filenames
    const imagePaths = req.files?.map((file) => `/uploads/${file.filename}`) || [];

    const newProperty = new Property({
      title,
      type,
      description,
      price,
      squareFeet,
      bedrooms,
      bathrooms,
      location: { city, state, address, lat, lng },
      images: imagePaths,
      owner: req.user.id, // assuming you have JWT auth middleware
    });

    await newProperty.save();
    res.status(201).json({ message: "Property added successfully", property: newProperty });
  }
}
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newImages, setNewImages] = useState<File[]>([]);

  // Fetch property data
  useEffect(() => {
    const loadProperty = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/properties/${id}`);
        const data = await res.json();

        if (!res.ok) {
          alert("Failed to load property");
          return navigate("/dashboard");
        }

        setProperty(data);
        setLoading(false);
      } catch (err) {
        alert("Server error loading property");
        navigate("/dashboard");
      }
    };

    loadProperty();
  }, [id, navigate]);

  // Handle image uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setNewImages(Array.from(e.target.files));
  };

  // Submit update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return alert("Authentication required");

    const updatedData = new FormData();
    updatedData.append("title", property.title);
    updatedData.append("description", property.description);
    updatedData.append("price", property.price);
    updatedData.append("squareFeet", property.squareFeet || 0);
    updatedData.append("bedrooms", property.bedrooms || 0);
    updatedData.append("bathrooms", property.bathrooms || 0);

    updatedData.append("type", property.type);

    updatedData.append("address", property.location?.address || "");
    updatedData.append("city", property.location?.city || "");
    updatedData.append("state", property.location?.state || "");

    updatedData.append("lat", property.location?.lat || 0);
    updatedData.append("lng", property.location?.lng || 0);

    // If new images added → they will replace old images
    newImages.forEach((file) => updatedData.append("images", file));

    const res = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: updatedData,
    });

    if (res.ok) {
      alert("Property updated successfully!");
      navigate("/dashboard");
    } else {
      alert("Failed to update property.");
    }
  };

  if (loading) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Property</h1>

      <form onSubmit={handleUpdate} className="space-y-6">

        {/* Title */}
        <div>
          <label className="font-semibold">Title</label>
          <input
            className="w-full border p-2 rounded"
            value={property.title}
            onChange={(e) =>
              setProperty({ ...property, title: e.target.value })
            }
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="font-semibold">Price (₹)</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={property.price}
            onChange={(e) =>
              setProperty({ ...property, price: e.target.value })
            }
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold">Description</label>
          <textarea
            className="w-full border p-2 rounded h-32"
            value={property.description}
            onChange={(e) =>
              setProperty({ ...property, description: e.target.value })
            }
            required
          />
        </div>

        {/* Basic details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Bedrooms</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={property.bedrooms}
              onChange={(e) =>
                setProperty({ ...property, bedrooms: e.target.value })
              }
            />
          </div>

          <div>
            <label>Bathrooms</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={property.bathrooms}
              onChange={(e) =>
                setProperty({ ...property, bathrooms: e.target.value })
              }
            />
          </div>

          <div>
            <label>Square Feet</label>
            <input
              type="number"
              className="w-full border p-2 rounded"
              value={property.squareFeet}
              onChange={(e) =>
                setProperty({ ...property, squareFeet: e.target.value })
              }
            />
          </div>

          <div>
            <label>Type</label>
            <select
              className="w-full border p-2 rounded"
              value={property.type}
              onChange={(e) =>
                setProperty({ ...property, type: e.target.value })
              }
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="office">Office</option>
              <option value="Rental">Rental</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold">Address</label>
          <input
            className="w-full border p-2 rounded"
            value={property.location.address}
            onChange={(e) =>
              setProperty({
                ...property,
                location: { ...property.location, address: e.target.value },
              })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>City</label>
            <input
              className="w-full border p-2 rounded"
              value={property.location.city}
              onChange={(e) =>
                setProperty({
                  ...property,
                  location: { ...property.location, city: e.target.value },
                })
              }
            />
          </div>

          <div>
            <label>State</label>
            <input
              className="w-full border p-2 rounded"
              value={property.location.state}
              onChange={(e) =>
                setProperty({
                  ...property,
                  location: { ...property.location, state: e.target.value },
                })
              }
            />
          </div>
        </div>

        {/* Upload new images */}
        <div>
          <label className="font-semibold">Upload New Images (optional)</label>
          <input type="file" multiple onChange={handleImageUpload} />
        </div>

        {/* Submit */}
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

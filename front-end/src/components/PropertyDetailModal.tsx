import React, { useState } from "react";
import { X, MapPin, Bed, Bath, Square, Mail, Calendar } from "lucide-react";
import { Property } from "../types";
import { useAuth } from "../context/AuthContext";
import { sendMessage } from "../services/messageService";

interface PropertyDetailModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onAuthRequired: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  isOpen,
  onClose,
  onAuthRequired,
}) => {
  const { isAuthenticated, user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactSuccess, setShowContactSuccess] = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen || !property) return null;

  const BACKEND_URL = "http://localhost:5000";

  const getFullImageUrl = (imgPath?: string) => {
    if (!imgPath) return "/placeholder.png";
    return imgPath.startsWith("/uploads/")
      ? `${BACKEND_URL}${imgPath}`
      : imgPath;
  };

  const handleContact = async () => {
    if (!isAuthenticated) return onAuthRequired();

    try {
      setError("");

      const messageData = {
        name: user?.name || "Unknown User",
        email: user?.email || "unknown@example.com",
        phone: user?.phone || "N/A",
        message: `Hello, I'm interested in your property "${property.title}".`,
        propertyId: property.id || property._id,
        propertyTitle: property.title,
        ownerId: property.ownerId,
        userId: user?.id,
      };

      const token = user?.token || localStorage.getItem("token");
      const res = await sendMessage(messageData, token);

      if (res.success) {
        setShowContactSuccess(true);
        setTimeout(() => setShowContactSuccess(false), 3000);
      } else throw new Error();
    } catch (err) {
      setError("Failed to send message. Try again later.");
    }
  };

  const handleBook = () => {
    if (!isAuthenticated) return onAuthRequired();
    setShowBookingSuccess(true);
    setTimeout(() => setShowBookingSuccess(false), 3000);
  };

  const images = property.images || [];
  const location = property.location || {
    address: "N/A",
    city: "N/A",
    state: "N/A",
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 overflow-y-auto bg-black/50">
    <div className="bg-white rounded-2xl w-full max-w-[1200px] shadow-2xl my-8 relative">

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold">{property.title}</h2>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-3 right-3 z-50 p-2 bg-white border shadow-lg rounded-full hover:bg-gray-100 transition"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT IMAGES */}
          <div className="w-full">
            {/* Main big image */}
            <div className="relative w-full h-[420px] rounded-xl overflow-hidden bg-gray-100">
              <img
                src={getFullImageUrl(images[selectedImage])}
                className="w-full h-full object-cover"
              />

              {/* Price tag */}
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow">
                ₹{property.price?.toLocaleString("en-IN")}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                    selectedImage === idx
                      ? "border-blue-600"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={getFullImageUrl(img)}
                    className="w-full h-24 object-cover hover:opacity-90 transition"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div className="space-y-6">
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              <span>
                {location.address}, {location.city}, {location.state}
              </span>
            </div>

            <div className="flex items-center space-x-6 mb-4">
              <div className="flex items-center">
                <Bed className="h-5 w-5 mr-1" /> {property.bedrooms} Bedrooms
              </div>
              <div className="flex items-center">
                <Bath className="h-5 w-5 mr-1" /> {property.bathrooms} Bathrooms
              </div>
              <div className="flex items-center">
                <Square className="h-5 w-5 mr-1" /> {property.squareFeet} sqft
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-1">Description</h3>
              <p className="text-gray-600">{property.description}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold mb-1">Property Details</h3>
              <div className="flex justify-between text-sm">
                <span>Type: {property.type}</span>
                <span className="text-green-600">
                  Status: {property.status || "Available"}
                </span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold mb-1">Owner Information</h3>
              <p>{property.ownerName}</p>
              <p className="text-gray-600 text-sm">{property.ownerEmail}</p>
            </div>

            {showContactSuccess && (
              <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded">
                Contact message sent!
              </div>
            )}

            {showBookingSuccess && (
              <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded">
                Booking request submitted!
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleContact}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center"
              >
                <Mail className="h-5 w-5 mr-2" /> Contact Owner
              </button>

              <button
                onClick={handleBook}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center"
              >
                <Calendar className="h-5 w-5 mr-2" /> Book Viewing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Header } from "./components/Header";
import { AuthModal } from "./components/AuthModal";
import { Home } from "./pages/Home";
import { Properties } from "./pages/Properties";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Dashboard } from "./pages/Dashboard";
import { AddProperty } from "./pages/AddProperty";
import { Messages } from "./pages/Messages";
import EditProperty from "./pages/EditProperty";  // ⭐ ADD THIS

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header onAuthClick={() => setShowAuthModal(true)} />

          <Routes>
            <Route
              path="/"
              element={<Home onAuthClick={() => setShowAuthModal(true)} />}
            />
            <Route
              path="/properties"
              element={<Properties onAuthClick={() => setShowAuthModal(true)} />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* ⭐ EDIT PAGE ROUTE */}
            <Route path="/edit-property/:id" element={<EditProperty />} />
          </Routes>

          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

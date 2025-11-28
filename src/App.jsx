import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import VisitorPopup from './components/VisitorPopup';

// Pages
import Home from './pages/Home';
import Options from './pages/Options';
import Company from './pages/Company';
import Contact from './pages/Contact';  // ← Fixed: Capital C
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import Gallery from './pages/Gallery';
import Smiles from './pages/Smiles';
import OurClients from './pages/OurClients';
import Ceremonial from './pages/Ceremonial';
import Demonstration from "./pages/Demonstration";  // Public view
import DemonstrationsAdmin from "./pages/DemonstrationsAdmin";  // Admin management
import Showcase from './pages/Showcase';

function App() {
  const location = useLocation();

  return (
    <div className="flex">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        {/* Show popup only on home page */}
        {location.pathname === "/" && <VisitorPopup />}
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/options" element={<Options />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          
          {/* Showcase - Public page with Demonstration link */}
          <Route path="/showcase" element={<Showcase />} />
          
          {/* Public Demonstration View */}
          <Route path="/showcase/demonstrations" element={<Demonstration />} />

          {/* Protected Admin Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Gallery Hub - Admin */}
          <Route 
            path="/gallery" 
            element={
              <ProtectedRoute>
                <Gallery />
              </ProtectedRoute>
            } 
          />
          
          {/* Gallery Categories - Admin Management */}
          <Route 
            path="/gallery/smiles" 
            element={
              <ProtectedRoute>
                <Smiles />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/gallery/clients" 
            element={
              <ProtectedRoute>
                <OurClients />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/gallery/ceremonial" 
            element={
              <ProtectedRoute>
                <Ceremonial />
              </ProtectedRoute>
            } 
          />
          
          {/* Demonstrations Admin Management */}
          <Route 
            path="/gallery/demonstrations" 
            element={
              <ProtectedRoute>
                <DemonstrationsAdmin />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
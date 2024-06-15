import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";
import Landing from "./pages/Landing";
import Customers from "./pages/Customers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Leads from "./pages/Leads";
import Interactions from "./pages/Interactions";
import InteractionView from "./pages/InteractionView";
import LeadView from "./pages/LeadView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <div>User profile</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <Customers />
                </main>
                <Footer />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <Leads />
                </main>
                <Footer />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/interactions"
          element={
            <ProtectedRoute>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <Interactions />
                </main>
                <Footer />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/interactions/:interactionId"
          element={
            <ProtectedRoute>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <InteractionView />
                </main>
                <Footer />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/leads/:leadId"
          element={
            <ProtectedRoute>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                  <LeadView />
                </main>
                <Footer />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

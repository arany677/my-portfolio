import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

// Pages & Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import ScrollToTop from "./components/ScrollToTop";
import ProjectDetails from "./pages/ProjectDetails";

// ড্যাশবোর্ড এবং লগইন পেজে নববার হাইড করার লজিক
const Layout = ({ children }) => {
  const location = useLocation();
  const hideItems = ["/dashboard", "/login" ];
  const shouldHide = hideItems.includes(location.pathname);

  return (
    <>
      {!shouldHide && <Navbar />}
      <main className={!shouldHide ? "min-h-screen" : ""}>{children}</main>
      {!shouldHide && <Footer />}
    </>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  if (loading)
    return (
      <div className="h-screen bg-[#0F172A] flex items-center justify-center text-cyan-400">
        Loading Portal...
      </div>
    );
  if (!user) return <Navigate to="/" />; // লগইন না থাকলে হোমপেজে পাঠিয়ে দাও
  return children;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-[#0F172A]">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

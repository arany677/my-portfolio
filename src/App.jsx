import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

// স্মার্ট কম্পোনেন্ট: ড্যাশবোর্ড বা লগইন পেজে নববার/ফুটার দেখাবে না
const Layout = ({ children }) => {
  const location = useLocation();
  const hideOn = ["/dashboard", "/login"];
  const shouldHide = hideOn.includes(location.pathname);

  return (
    <>
      {!shouldHide && <Navbar />}
      <main className={!shouldHide ? "pt-20" : ""}>{children}</main>
      {!shouldHide && <Footer />}
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading)
    return (
      <div className="h-screen bg-[#0F172A] flex items-center justify-center text-cyan-400">
        Loading...
      </div>
    );

  // যদি এডমিন লগইন না থাকে, তবে তাকে সরাসরি হোমপেজে পাঠিয়ে দাও
  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};
export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
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
    </Router>
  );
}

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
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Skills from "./pages/Skills";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideOn = ["/dashboard", "/login"];
  const shouldHide = hideOn.includes(location.pathname);

  return (
    <>
      {!shouldHide && <Navbar />}
      {/* pt-20 ডেস্কটপে এবং pt-20 মোবাইলেও রাখা হয়েছে (আগে বেশি ছিল) */}
      <main className={!shouldHide ? "min-h-screen pt-5" : ""}>
        {children}
      </main>
      {!shouldHide && <Footer />}
    </>
  );
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
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

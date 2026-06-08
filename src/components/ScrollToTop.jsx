import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // যখনই pathname (লিঙ্ক) পরিবর্তন হবে, তখনই স্ক্রল উপরে চলে যাবে
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // এটি কিছু রেন্ডার করবে না, শুধু কাজ করবে
}

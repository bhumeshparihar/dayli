import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  HashRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Header, Footer, MobileJoin, Button, Eyebrow } from "./components";
import { Home, Problems, Research, Learn, Legal, Contact } from "./pages";
import Join from "./Join";
import "./styles.css";
function NavigationEffects() {
  const location = useLocation();
  useEffect(() => {
    const titles = {
      "/": "A little ritual. A lot of care.",
      "/problems": "What women face every day",
      "/research": "What the research says",
      "/learn": "Know your stage",
      "/join": "Join the DD Movement",
      "/privacy": "Privacy",
      "/terms": "Terms",
      "/contact": "Contact",
    };
    document.title = `DAYLI — ${titles[location.pathname] || "Page not found"}`;
    if (location.hash) {
      requestAnimationFrame(() =>
        document
          .getElementById(location.hash.slice(1))
          ?.scrollIntoView({ behavior: "smooth" }),
      );
    } else {
      window.scrollTo(0, 0);
    }
    document.querySelector("main")?.focus({ preventScroll: true });
  }, [location]);
  return null;
}
const Router =
  window.location.protocol === "file:" ||
  window.__DAYLI_OFFLINE_PREVIEW__ === true
    ? HashRouter
    : BrowserRouter;
function App() {
  return (
    <Router>
      <a
        className="skip-to-content"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main")?.focus();
          document.getElementById("main")?.scrollIntoView();
        }}
      >
        Skip to content
      </a>
      <NavigationEffects />
      <Header />
      <main
        id="main"
        tabIndex="-1"
        style={{ backgroundColor: "#F7EFE8", color: "#542E42" }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/research" element={<Research />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/join" element={<Join />} />
          <Route path="/privacy" element={<Legal type="privacy" />} />
          <Route path="/terms" element={<Legal type="terms" />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={
              <section className="legal section-wrap">
                <Eyebrow>A LITTLE DETOUR</Eyebrow>
                <h1>
                  Let’s find your
                  <br />
                  <em>way back.</em>
                </h1>
                <p>
                  This page doesn’t exist. There’s a place for you at DAYLI.
                </p>
                <Button to="/">Back to home</Button>
              </section>
            }
          />
        </Routes>
      </main>
      <Footer />
      <MobileJoin />
    </Router>
  );
}
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

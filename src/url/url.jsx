import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./pages/home/home";
import Dashboard from "./pages/dashboard/dashboard";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import "./url.css"
import { Helmet } from "react-helmet-async"

function Url() {
  return (
    <>
      <Helmet>
        <title>URL Shortener</title>
        <link rel="icon" href="/urllogo.png" />
        <meta name="title" content="URL Shortener" />
        <meta property="og:title" content="URL Shortener" />
        <meta name="description" content="Create short, custom URLs with QR code support, real-time analytics via dashboard charts, and full control to edit or delete links. Fast, secure, and easy to use." />
        <meta property="og:description" content="Create short, custom URLs with QR code support, real-time analytics via dashboard charts, and full control to edit or delete links. Fast, secure, and easy to use." />
        <meta name="keywords" content="URL shortener, custom short links, QR code generator, link analytics, track clicks, edit short URL, delete short URL, link management, bar chart dashboard, short URL with QR, Ageera Saiteja" />
      </Helmet>
      <div className="url">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          pauseOnFocusLoss={true}
          draggable={true}
          pauseOnHover={true}
          theme="light"
          closeButton={true}
        />
      </div>
    </>
  );
}


export default Url;
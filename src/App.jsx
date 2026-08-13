import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Booking from './pages/Booking';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="bg-zinc-950 min-h-screen flex flex-col justify-between">
          <Navbar />
          
          <main className="grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/booking" element={<Booking />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
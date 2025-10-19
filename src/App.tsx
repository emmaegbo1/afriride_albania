import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Transfers from './pages/Transfers';
import Hotels from './pages/Hotels';
import Tours from './pages/Tours';
import Reservations from './pages/Reservations';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transfers" element={<Transfers />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

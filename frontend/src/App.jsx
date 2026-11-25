import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Analyzer from './pages/Analyzer';
import Compare from './pages/Compare';
import CheatSheet from './pages/CheatSheet';
import History from './pages/History';
import About from './pages/About';
import FraudCheck from './pages/FraudCheck';
import FraudDashboard from './pages/FraudDashboard';
import FraudRules from './pages/FraudRules';
import FraudInvestigation from './pages/FraudInvestigation';
import FraudAuditLogs from './pages/FraudAuditLogs';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-6xl w-full mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyzer" element={<Analyzer />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/cheatsheet" element={<CheatSheet />} />
            <Route path="/history" element={<History />} />
            <Route path="/about" element={<About />} />
            <Route path="/fraud" element={<FraudCheck />} />
            <Route path="/fraud/dashboard" element={<FraudDashboard />} />
            <Route path="/fraud/rules" element={<FraudRules />} />
            <Route path="/fraud/investigation" element={<FraudInvestigation />} />
            <Route path="/fraud/audit" element={<FraudAuditLogs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
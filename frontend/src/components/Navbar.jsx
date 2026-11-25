import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/analyzer', label: 'AI Analyzer' },
    { to: '/compare', label: 'Compare' },
    { to: '/cheatsheet', label: 'Big-O Guide' },
    { to: '/history', label: 'History' },
    { to: '/about', label: 'Architecture' },
    { to: '/fraud', label: 'Fraud Check' },
    { to: '/fraud/dashboard', label: 'Fraud Dashboard' },
    { to: '/fraud/rules', label: 'Fraud Rules' },
    { to: '/fraud/investigation', label: 'Investigation' },
  ];

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <NavLink to="/" className="text-xl font-bold text-indigo-400 tracking-tight">
          CodePulse <span className="text-slate-100">AI</span>
        </NavLink>
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
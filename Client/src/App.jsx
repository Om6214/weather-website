import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Signup from './Pages/Signup';
import Signin from './Pages/signin';
import Dashboard from './Pages/Dashboard';
import Checkweather from "./Pages/Checkweather"
import History from "./Pages/History"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/weather" element={<Checkweather />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;

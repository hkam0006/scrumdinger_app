import './App.css';
import NavBar from './components/js/NavBar';
import Login from './pages/js/LandingPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<NavBar />} />
      </Routes>
    </BrowserRouter>
    );
}

export default App;

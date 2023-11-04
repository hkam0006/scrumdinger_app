import './App.css';
import NavBar from './components/js/NavBar';
import { AuthContextProvider } from './hooks/AuthContext';
import LandingPage from './pages/js/LandingPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return( 
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<NavBar />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
    );
}

export default App;

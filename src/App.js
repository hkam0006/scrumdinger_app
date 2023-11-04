import './App.css';
import NavBar from './components/js/NavBar';
import RequireAuth from './components/js/RequireAuth';
import { AuthContextProvider } from './hooks/AuthContext';
import HomePage from './pages/js/HomePage';
import LandingPage from './pages/js/LandingPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return( 
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
    );
}

export default App;

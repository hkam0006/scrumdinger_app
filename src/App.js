import './App.css';
import RequireAuth from './components/js/RequireAuth';
import { AuthContextProvider } from './hooks/AuthContext';
import HomePage from './pages/js/HomePage';
import LandingPage from './pages/js/LandingPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SprintPage from './pages/js/SprintPage';
import ChatPage from './pages/js/ChatPage';
import TeamPage from './pages/js/TeamPage';
import Profile from './components/js/Profile';
import MetricsPage from './pages/js/MetricPage';

function App() {
  return( 
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<HomePage />}>
              <Route path='team' element={<TeamPage/>}/>
              <Route path='sprint' element={<SprintPage/>}/>
              <Route path='metrics' element={<MetricsPage/>}/>
              <Route path='chat' element={<ChatPage/>}/>
              <Route path='profile' element={<Profile/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
    );
}

export default App;

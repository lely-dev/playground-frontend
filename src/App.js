import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderPage from './Components/Page/HeaderPage/HeaderPage';
import HomePage from './Components/Page/HomePage/HomePage';
import FieldPage from './Components/Page/CenterPage/FieldPage';
import CenterPage from './Components/Page/CenterPage/CenterPage';
import PlayerPage from './Components/Page/PlayerPage/PlayerPage';
import { AuthCenterProvider } from './Context/AuthCenterProvider';
import { AuthPlayerProvider } from './Context/AuthPlayerProvider';
import LoginCenterPage from './Components/Page/AuthPage/LoginCenterPage';
import LoginPlayerPage from './Components/Page/AuthPage/LoginPlayerPage';
import PlayerRegistration from './Components/Page/Register/PlayerRegistration';
import CenterRegistration from './Components/Page/Register/CenterRegistration';


function App() {
  return (
    < >
    <div className="font-sans">
      <AuthCenterProvider>
        <AuthPlayerProvider>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<HeaderPage />}/>
                  <Route path='/HomePage' element={<HomePage />}/>
                  <Route path='/LoginCenter' element={<LoginCenterPage />}/>
                  <Route path='/LoginPlayer' element={<LoginPlayerPage />}/>
                  <Route path='/field/:id' element={<FieldPage />}/>
                  <Route path='/center/:id' element={<CenterPage />}/>
                  <Route path='/player/:id' element={<PlayerPage />}/>
                  <Route path='/player/registration' element={<PlayerRegistration />}/>
                  <Route path='/center/registration' element={<CenterRegistration />}/>
                </Routes>
              </BrowserRouter>
        </AuthPlayerProvider>
      </AuthCenterProvider>
     </div>
    </>
  );
}

export default App;

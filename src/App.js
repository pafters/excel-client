import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authorization from './pages/auth/Authorization';
import MainPage from './pages/main/MainPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<MainPage />} />
          <Route exact path='/auth' element={<Authorization />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;

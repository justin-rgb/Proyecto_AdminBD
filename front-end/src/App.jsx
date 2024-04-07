import Login from './components/Login'
import Register from './components/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/registrar" element={<Register />} />
        </Routes>
    </Router>
  )
}

export default App

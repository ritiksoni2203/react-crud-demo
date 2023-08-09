import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddStudent from './pages/Home/AddStudent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/addstudent' element={<AddStudent />}></Route>
        <Route path='/editstudent/:id' element={<AddStudent />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

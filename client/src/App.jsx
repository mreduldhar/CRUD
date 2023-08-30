import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReadPage from './pages/ReadPage';
import CreatePage from './pages/CreatePage';
import UpdatePage from './pages/UpdatePage';
import NotFound from './pages/NotFound';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from 'react-toastify';



const App = () => {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<ReadPage/>}/>
            <Route path='/create' element={<CreatePage/>}/>
            <Route path='/update' element={<UpdatePage/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
};

export default App;
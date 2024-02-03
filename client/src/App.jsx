import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllDrivers } from './Components/Redux/actions';
import Nav from './Components/Nav/Nav';
import Detail from './Components/Detail/Detail';
import Cards from './Components/Cards/Cards';
import Form from './Components/Form/Form';
import './App.css';

function App() {

  const { pathname } = useLocation();
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getAllDrivers());
  }, [dispatch]);


  return (
    <div>
      {pathname !== "/" && <Nav />}
      <Routes>
        
        <Route path='/home' element={<Cards />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/form' element={<Form />} />
      </Routes>
    </div> 
  )
}

export default App;

import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllDrivers } from './Components/Redux/actions';
import Nav from './Components/Nav/Nav';
import Detail from './Components/Detail/Detail';
import Carta from './Components/Cards/Cards';
import Form from './Components/Form/Form';
import { Container, Box } from '@chakra-ui/react';
import image from "../src/assets/fondo.png"


function App() {

  const { pathname } = useLocation();
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getAllDrivers());
  }, [dispatch]);


  return (
    <Container 
    bgImage={image}
    bgSize="cover"
    bgAttachment={"fixed"}
    h={pathname != "/" ? "130vh" : undefined}
    mt={0}
    p={0}
    >
    
    
      <Nav/>
      <Routes>
      
        <Route path='/' element={<Carta />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/form' element={<Form />} />
      </Routes>
    </Container> 
  )
}

export default App;

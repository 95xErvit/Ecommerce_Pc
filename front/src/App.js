import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import CartScreen from './screens/CartScreen'

//import CartScreen from './screens/CartScreen'

const App = () => {
  return (
    <Router>
      <Header/>
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen/>} exact/>
              <Route path='/product/:id' element={<ProductScreen/>} />
              <Route path='/product/:id?' element={<CartScreen/>}/>
              <Route path='/carrito' element={<CartScreen/>}/>
              <Route path='/SignIn' element={<LoginScreen/>}/>
              <Route path='/register' element={<RegisterScreen/>} />
            </Routes>  
          </Container>  
        </main> 
      <Footer/> 
    </Router>
    
  );
}

export default App;


import './App.css';
import BookPage from './pages/BookPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';


function App() {
  


  return (
    <>
    <CartProvider>
       <Router>
      <Routes>
        <Route path='/' element={<BookPage/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/books' element={<BookPage/>}/>
      </Routes>
    </Router>
    </CartProvider>
   
    </>
  )
}

export default App

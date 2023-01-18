import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './Home';
import Lottery from './pages/Lottery/Lottery';
import Sum from './pages/Sum/Sum';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/Sum' element={<Sum/> }></Route>
        <Route path='/Lottery' element={<Lottery/>}></Route>
        <Route></Route>
      </Routes>

      <Link to='/Lottery'>Lottery</Link>
      <Link to='/Sum'>Sum</Link>
      <Link></Link>

    </BrowserRouter>
  );
}

export default App;

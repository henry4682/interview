import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Lottery from './pages/Lottery/Lottery';
import Sum from './pages/Sum/Sum';
function App() {
  return (
    <BrowserRouter basename="/interview">
      <Link to='/Sum'>第一題</Link>
      <Link to='/Lottery'>第二題</Link>
      <a href='https://reurl.cc/6L8Xr5'>第三題</a>
      
      <Routes>
        <Route path='/' element={<Sum/>}></Route>
        <Route path='/Sum'  element={<Sum/> }></Route>
        <Route path='/Lottery' element={<Lottery/>}></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;

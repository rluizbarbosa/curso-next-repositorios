import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Main from './pages/Main'
import Repositorio from './pages/Repositorio'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/repositorio/:repositorio" element={<Repositorio />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default AppRoutes;
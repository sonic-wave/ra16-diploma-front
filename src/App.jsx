import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MainPage } from './components/MainPage/MainPage';
import { About } from './components/About/About';
import { Contacts } from './components/Contacts/Contacts';
import { TopSales } from './components/TopSales/TopSales';
import { CatalogPage } from './components/Catalog/CatalogPage';
import { CatalogItem } from './components/Catalog/CatalogItem';
import { Cart } from './components/Cart/Cart';
import { NotFound } from './components/NotFound/NotFound';


function App() {

  return (
    <>
      <Router basename='/ra16-diploma-front/'>
        <Routes>
          <Route path="/" exact element={<MainPage />} />
          <Route path="/catalog" exact element={<CatalogPage />} />
          <Route path="catalog/:id" element={<CatalogItem />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/contacts" exact element={<Contacts />} />
          <Route path="/sales" exact element={<TopSales />} />
          <Route path="/cart" exact element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

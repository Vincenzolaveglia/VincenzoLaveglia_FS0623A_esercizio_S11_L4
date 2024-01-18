import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { Navbar, Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import Article from './components/Article';
import ArticleDetails from './components/ArticleDetails';

function App() {
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>Spaceflight News</Navbar.Brand>
        </Container>
      </Navbar>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ArticleList />} />
          <Route path='/article/:id' element={<Article />} />
          <Route path='/article/:id/details' element={<ArticleDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

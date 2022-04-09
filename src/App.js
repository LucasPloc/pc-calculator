import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/ui/Header';
import Home from './pages/Home';
import FormPage from './pages/FormPage';
import SummaryPage from './pages/SummaryPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/form/:id' element={<FormPage />} />
        <Route path='/form' element={<FormPage />} />
        <Route path='/summary' element={<SummaryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

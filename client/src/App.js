import { BrowserRouter, Routes, Route} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home'


function App() {
  return (
    <BrowserRouter>
      <div class="App">
        <Header/>
        <div>
          <Routes>
            <Route path='/' element={<Home/>} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;

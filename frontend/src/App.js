import './App.css';

import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './components/Login/Login';
import WordScramble from "./components/word-scramble/word-scramble";
import Register from "./components/Register/Register"


const App=()=>{

  return(
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/registeruser' element={<Register/>}/>
        <Route path='/wordgame' element={<WordScramble/>}/>
        
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App




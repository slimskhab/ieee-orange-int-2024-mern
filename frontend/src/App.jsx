import './App.css'
import Login from './view/pages/Login/Login'

import { Route,Routes } from 'react-router-dom';
import Signup from './view/pages/Signup/Signup';

function App() {

  return (
    <div className="App">
   
<Routes >
  <Route path= "/login" element ={<Login/>}  />
  <Route path= "/signup" element ={<Signup/>}  />

</Routes>
    
    </div>
  )
}

export default App
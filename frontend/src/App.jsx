import './App.css'
import Login from './view/pages/Login/Login'

import { Route,Routes } from 'react-router-dom';
import Signup from './view/pages/Signup/Signup';
import Homepage from './view/pages/Homepage/Homepage';
import Notes from './view/pages/Notes/Notes';

function App() {

  return (
    <div className="App">
   
<Routes >
  <Route path= "/login" element ={<Login/>}  />
  <Route path= "/signup" element ={<Signup/>}  />
  <Route path= "/" element ={<Homepage/>}  />
  <Route path= "/notes" element ={<Notes/>}  />
</Routes>
    
    </div>
  )
}

export default App
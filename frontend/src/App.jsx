import './App.css'
import Login from './view/pages/Login/Login'

import { Route,Routes } from 'react-router-dom';

function App() {

  return (
    <div className="App">
   
<Routes >
  <Route path= "/" element ={<Login/>}  />

</Routes>
    
    </div>
  )
}

export default App
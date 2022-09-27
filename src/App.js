import ClaimNFT from './components/ClaimNFT';
import NFCScan from './components/NFCScan';
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router, 
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    
    <Router>
      <Routes>
        <Route path = "/nfcscan/:id" element={<NFCScan/>}/>
        <Route path = "/claimnft/:id" element={<ClaimNFT/>}/>
      </Routes>
    </Router>
  );
}

export default App;
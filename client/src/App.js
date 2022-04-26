import "./assets/css/style.css"
import { BrowserRouter as Router } from 'react-router-dom'
import AnimatedRoutes from './components/AnimatedRoutes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <div className="app">
      <Router>
        <AnimatedRoutes />
      </Router>
      <ToastContainer 
        // theme={"colored"}
        autoClose={5000}
        closeOnClick
        draggable
        pauseOnHover 
      />
    </div>
  );
}

export default App;

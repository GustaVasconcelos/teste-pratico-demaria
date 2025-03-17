import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/auth.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/routes"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { AuthProvider } from './contexts/AuthContext';
import { LoaderProvider } from './contexts/LoaderContext'; 
import Loader from './components/Loader'; 

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <LoaderProvider>
          <Loader /> 
          <ToastContainer
            position="top-right" 
            autoClose={5000} 
            hideProgressBar={false} 
            newestOnTop={false} 
            closeOnClick 
            rtl={false} 
            pauseOnFocusLoss 
            draggable 
            pauseOnHover
            theme="dark" 
          />
          <AppRoutes /> 
        </LoaderProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;

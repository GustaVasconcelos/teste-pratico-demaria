import { useLoader } from '../hooks/useLoader'; 
import "../assets/styles/Loader.css";

const Loader = () => {
  const { isLoading } = useLoader(); 

  if (!isLoading) return null; 

  return (
    <div className="loader-container d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;

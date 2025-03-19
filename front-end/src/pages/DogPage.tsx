import { useState, useEffect } from "react";
import ContentLayout from "../layout/ContentLayout";
import { useLoader } from "../hooks/useLoader";
import axios from "axios";

const DogPage = () => {
  const [dogImage, setDogImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { showLoader, hideLoader } = useLoader();

  const fetchDogImage = async () => {
    showLoader();
    try {
      const response = await axios.get("https://dog.ceo/api/breeds/image/random");
      setDogImage(response.data.message); 
      setError(null); 
    } catch (error) {
      console.error("Erro ao buscar imagem de cachorro:", error);
      setError("Erro ao carregar a imagem do cachorro. Tente novamente mais tarde.");
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchDogImage();
  }, []);

  return (
    <ContentLayout title="Imagem do Cachorrinho" showBackButton={true}>
      <div className="dog-container">
        <div className="image-container">
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div className="dog-image">
              {dogImage ? (
                <img src={dogImage} alt="Cachorro Aleatório" />
              ) : (
                <p>Carregando imagem...</p>
              )}
            </div>
          )}
        </div>
      </div>
    </ContentLayout>
  );
};

export default DogPage;

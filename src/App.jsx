import {useState, useEffect} from 'react';
import Search from './Components/Search/Search'

const Home = () => {
  const [catData, getCatData] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch('https://api.thecatapi.com/v1/breeds')
        if (!response.ok) {
          throw new Error ('Error: could not receive response')
        }
        const data = await response.json();
        getCatData(data);
      } catch (error) {
          console.error('Error: ', error)
      }
    }
    fetchData();
  }, []);

  const handleClick = (cat) => {
    if (selectedCat && selectedCat.id === cat.id) {
      setSelectedCat(null)
    } else {
      setSelectedCat(cat);
    }
  };

  const handleFavorites = (cat) => {
    const fetchData = async() => {
      try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/${cat.reference_image_id}`)
        if (!response.ok) {
          throw new Error ('Error: could not receive response')
        }
        const data = await response.json();
        setFavorites(prevFavorites => [...prevFavorites, data])
      } catch (error) {
          console.error('Error: ', error)
      }
    }
    fetchData();
  }

  return (
    <div>
      <Search catData={catData} />
      <h3>Favorites</h3>
      {favorites.map((favorite) => (
        <img
          key={favorite.id}
          src={favorite.url}
          style={ { height: '200px', width: '200px' }}       
        />
      ))}
      {catData.map((cat) => (
        <div>
          <button onClick={() => handleClick(cat)}>
            {cat.name}
          </button>
          <button onClick={() => handleFavorites(cat)}>
            Favorite
          </button>
          {selectedCat && selectedCat.id === cat.id && (
            <img
              key={cat.id}
              src={`https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`}
              style={ { height: '200px', width: '200px' }}  
            />
        )}
        </div>
      ))}
    </div>
  )
}

export default Home;

// https://api.thecatapi.com/v1/breeds - Main endpoint containing all cat breeds
// https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg - specific image link pertaining to a specific cat breed



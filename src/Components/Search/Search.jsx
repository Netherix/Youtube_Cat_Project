import {useState} from 'react';

const Search = ({ catData }) => {
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const data = catData.find((cat) => {
      return searchTerm.toLowerCase() === cat.name.toLowerCase();
    });
    setHasSearched(true);
    setSearchResult(data);
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label htmlFor="search">Search: </label>
        <input
          type="text"
          onChange={handleInputChange}
          id="search" 
          value={searchTerm}
          placeholder="Search for a cat breed"
        />
        <button type="submit">Submit</button>
      </form>
      {hasSearched && (
        searchTerm ? (
          <img
          src={`https://cdn2.thecatapi.com/images/${searchResult.reference_image_id}.jpg`}
          alt={searchResult.name}
          style={ { height: '200px', width: '200px' }}        
          /> 
        ) : (
          <p>Breed not found</p>
        )        
      )}
    </div>
  );
};


export default Search;
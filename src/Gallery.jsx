import { useQuery } from '@tanstack/react-query';
import { useGlobalContext } from './context';
import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;
const url = `https://api.unsplash.com/search/photos/?client_id=${apiKey}`;

const Gallery = () => {
  const { searchValue } = useGlobalContext();

  const response = useQuery({
    queryKey: ['images', searchValue],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchValue}`);
      return result.data;
    },
  });

  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an error.</h4>
      </section>
    );
  }

  const results = response.data.results;

  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found.</h4>
      </section>
    );
  }

  return (
    <section className="image-container">
      {results.map((item) => {
        const url = item?.urls?.regular;
        return (
          <img
            key={item.id}
            src={url}
            alt={item.alt_description}
            className="img"
          />
        );
      })}
    </section>
  );
};
export default Gallery;

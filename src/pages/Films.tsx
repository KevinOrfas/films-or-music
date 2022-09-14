import React, { MouseEvent, useEffect, useState } from 'react';
import Card from '../components/Card';
import { useFetch } from '../hooks/useFetch';
import { useLocalStorage } from '../hooks/useLocalStorage';
const filmsUrl = 'https://api.themoviedb.org/3/movie';

function generateRandomInteger(max: number) {
  return Math.floor(Math.random() * max) + 1;
}

const Films = () => {
  const [state, setState] = useState(null);
  const [trending, setTrending] = useState([] as any);
  const [apiKey] = useLocalStorage('api_key', `${process.env.API_KEY}`);
  const url = `${filmsUrl}/${generateRandomInteger(600)}?api_key=${apiKey}`;
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          console.log('data', data);
          setState(data);
        }
      }
    } catch (error) {
      console.log('Error fetching data', error);
    }
  };
  const pickFilm = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data) {
          console.log('data', data);
          setTrending(data);
        }
      }
    } catch (error) {
      console.log('Error fetching data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Card data={state} pickFilm={pickFilm}></Card>
      <div className="text-center">
        {trending?.results?.length > 0 && (
          <h3 className="text-6xl  mb-5 ">Trending!</h3>
        )}
        {trending?.results?.length > 0 &&
          trending?.results.map((film: any, i: number) => {
            return <h4 key={i}>{film.name}</h4>;
          })}
      </div>
    </div>
  );
};

export default Films;

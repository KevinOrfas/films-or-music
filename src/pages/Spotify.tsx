import { ChangeEvent, useEffect, useState } from 'react';
import List from '../components/List';
import { useLocalStorage } from '../hooks/useLocalStorage';

const baseUrl = 'https://api.spotify.com/v1';
const genreUrl =
  'https://api.spotify.com/v1/recommendations/available-genre-seeds';

const searchUrl = `${baseUrl}/search?q=`;
const artistsUrl = `${baseUrl}/artists/`;

const getRandom = (list: any[]) => {
  if (list) {
    return list[Math.floor(Math.random() * list.length)];
  }
};

function Albums() {
  const [searchInput, setSearchInput] = useState('');
  const [albums, setAlbums] = useState([]);
  const [genre, setGenre] = useState([] as any);

  const [accessToken] = useLocalStorage('access_token', '');
  const searchParams = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(genreUrl, searchParams);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setGenre(data);
            console.log(data);
          }
        }
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const search = async (event: any) => {
    console.log('Searched for ' + searchInput);
    event.preventDefault();

    const searchUri = searchUrl + searchInput + '&type=artist';
    const artistsData = await fetch(searchUri, searchParams);
    const artistsList = await artistsData.json();
    const artistId = artistsList?.artists?.items[0]?.id;

    const albumsUrl =
      artistsUrl + artistId + '/albums?include_groups=album&market=GB&limit=50';

    const returnedAlbums = await fetch(albumsUrl, searchParams);
    const albumsData = await returnedAlbums.json();
    setAlbums(albumsData?.items);
  };

  function handleSignInEmailFieldChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setSearchInput(event.target.value);
  }
  return (
    <>
      <div>
        <div>
          <h1 className="text-6xl font-normal leading-normal mt-5 mb-2 text-cyan-800">
            Would you listen to{' '}
            {genre && albums?.length === 0 && (
              <span className="text-black">{getRandom(genre?.genres)}</span>
            )}
            ?
          </h1>
        </div>
        <h2 className="text-4xl font-normal leading-normal mt-5 mb-2 text-cyan-800">
          Explore Artists
        </h2>
        <form onSubmit={search} className="w-full mt-5 mb-5">
          <div className="flex items-center border-b border-teal-500 py-2">
            <input
              type="text"
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              placeholder="Type artist"
              value={searchInput}
              onChange={(e) => handleSignInEmailFieldChange(e)}
            />
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
              onClick={search}
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div>
        {albums?.length > 0 && (
          <div>
            <h2 className="mb-5 mt-5 text-black-200 font-bold text-center text-4xl">
              {searchInput}
            </h2>
            <List collection={albums}></List>
          </div>
        )}
      </div>
    </>
  );
}

export default Albums;

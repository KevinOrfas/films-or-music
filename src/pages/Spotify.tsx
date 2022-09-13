import { ChangeEvent, useEffect, useState } from 'react';
import List from '../components/List';
import { useLocalStorage } from '../hooks/useLocalStorage';

const baseUrl = 'https://api.spotify.com/v1';
const tokenUrl = 'https://accounts.spotify.com/api/token';
const searchUrl = `${baseUrl}/search?q=`;
const artistsUrl = `${baseUrl}/artists/`;

function Albums() {
  const [searchInput, setSearchInput] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [albums, setAlbums] = useState([]);

  const [clientSecret, setClientSecret] = useLocalStorage(
    'client_secret',
    `${process.env.CLIENT_SECRET}`
  );
  const [clientId, setClientId] = useLocalStorage(
    'client_id',
    `${process.env.CLIENT_ID}`
  );

  useEffect(() => {
    const fetchData = async () => {
      const authParams = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
      };
      try {
        const response = await fetch(tokenUrl, authParams);
        if (response.ok) {
          setClientSecret(clientSecret);
          setClientId(clientId);
          const token = await response.json();
          if (token.access_token !== undefined) {
            setAccessToken(token.access_token);
            localStorage.setItem('access_token', token.access_token);
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
    const searchParams = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    };

    const searchUri = searchUrl + searchInput + '&type=artist';
    const artistsData = await fetch(searchUri, searchParams);
    const artistsList = await artistsData.json();
    console.log('artistsList', artistsList);
    const artistId = artistsList?.artists?.items[0]?.id;

    const albumsUrl =
      artistsUrl + artistId + '/albums?include_groups=album&market=GB&limit=50';

    const returnedAlbums = await fetch(albumsUrl, searchParams);
    const albumsData = await returnedAlbums.json();
    setAlbums(albumsData?.items);
    console.log('albumsData', albumsData);
  };

  function handleSignInEmailFieldChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setSearchInput(event.target.value);
  }
  return (
    <>
      <div>
        <h1 className="text-6xl font-normal leading-normal mt-5 mb-2 text-cyan-800">
          Explore Artists
        </h1>
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
        <List collection={albums}></List>
      </div>
    </>
  );
}

export default Albums;

import { useEffect } from 'react';
import { Cta } from '../components/Cta';
import { useLocalStorage } from '../hooks/useLocalStorage';

const tokenUrl = 'https://accounts.spotify.com/api/token';

export const Home = () => {
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
            localStorage.setItem('access_token', token.access_token);
          }
        }
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Cta />
    </>
  );
};

export default Home;

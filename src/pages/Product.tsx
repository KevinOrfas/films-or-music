import { useParams } from 'react-router-dom';
import Songs from '../components/Songs';
import { useFetch } from '../hooks/useFetch';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Product = () => {
  const { id } = useParams();
  const albumUrl = `https://api.spotify.com/v1/albums/${id}`;
  const [accessToken] = useLocalStorage('access_token', undefined);

  const searchParams = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
  };
  const { data } = useFetch(albumUrl, searchParams);

  const bg = data?.images[0]?.url;
  return (
    data && (
      <div className="w-full mt-5 mb-5">
        <div className="container mx-auto my-5">
          <div className="relative rounded-lg flex flex-col md:flex-row items-center md:shadow-xl md:h-72 mx-2">
            <div className="z-0 order-1 md:order-2 relative w-full md:w-2/5 h-80 md:h-full overflow-hidden rounded-lg md:rounded-none md:rounded-r-lg">
              <div
                className="absolute inset-0 w-full h-full object-fill object-center bg-blue-400 bg-opacity-30 bg-cover bg-bottom"
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: 'cover',
                  height: '400px',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
              <div className="md:hidden absolute inset-0 h-full p-6 pb-6 flex flex-col-reverse justify-start items-start bg-gradient-to-b from-transparent via-transparent to-gray-900">
                <h3 className="w-full font-bold text-2xl text-white leading-tight mb-2">
                  {data?.name}
                </h3>
                <h4 className="w-full text-xl text-gray-100 leading-tight">
                  {data?.label}
                </h4>
              </div>
              <svg
                className="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-white -ml-12"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <polygon points="50,0 100,0 50,100 0,100" />
              </svg>
            </div>

            <div className="z-10 order-2 md:order-1 w-full h-full md:w-3/5 flex items-center -mt-6 md:mt-0">
              <div className="p-8 md:pr-18 md:pl-14 md:py-12 mx-2 md:mx-0 h-full bg-white rounded-lg md:rounded-none md:rounded-l-lg shadow-xl md:shadow-none">
                <h3 className="hidden md:block font-bold text-2xl text-gray-700">
                  {data?.name}
                </h3>
                <h4 className="hidden md:block text-xl text-gray-400">
                  {data?.label}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-6xl font-normal leading-normal mt-5 mb-5 text-cyan-800">
          Explore the Tracks
        </h1>
        <div className="mt-5 rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <div className="px-4 py-3">
            <div className="flex items-center">
              <Songs collection={data?.tracks?.items} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Product;

import { MouseEvent } from 'react';

const Card = ({ data, pickFilm }: any) => {
  const onPick = (e: MouseEvent) => {
    console.log(e);
    e.preventDefault();
    pickFilm();
  };
  return (
    <div className="bg-deep-purple-accent-700">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
          <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
              <h1 className="text-6xl font-normal leading-normal mt-5 mb-2 text-cyan-800">
                {data?.original_title}
              </h1>
              <p className="text-base text-black-600 md:text-lg">
                {data?.overview}
              </p>
            </div>
            <div>
              <button
                className="inline-flex items-center justify-center h-12 px-6 font-semibold tracking-wide text-teal-900 transition duration-200 rounded shadow-md hover:text-deep-purple-900 bg-teal-accent-400 hover:bg-deep-purple-accent-100 focus:shadow-outline focus:outline-none"
                onClick={onPick}
              >
                Pick up a film
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

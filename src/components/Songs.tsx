import React from 'react';

const Songs = ({ collection }: any) => {
  const notEmptyCollection = collection && collection.length > 0;
  return (
    <div className="grid grid-cols-4 gap-4">
      {notEmptyCollection &&
        collection.map((item: any, i: number) => {
          console.log('item', item);
          return (
            <div key={i}>
              <div className="rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    <h3>{item?.name}</h3>
                  </div>
                  <figure>
                    <audio controls src={item?.preview_url}>
                      Your browser does not support the
                      <code>audio</code> element.
                    </audio>
                  </figure>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Songs;

const Songs = ({ collection }: any) => {
  const notEmptyCollection = collection && collection.length > 0;
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4">
      {notEmptyCollection &&
        collection.map((item: any, i: number) => {
          console.log('item', item);
          return (
            <div key={i}>
              <div className="rounded bg-teal-200 overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    <h3>{item?.name}</h3>
                  </div>
                  <figure>
                    <audio
                      style={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        margin: 'auto',
                        objectFit: 'contain',
                      }}
                      controls
                      src={item?.preview_url}
                    ></audio>
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

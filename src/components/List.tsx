import { Link } from 'react-router-dom';

interface ListProp {
  collection: any[];
}
function List({ collection }: ListProp) {
  const notEmptyCollection = collection && collection.length > 0;
  return (
    <div className="grid grid-cols-4 gap-4">
      {notEmptyCollection &&
        collection.map((item: any, i: number) => {
          return (
            <div key={i}>
              <div className="rounded overflow-hidden shadow-lg">
                <img
                  className="w-full"
                  src={item?.images[0]?.url}
                  alt="album pic"
                />

                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    <Link to={`/albums/${item?.id}`}>{item?.name}</Link>
                  </div>
                  <h5>
                    Year:{' '}
                    <span className="font-bold">{item?.release_date}</span>
                  </h5>
                  <p>
                    Tracks:{' '}
                    <span className="font-bold">{item?.total_tracks}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default List;

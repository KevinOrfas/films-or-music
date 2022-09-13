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
                  <p>Tracks {item?.total_tracks}</p>
                  <h5>Year {item?.release_date}</h5>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default List;

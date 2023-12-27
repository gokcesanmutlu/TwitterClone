import { collection, count, getAggregateFromServer } from "firebase/firestore";
import { db } from "./../firebase/config";
import { useEffect, useState } from "react";

const Aside = () => {
  const [data, setData] = useState(null);
  const tweetCol = collection(db, "tweets");
  // 1 getAgg.. dökümanlarımızla ilgili istatistik raporlarını serverdan yarar
  // 2 sum /average / count yardımıyla rapor adımları belirlenir

  useEffect(() => {
    getAggregateFromServer(tweetCol, {
      tweetsCount: count(),
    }).then((data) => setData(data._data));
  }, []);

  return (
    <div className="max-lg:hidden">
      <p className="my-5 text-align-center p-3 text-lg">
        Total tweet count: {data?.tweetsCount?.integerValue}
      </p>
    </div>
  );
};
export default Aside;

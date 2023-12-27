import { useEffect, useState } from "react";
import Form from "./Form";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Spinner from "./Spinner";
import Post from "./Post/index";
import { db } from "../firebase/config";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState(null);

  const tweetsCol = collection(db, "tweets");

  // filtreleme ayarları/ queryden sonra yaptığımız ayarları options adlı bir değişkene aktardık
  // onsnapsshot'ın 1. paramı olan tweetcol'u bu options ile değiştirdik
  const options = query(tweetsCol, orderBy("createdAt", "desc"));

  useEffect(() => {
    // tweets koleksiyonuna abone ol, ons. metotu anlık olarak tweetsCol'u izlicek,
    // burada herhangi bir değişiklik olduğu anda bu değişikliği içeren diziyi bize vercek

    const unsub = onSnapshot(options, (snapshot) => {
      // geçici dizi
      const tempTweets = [];

      // bütün dökümanları dön veri ve id'lerinden oluşan objeleri geçici diziye aktar
      snapshot.forEach((doc) => tempTweets.push({ id: doc.id, ...doc.data() }));

      // geçici dizideki verileri state'e latar
      setTweets(tempTweets);
    });

    return () => unsub();
  }, []);

  return (
    <main className="border border-gray-900 overflow-y-auto ">
      <header className="font-bold p-4 border-b-[0.5px] border-gray-900">
        Home
      </header>

      <Form user={user} />

      {/* tweetleri listeler */}
      {!tweets ? (
        <div className="flex justify-center my-10">
          <Spinner style={"w-6 h-6 text-blue-600"} />
        </div>
      ) : (
        tweets.map((tweet) => <Post tweet={tweet} key={tweet.id} />)
      )}
    </main>
  );
};

export default Main;

import { useEffect, useState } from "react";
import Aside from "../components/Aside";
import Nav from "../components/Nav";
import Main from "../components/Main";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

const FeedPage = () => {
  // kullanıcının bilgisine abone ol
  const [user, setUser] = useState(null);

  useEffect(() => {
    //ikinci param olan fonk, kullanıcının durumu her değiştiğinde bunu param olarak alır
    // biz burada anlık olarak kullanıcının bilgisine abone olduk
    // kullanıcı değiştiği anda mevcut kullanıcı bilgisini state'e aktardık
    const unsub = onAuthStateChanged(auth, (currUser) => setUser(currUser));
    return () => unsub();
  }, []);

  return (
    <div className="feed h-screen bg-black overflow-hidden">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default FeedPage;

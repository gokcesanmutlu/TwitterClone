import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase/config";
import { useState } from "react";

const ProtectedRoute = () => {
  // kullanıcının yetkisi var mı?
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    // kullanıcının oturumuna abone olur anlık olarak kullanıcının oturumundaki değişiklikleri izler
    // buradaki fonk.  her oturum değiştiğinde çalışır (oturumun açılması kapanması gibi olaylar)
    // param olarak aktif kullanıcıyı alır
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });

    return () => unsub();
  }, []);

  //Kullanıcı yetkisizse logine yönlendir
  // aşağıya !isAuth dersen firebaseden cevap beklerken de undefined olduğunda seni doğrudan logine yönlendirir
  // hiç protected Route'ye geçemezsin neticede onauthchange firebaseden veri alıyo
  if (isAuth === false) {
    //aynı anda bileşen içinden yönlendirme yapmamız ve bir şey return etmemiz gerekiyorsa
    // navigate'in fonk halini değil bileşen halini kullanmalıyız
    return <Navigate to={"/"} replace={true} />;
  }

  //kullanıcının yetkisi varsa alt route'a geçmesine izin ver
  // outlet için kısaca alt route'un yerleşeceği yer diyebiliriz
  return <Outlet />;
};

export default ProtectedRoute;

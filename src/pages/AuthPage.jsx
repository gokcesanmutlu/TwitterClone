import { useState } from "react";
import { auth, provider } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthPage = () => {
  // kaydol modunda mıyız state'i
  const [isSignUp, setIsSignUp] = useState(false);
  // girişteki şifre ve e postayı event'ten almak yerine state'te tutuyoruz çünkü bir kaç yerde kullanıcaz
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isForgotPass, setIsForgotPass] = useState(false);

  const navigate = useNavigate();

  //hesaba giriş yap / oluştur
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email, pass)

    if (isSignUp) {
      //yeni hesap oluştur, aşağıdaki fonk dökümandan ve firebase'den geliyo
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.success("Account creation was succeded.");
          navigate("/feed");
        })
        .catch((err) => toast.error(`Error: ${err.code}`));
      // hataya detaylı bakmak için console.dir yaptık
    } else {
      //varolan hesapta oturum aç, aşağıdaki fonk dökümandan ve firebase'den geliyo
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.info("Logged In");
          navigate("/feed");
        })
        .catch((err) => {
          // eğer ki hata kodu şifre yanlış yazıldığında ortaya çıkan kod ise o zaman şifremi unuttum yazısını göster
          if (err.code === "auth/invalid-credential") {
            setIsForgotPass(true);
          }

          console.dir(err);
          toast.error(`Error: ${err.code}`);
        });
    }
  };

  // Şifre sıfırlama e postası gönder
  const sendMail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("A password reset link has been sent to your email.");
      })
      .catch(() => {
        "We couldn't send mail";
      });
  };

  // google ile giriş
  const loginWithGoogle = () => {
    //signInWithRedirect yapsaydık aşağıdaki fonksiyonu, popup açmadan aynı ekranda doğrudan google hesabı seçmeye yönlendirirdi.
    signInWithPopup(auth, provider).then(navigate("/feed"));
  };

  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-10 py-16 px-32 rounded-lg">
        {/* {logo} */}
        <div className="flex justify-center">
          <img className="h-[60px]" src="/x-logo.webp" alt="" />
        </div>

        <h1 className="text-center font-bold text-xl">Enter to Twitter</h1>

        {/* google button */}
        <button
          onClick={loginWithGoogle}
          className="flex items-center bg-white py-2 px-10 rounded-full text-black cursor-pointer gap-3 transition hover:bg-gray-300"
        >
          <img className="h-[20px]" src="/google-logo.svg" alt="" />
          <span className="whitespace-nowrap">Sign in with Google</span>
        </button>

        {/* giriş formu */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            type="email"
            required
            className="text-black rounded m-1 p-2 outline-none shadow-lg transition focus:shadow-[gray]"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            required
            className="text-black rounded m-1 p-2 outline-none shadow-lg transition focus:shadow-[gray]"
            onChange={(e) => setPass(e.target.value)}
          />

          <button className="bg-white text-black mt-10 rounded-full p-1 font-bold transition hover:bg-gray-300">
            {isSignUp ? "Register" : "Log In"}
          </button>

          <p className="mt-5 flex gap-4 min-w-[280px]">
            <span className="text-gray-500">
              {isSignUp
                ? "If you have an account,"
                : "If you don't have an account,"}
            </span>
            <span
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-500 cursor-pointer"
            >
              {isSignUp ? "Log In" : "Register"}
            </span>
          </p>
        </form>

        {isForgotPass && (
          <p className="text-center text-red-500" onClick={sendMail}>
            Did you forget your password?
          </p>
        )}
      </div>
    </section>
  );
};

export default AuthPage;

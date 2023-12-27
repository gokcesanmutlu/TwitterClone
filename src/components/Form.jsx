import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { BsCardImage } from "react-icons/bs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);

  // koleksiyon'un referansını alma
  const tweetsCol = collection(db, "tweets");

  // Aldığı medyayı storage'a kaydedip url'sini döndüren fonk.
  // bu yükleme fonksiyonunu hangi medya tipini seçerseniz yükler, html, css, resim fark etmez, bu kod hepsini destekliyo
  // aşağıdaki fonksiyonu bir çok yerde kullanabilirsiniz
  const uploadImage = async (file) => {
    //Dosya resim değilse fonksiyonu durdur
    if (!file || !file.type.startsWith("image")) return null;

    // Dosyayı yükleyeceğimiz yerin referansını alma (yer ayırtma)
    const fileRef = ref(storage, file.name.concat(v4()));

    // ayırttığımız yere dosyayı yükleme
    await uploadBytes(fileRef, file);

    // yüklediğimiz dosyanın url'ine erişme
    return await getDownloadURL(fileRef);
  };

  //tweet gönder
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Formdaki verilere erişme
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    if ((!textContent || textContent === " ") && !imageContent)
      return toast.info("Lütfen içerik ekleyiniz");

    setIsLoading(true);

    const url = await uploadImage(imageContent);

    //tweets kolleksiyonuna yeni döküman ekle
    await addDoc(tweetsCol, {
      textContent,
      imageContent: url,
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      likes: [],
      isEdited: false,
    });
    setIsLoading(false);

    // tüm formu sıfırlar
    e.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b-[1px] border-gray-900"
    >
      <img
        className="rounded-full h-[35px] md:h-[45px] mt-1"
        src={user?.photoURL}
      />

      <div className="w-full">
        <input
          className="w-full bg-transparent my-2 outline-none md:text-lg"
          type="text"
          placeholder="What's going on?"
        />

        <div className="flex justify-between items-center">
          <input id="image" className="hidden" type="file" />

          <label
            className="hover:bg-gray-800 text-lg transition p-4 cursor-pointer rounded-full"
            htmlFor="image"
          >
            <BsCardImage />
          </label>

          <button className="bg-blue-600 flex items-center px-4 py-2 min-w-[85px] min-h-[40px] rounded-full transition hover:bg-blue-800">
            {isLoading ? <Spinner /> : "Tweetle"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;

import { BiSolidSave } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { useRef, useState } from "react";
import { db } from "../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { BsTrashFill } from "react-icons/bs";
import { IoMdReturnLeft } from "react-icons/io";

const EditMode = ({ tweet, close }) => {
  const [isPicDeleting, setIsPicDeleting] = useState(false);
  const inputRef = useRef();

  const handleSave = () => {
    // 1 Inputun içeriğine eriş
    const newText = inputRef.current.value;

    // 2 güncellenecek dökümanın referansını al
    // referans almaya yarayan doc metotunun bizden istediği 3 param
    //(db(yani veridatabanı), koleksiyon ismi(hangi coleksiyonda olduğunu söylemeli),döküman adı(tweet.id) )
    const tweetRef = doc(db, "tweets", tweet.id);

    // 3 Dökümanın text içeriğini güncelle
    // * eğerki resim silinecekse imageContent'i null yap
    // burada yok ama resimi yeni bir resimle değiştirmek isteseydik, yeni resim önce storageye yüklenirdi oradan url'i updatedoc metotuna verilir
    if (isPicDeleting) {
      updateDoc(tweetRef, {
        textContent: newText,
        imageContent: null,
      });
    } else {
      updateDoc(tweetRef, {
        textContent: newText,
      });
    }

    // düzenleme modunu kapat
    close();
  };

  return (
    // buradaki design'i tweet'in değiştirilmeden önceki designina benzetmeye çalıştık bu nedenle div
    // yerine fragment verdik ve form yapmadık direkt input koyduk, dolayısıyla e.target value ile içine
    // erişemedik ve useref kullandık
    <>
      <input
        ref={inputRef}
        defaultValue={tweet.textContent}
        className="rounded p-1 px-2 text-black"
        type="text"
      />

      <button
        onClick={handleSave}
        className="mx-5 p-2 text-green-400 rounded-full shadow hover:shadow-green-500"
      >
        <BiSolidSave />
      </button>
      <button
        onClick={close}
        className="mx-5 p-2 text-red-400 rounded-full shadow hover:shadow-red-500"
      >
        <ImCancelCircle />
      </button>

      {tweet.imageContent && (
        <div className="relative">
          <img
            className={` ${
              isPicDeleting ? "blur" : ""
            } my-2 rounded-lg w-full object-cover max-h-[400px]`}
            src={tweet.imageContent}
          />

          <button
            onClick={() => setIsPicDeleting(!isPicDeleting)}
            className="absolute top-1 right-2 text-xl p-2 bg-white transition text-red-600 rounded-full hover:scale-90"
          >
            {isPicDeleting ? <IoMdReturnLeft /> : <BsTrashFill />}
          </button>
        </div>
      )}
    </>
  );
};

export default EditMode;

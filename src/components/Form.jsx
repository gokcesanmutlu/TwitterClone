import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { BsCardImage } from "react-icons/bs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


const Form = ({ user }) => {
    // koleksiyon'un referansını alma
    const tweetsCol = collection(db, "tweets");

    // Aldığı medyayı storage'a kaydedip url'sini döndüren fonk.
    const uploadImage = async (file) => {
        // console.log(file);
        // Dosyayı yükleyeceğimiz yerin referansını alma (yer ayırtma)
        const fileRef = ref(storage, file.name);

        // ayırttığımız yere dosyayı yükleme
        await uploadBytes(fileRef, file)

        // yüklediğimiz dosyanın url'ine erişme
       
    }

    //tweet gönder
    const handleSubmit = async (e) => {
        e.preventDefault();
        const textContent = e.target[0].value;
        const imageContent = e.target[1]

        uploadImage(imageContent)

        //tweets kolleksiyonuna yeni döküman ekle
        await addDoc(tweetsCol, {
            textContent,
            imageContent: null,
            createdAt: serverTimestamp(),
            user: {
                id: user.uid,
                name: user.displayName,
                photo: user.photoURL,
            },
            likes: [],
            isEdited: false,
        })
    }
    return (
        <form onSubmit={handleSubmit} className="flex gap-3 p-4 border-b-[1px] border-gray-900">
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
                        Tweetle
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Form;

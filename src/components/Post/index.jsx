import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import moment from "moment";
import { db } from "../../firebase/config";
import DropDown from "./DropDown";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth } from "./../../firebase/config";
import { useState } from "react";
import EditMode from "./EditMode";

const Post = ({ tweet }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  //timestamp ile başka formatta gelen tweet atılış tarihini bildiğimiz zaman formatına çevirme
  const date = moment(tweet?.createdAt?.toDate()).fromNow();

  // aktif kullanıcı bu tweet'in likes dizisin içerisinde var mı?/ burada includes ve contains de verilebilir
  const isLiked = tweet.likes.find((id) => id === auth.currentUser.uid);
  // içeriyosa true içermiyorsa false döndürüyo

  //tweeti kaldırır
  const handleDelete = async () => {
    if (confirm("Are you confirm to delete this tweet?")) {
      // kaldıracağımız dökümanın referansını alıyoruz
      const tweetRef = doc(db, "tweets", tweet.id);
      // dökümanı kaldır
      await deleteDoc(tweetRef);
    }
  };

  // like olayını izler
  const handleLike = async () => {
    // güncellenecek belgenin referansını alma
    const ref = doc(db, "tweets", tweet.id);

    // aktif kullanıcının id'sini likes dizisine ekle
    // ikinci param olarak sadece güncellenecek verinin değerini gönderiyoz
    updateDoc(ref, {
      likes: isLiked // kullanıcı tweeti likeladı mı?
        ? arrayRemove(auth.currentUser.uid) // likeladı ise like'i kaldır
        : arrayUnion(auth.currentUser.uid), // likelamadı ise like at
    });
  };

  return (
    <div className="relative flex gap-3 px-3 py-6 border-b-[1px] border-gray-700">
      <img
        src={tweet.user.photo}
        className="w-12 h-12 rounded-full"
        alt="user's photo"
      />

      <div className="w-full">
        {/* users info, top area */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray-400">
              @{tweet.user.name.toLowerCase().replace(" ", "_")}
            </p>
            <p>{date}</p>
          </div>

          {tweet.user.id === auth.currentUser.uid && (
            <DropDown
              handleDelete={handleDelete}
              setIsEditMode={setIsEditMode}
            />
          )}
        </div>

        {/* orta kısım tweet içeriği */}
        <div className="my-3">
          {isEditMode && (
            <EditMode tweet={tweet} close={() => setIsEditMode(false)} />
          )}
          {!isEditMode && tweet.textContent && (
            <p className="my-2">{tweet.textContent}</p>
          )}
          {!isEditMode && tweet.imageContent && (
            <img
              className="my-2 rounded-lg w-full object-cover max-h-[400px]"
              src={tweet.imageContent}
            />
          )}
          {/* image contente soru işareti koyarsak, url boş olduğunda yüklenmeyen resim gösterir o yüzden direk varsa bas diyoruz */}
        </div>

        {/* etkileşim buttons */}
        <div className="flex justify-between">
          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00b7ff69]">
            <BiMessageRounded />
          </div>
          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#00ff4436]">
            <FaRetweet />
          </div>
          <div
            onClick={handleLike}
            className="flex items-center gap-3 py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#e857d969]"
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            <span>{tweet.likes.length}</span>
          </div>
          <div className="grid place-items-center py-2 px-3 rounded-full cursor-pointer transition hover:bg-[#7e7e7ea8]">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

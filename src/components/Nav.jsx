import { BiDoorOpen } from "react-icons/bi";
import { navSections } from "../constant";
import { auth } from "./../firebase/config";
import { signOut } from "firebase/auth";

const Nav = ({ user }) => {
  // console.log(auth)
  return (
    <div className="flex flex-col justify-between px-3 py-5 min-sm:ml-4 ">
      {/* links */}
      <div>
        <img className="w-14 mb-4" src="x-logo.webp" alt="logo" />

        {navSections.map((i, index) => (
          <div
            key={index} // key propunu ekledik ve index'i kullandık
            className="flex justify-center md:justify-normal items-center gap-3 text-l p-3 cursor-pointer transition rounded-lg hover:bg-[#505050b7]"
          >
            {i.icon}
            <span className="max-md:hidden">{i.title}</span>
          </div>
        ))}
      </div>

      {/* kullanıcı bilgileri 
            buradaki veri geldiğinde yeniden render edilmesini sağlamak için feed state'lerinde kullanıcı bilgisini tuttuk*/}
      <div className="">
        {!user ? (
          <div className="w-10 h-10 bg-gray-300 rounded-full animate-bounce"></div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex gap-2 items-center">
              <img
                src={user.photoURL}
                className="w-12 h-12 rounded-full"
                alt=""
              />
              <p className="max-md:hidden">{user.displayName}</p>
            </div>
            {/* sadece bu onclick hesaptan çıkış yapmaya yeter */}
            <button
              onClick={() => {
                signOut(auth);
              }}
              className="flex justify-center gap-2 items-center p-1 bg-gray-700 rounded text-2xl md:text-[15px]"
            >
              <BiDoorOpen />
              <span className="max-md:hidden">Log Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;

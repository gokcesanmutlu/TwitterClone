import { BiHomeCircle } from "react-icons/bi";
import { AiOutlineBell, AiOutlineMail } from "react-icons/ai";
import { CiViewList } from "react-icons/ci";
import { BsBookmark } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { PiDotsThreeCircle } from "react-icons/pi";

export const navSections = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Notification",
    icon: <AiOutlineBell />,
  },
  {
    title: "Messages",
    icon: <AiOutlineMail />,
  },
  {
    title: "Lists",
    icon: <CiViewList />,
  },
  {
    title: "Bookmark",
    icon: <BsBookmark />,
  },
  {
    title: "Approved",
    icon: <AiOutlineCheckCircle />,
  },
  {
    title: "Profile",
    icon: <CgProfile />,
  },
  {
    title: "More..",
    icon: <PiDotsThreeCircle />,
  },
];

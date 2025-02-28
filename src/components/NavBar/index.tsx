import { BsPostcard } from "react-icons/bs";
import NavButton from "./NavButton";
import { RiUserHeartFill, RiUserHeartLine } from "react-icons/ri";

const NavBar = () => {
    return (
        <nav>
            <ul className="flex flex-col gap-5">
                <li>
                    <NavButton href="" icon={<BsPostcard />}>
                        Posts
                    </NavButton>
                </li>
                <li>
                    <NavButton href="following" icon={<RiUserHeartFill />}>
                        Following
                    </NavButton>
                </li>
                <li>
                    <NavButton href="followers" icon={<RiUserHeartLine />}>
                        Followers
                    </NavButton>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;
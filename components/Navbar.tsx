import { HiMenu } from "react-icons/hi";
import toast from "react-hot-toast";

import { getAuthSession } from "@/lib/auth";
import Logout from "./Logout";
import SignIn from "./SignIn";
import Middleware from "./Middleware";

interface NavbarProps {
  className?: string;
  children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = async ({ children }) => {
  // const session = await getAuthSession();

  let session = await getAuthSession();

  return (
    <div>
      <div className="flex justify-center bg-transparent text-center flex-no-wrap top-0 relative">
        <div className="flex justify-between text-center items-center w-full mx-12 p-3  text-rose-400">
          <div>
            <HiMenu size={20} className=" text-rose-400" />
          </div>
          <h1 className="text-3xl font-bold">Solopack</h1>

          <div>{session ? <Logout /> : <SignIn />}</div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Navbar;

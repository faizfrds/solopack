import { useState } from "react";
import Button from "./Button";
import { twMerge } from "tailwind-merge";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const UserAuthForm: React.FC<UserAuthFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast.error("Failed to login")
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={twMerge("flex justify-center", className)} {...props}>
      <Button
        className="bg-black items-center flex justify-center gap-x-2"
        onClick={loginWithGoogle}
        isLoading={isLoading}
      >
        {isLoading ? null : <FcGoogle size={32} />} Google
      </Button>
    </div>
  );
};

export default UserAuthForm;

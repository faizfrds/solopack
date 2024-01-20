import { User } from "next-auth";

interface UserAccountNavProps {
    user: Pick<User, 'name' | 'image' | 'email'>,
}
 
const UserAccountNav: React.FC<UserAccountNavProps> = () => {
    return ( 
        <div>

        </div>
     );
}
 
export default UserAccountNav;
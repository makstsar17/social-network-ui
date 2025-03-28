import { useGetFollowersQuery } from "../../app/services/userApi";
import Spinner from "../../components/Spinner";
import UserCard from "../../components/UserCard";

const Followers = () => {
    const { data, isLoading } = useGetFollowersQuery();

    if (isLoading)
        return <Spinner />

    if (!data)
        return null;

    return (
       <UserCard data={data}/>
    );
}

export default Followers;
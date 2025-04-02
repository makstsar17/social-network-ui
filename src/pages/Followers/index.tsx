import { useGetFollowersQuery } from "../../app/services/userApi";
import EmptyFollowList from "../../components/EmptyFollowList";
import Spinner from "../../components/Spinner";
import UserCard from "../../components/UserCard";

const Followers = () => {
    const { data, isLoading } = useGetFollowersQuery();

    if (isLoading)
        return <Spinner />

    if (!data)
        return null;

    if(data.length === 0)
        return <EmptyFollowList content="Followers"/> 

    return (
       <UserCard data={data}/>
    );
}

export default Followers;
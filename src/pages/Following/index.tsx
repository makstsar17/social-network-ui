import { useGetFollowingsQuery } from "../../app/services/userApi";
import EmptyFollowList from "../../components/EmptyFollowList";
import Spinner from "../../components/Spinner";
import UserCard from "../../components/UserCard";

const Following = () => {

    const { data, isLoading } = useGetFollowingsQuery();

    if (isLoading)
        return <Spinner />

    if (!data)
        return null;

    if(data.length === 0)
        return <EmptyFollowList content="Followings"/> 

    return <UserCard data={data}/>
}

export default Following;
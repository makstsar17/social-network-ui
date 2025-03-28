import { useGetFollowingsQuery } from "../../app/services/userApi";
import Spinner from "../../components/Spinner";
import UserCard from "../../components/UserCard";

const Following = () => {

    const { data, isLoading } = useGetFollowingsQuery();

    if (isLoading)
        return <Spinner />

    if (!data)
        return null;

    return <UserCard data={data}/>
}

export default Following;
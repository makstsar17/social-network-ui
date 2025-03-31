import { Tab, Tabs } from "@heroui/react";
import PostsFeedAll from "../../components/PostsFeed/PostsFeedAll";
import PostsFeedFollowing from "../../components/PostsFeed/PostsFeedFollowing";


const Posts = () => {


    return (
        <div className="flex flex-col w-full">
            <Tabs radius="none" color="secondary" variant="underlined" fullWidth classNames={{tab: "text-large"}}>
                <Tab title="All">
                    <PostsFeedAll />
                </Tab>
                <Tab title="Following">
                    <PostsFeedFollowing />
                </Tab>
            </Tabs>
        </div>
    );
}

export default Posts;
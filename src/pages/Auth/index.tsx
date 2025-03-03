import { Card, CardBody, Tab, Tabs } from "@heroui/react";
import { useState } from "react";
import Login from "../../components/Login";
import Register from "../../components/Register";

const Auth = () => {
    const [selected, setSelected] = useState("login");

    return (
        <div className="flex justify-center items-center h-screen w-full">
            <Card className="w-[400px] min-h-[450px]">
                <CardBody>
                    <Tabs
                        fullWidth
                        selectedKey={selected}
                        onSelectionChange={key => setSelected(key as string)}>
                        <Tab key={"login"} title={"Login"} >
                            <Login setSelected={setSelected} />
                        </Tab>
                        <Tab key={"signUp"} title={"Sign Up"}>
                            <Register setSelected={setSelected} />
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </div >
    );
}

export default Auth;
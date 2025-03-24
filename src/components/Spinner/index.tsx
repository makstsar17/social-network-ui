import { Spinner as HeroSpinner } from "@heroui/react";

const Spinner = () => {
    return (
        <div className="flex items-center justify-center">
            <HeroSpinner size="lg" color="secondary"/>
        </div>
    );
}

export default Spinner;
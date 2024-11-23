
import LayoutContainer from "../layout/LayoutContainer";
import TeamComponent from "../components/Team";

const Team = () => {
    return (
        <LayoutContainer>
            <div className="flex items-center justify-center">
                <TeamComponent />
            </div>
        </LayoutContainer>
    );
};

export default Team;


import LayoutContainer from "../layout/LayoutContainer";
import MessageComponent from "../components/Message";

const Message = () => {
    return (
        <LayoutContainer>
            <div className="flex items-center justify-center">
                <MessageComponent />
            </div>
        </LayoutContainer>
    );
};

export default Message;

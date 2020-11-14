import React, {useEffect} from 'react';
import Message from "./Message";

const ListMessage = ({messages, thisUser}) => {

    const ref = React.createRef();

    let list = messages.slice().map((value) => {
        return (<Message thisUser={thisUser.type} message={value} key={value.id}/>)
    });
    useEffect(() => {
        ref.current.scrollTop = ref.current.scrollHeight;
    }, [ref]);
    return (
        <div className="container-message" ref={ref}>
            {list}
        </div>
    );
};

export default ListMessage;
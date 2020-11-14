import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Modal from "@material-ui/core/Modal";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Message from "./Message";
import ListMessage from "./ListMessage";

const axios = require('axios');

function Example() {

    const [thisUser, setThisUser] = useState(null);
    const [text, setText] = useState('');
    const [allMessage, setAllMessage] = useState([]);

    const sendMessage = () => {
        console.log(text);
        if(text){
            setText('');
            console.log(allMessage);
            axios.post('/message', JSON.stringify({
                user: thisUser.type,
                text: text
            })).then((res) => {
                console.log(res);
            }).catch((e) => {
                console.log(e.response);
            })
        }
    };

    const setUser = (obj) => {
        setThisUser(obj);

        axios.get('/messages').then((res) => {
            setAllMessage(res.data.messages);
            console.log(res);
        }).catch((e) => {
           console.log(e.response);
        });
    };

    useEffect(() => {
        console.log(allMessage);
    }, [allMessage]);

    useEffect(() => {

        window.Echo.channel('message').listen('MessageEvent', (e) => {
            console.log(e);
            setAllMessage(e.message);
        });


        return () => {
            window.Echo.leaveChannel('message');
        }
    }, []);


    return (
        <div className="container">
            {thisUser !== null ? <div>
                <AppBar position="fixed">
                    <Toolbar component="div">
                        <Typography variant="h6" component="h2">
                            {thisUser.name}
                        </Typography>
                    </Toolbar>
                </AppBar>
                    <ListMessage messages={allMessage} thisUser={thisUser}/>
                <div className="toolbars">
                    <div className="toolbars__input">
                        <InputBase fullWidth={true}
                                   value={text}
                                   onChange={(e) => setText(e.target.value)}
                                   style={{backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '6px'}}
                            placeholder="Введите сообщение"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={sendMessage}
                        >
                            Send
                        </Button>
                    </div>
                </div>
            </div> :
            <div>
                <Modal
                    open={thisUser === null}>
                    <div>
                        <h2 id="simple-modal-title">Выберите пользователя</h2>
                        <ButtonGroup>
                            <Button onClick={() => setUser({type: 'client', name: 'Оператор'})}>Клиент</Button>
                            <Button onClick={() => setUser({type: 'operator', name: 'Клиент'})}>Оператор</Button>
                        </ButtonGroup>
                    </div>
                </Modal>
            </div>}
        </div>
    );
}

export default Example;

if(document.getElementById('app'))
    ReactDOM.render(<Example />, document.getElementById('app'));
import axios from 'axios'
import React, { useEffect } from 'react'
import ToggleSwitch from '../../../components/switch';
import { getTokenFormCookie } from '../../../utill/cookieUtill'
import styled from 'styled-components';
import Backlog from '../../../components/backlog';
import useWebSocket, { ReadyState } from 'react-use-websocket';


const Box = styled.div`
    padding: 10px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
    display: none;
}

`
const StatusPanel = styled.section`

    display: flex;
    background-color: #e5e5e5;
    flex-direction: column;
    margin: 20px;
    padding: 20px;
    width: 100%;
    height: 90%;
    max-width: 400px;

    border-radius: 20px;
`

const Container = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 93%;
`

const TextPanel = styled.div`

    position: relative;
    width: 100%;
    height: 100%;
    max-height: 100%;

`

const Content = styled.div`
    margin: 20px;
    padding: 20px;
    display: flex;
    height: 40%;
    position: relative;
    background-color: #e5e5e5;
    border-radius: 20px;

`
interface methodModel {
    _id: string;
    methodName: string;
    available: boolean;
    processTime: number;
}

const Admin = () => {
    const [token, setToken] = React.useState<string | null>(null);
    const [methodList, setMethodList] = React.useState<methodModel[]>([]);
    const socketUrl: string = "ws://localhost:8081/ws"
    const [messageHistory, setMessageHistory] = React.useState([]);
    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    useEffect(() => {
        const token = getTokenFormCookie();

        if (token) {
            setToken(token);
            axios.get('http://localhost:8081/api/listMethod')
                .then((res) => {
                    setMethodList(res.data.data);
                }).catch((err) => {
                    console.log(err.response.data)
                })
        }
    }, [])

    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev) => prev.concat(lastMessage.data));
        }
    }, [lastMessage, setMessageHistory]);


    return (
        <Container>
            <StatusPanel>
                <h1>Status panel</h1>
                <Box>
                    {methodList.map((method) => {
                        return (
                            <ToggleSwitch
                                label={method.methodName}
                                checked={method.available}
                                token={token}
                                methodId={method._id}
                                key={method._id}
                            />
                        )
                    })
                    }
                </Box>

            </StatusPanel>
            <TextPanel>
                <Content>
                    <Backlog messageHistory={messageHistory} />

                </Content>
                <Content>
                    123
                </Content>
            </TextPanel>
        </Container>

    )
}

export default Admin
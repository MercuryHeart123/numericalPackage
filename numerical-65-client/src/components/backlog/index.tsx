import React, { useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const TextArea = styled.textarea<{ readonly?: boolean }>`
    width: 100%;
    height: 100%;
    background-color: white;
    resize: none;
    border: none;
    outline: none;
`

interface BacklogProps {
    messageHistory: never[]
}
const Backlog = (prop: BacklogProps) => {
    const [text, setText] = React.useState<string>('Connecting...\n')
    const ref = React.useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        prop.messageHistory.map((message) => {
            let str = JSON.parse(message)
            setText(text + str + "\n")
        })
        if (ref.current) {
            ref.current.scrollTop = ref.current.scrollHeight

        }
    }, [prop.messageHistory])


    return (
        <Container>
            <TextArea ref={ref} disabled value={text}></TextArea>
        </Container>
    )
}

export default Backlog
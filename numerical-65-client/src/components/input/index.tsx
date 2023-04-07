import React from 'react'
import styled from 'styled-components'
import { addStyles, EditableMathField } from 'react-mathquill'
addStyles()

const Panel = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #e5e5e5;
    width: 500px;
    padding: 20px 20px;
    border-radius: 10px;
`

const Function = styled.div`
    margin: 10px;
`
interface valueInterface {
    keyName: string,
    keyValue: number,
    setKey: (value: number) => void,
}

interface inputInterface {
    equation: {
        latex: string,
        isGx: boolean,
        setLatex: (value: string) => void,
        setEquation: (value: string) => void
    },
    state: valueInterface[],
    calculateFunc: () => void
}
const Input = (props: inputInterface) => {
    return (
        <Panel>
            <Function>
                {!props.equation.isGx && <h4>
                    {'f(x) ='}
                    <EditableMathField
                        style={{ background: 'white', margin: '0 10px' }}
                        latex={props.equation.latex}
                        onChange={(mathField) => {
                            console.log(mathField.latex());

                            props.equation.setLatex(mathField.latex())
                            props.equation.setEquation(mathField.text())
                        }}
                    />
                    {'= 0 '}
                </h4>}

                {props.equation.isGx ? <h4>
                    {'G(x) ='}
                    <EditableMathField
                        style={{ background: 'white', margin: '0 10px' }}
                        latex={props.equation.latex}
                        onChange={(mathField) => {
                            props.equation.setLatex(mathField.latex())
                            props.equation.setEquation(mathField.text())
                        }}
                    />
                    {'= x '}
                </h4> : ""}

            </Function>
            {props.state.length > 0 && props.state.map((data) => {
                return (
                    <div>
                        {data.keyName} = <input type="number" placeholder={`${data.keyValue}`}
                            onChange={(e) => {
                                e.target.value ? data.setKey(Number(e.target.value)) : data.setKey(0)
                            }} />
                    </div>
                )
            })}

            <button style={{ marginTop: '15px' }} onClick={props.calculateFunc}>Calculate</button>
        </Panel>
    )
}

export default Input
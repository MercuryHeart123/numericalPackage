import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Chart from '../../components/chart'
import Input from '../../components/input'
import PreviewChart from '../../components/chart/preview'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 20px 20px;
    border-radius: 10px;
`

const Table = styled.table`
    border-collapse: collapse;

    text-align: center;
`

const Td = styled.td`
    border: 1px solid black;
    padding: 5px;
`

const Tr = styled.tr`
    border: 1px solid black;
    padding: 5px;
`

const Th = styled.th`
    border: 1px solid black;
    padding: 5px;
`


const Newton = () => {
    const [latex, setLatex] = useState('x^2 - 7 ')
    const [equation, setEquation] = useState('x^2 - 7 ')
    const [x0, setX0] = useState(2)
    const [dataTable, setDataTable] = useState<[]>([])
    const [approxTable, setApproxTable] = useState<[]>([])

    const [approximate, setApproximate] = useState(0)

    const calculate = () => {
        setDataTable([])
        console.log(equation);

        axios.post('http://localhost:8081/api/newtonRaphson', {
            latex: equation,
            x0: x0,
        }).then((res) => {
            setApproximate(res.data.data.result)
            setApproxTable(res.data.data.approxValue)
            setDataTable(res.data.data.ans)
        }
        )

    }

    return (
        <Container>
            <h1>
                Newton Raphson
            </h1>
            <Input
                equation={{ latex, setLatex, setEquation, isGx: false }}
                calculateFunc={calculate}
                state={[
                    {
                        keyName: 'x0',
                        keyValue: x0,
                        setKey: setX0
                    }
                ]}
            />
            <h2>
                {`Approximate : ${approximate}`}
            </h2>
            {dataTable.length > 0 &&
                <>
                    <PreviewChart data={approxTable} approxValue={approximate} />

                    <Chart data={dataTable} />
                    <Table>
                        <thead>
                            <Tr>
                                <Th>Iteration</Th>
                                <Th>X0</Th>
                                <Th>Error</Th>
                            </Tr>
                        </thead>
                        <tbody>
                            {dataTable.map((data: { iteration: number, x0: number, error: number }, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{data.iteration}</Td>
                                        <Td>{data.x0}</Td>
                                        <Td>{data.error}</Td>
                                    </Tr>
                                )
                            }
                            )}
                        </tbody>
                    </Table>
                </>

            }
        </Container>
    )
}

export default Newton
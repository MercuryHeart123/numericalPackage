import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Chart from '../../components/chart'
import Input from '../../components/input'

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


const Taylor = () => {
    const [latex, setLatex] = useState('\\log(x)')
    const [equation, setEquation] = useState('log(x)')
    const [x0, setX0] = useState(2)
    const [x, setX] = useState(4)
    const [n, setN] = useState(4)
    const [dataTable, setDataTable] = useState<[]>([])
    const [approximate, setApproximate] = useState(0)
    const calculate = () => {
        axios.post('http://localhost:8081/api/taylor', {
            latex: equation,
            x0: x0,
            x: x,
            n: n
        }).then((res) => {
            setApproximate(res.data.data.result)
            setDataTable(res.data.data.ans)
        }
        )

    }

    return (
        <Container>
            <h1>
                Taylor Series
            </h1>
            <Input
                equation={{ latex, setLatex, setEquation, isGx: false }}
                calculateFunc={calculate}
                state={[
                    {
                        keyName: 'x0',
                        keyValue: x0,
                        setKey: setX0
                    },
                    {
                        keyName: 'X',
                        keyValue: x,
                        setKey: setX
                    },
                    {
                        keyName: 'N',
                        keyValue: n,
                        setKey: setN
                    },
                ]}
            />
            <h2>
                {`Approximate : ${approximate}`}
            </h2>
            {dataTable.length > 0 &&
                <>
                    <Chart data={dataTable} />
                    <Table>
                        <thead>
                            <Tr>
                                <Th>Iteration</Th>
                                <Th>Approximate</Th>
                                <Th>Error</Th>
                            </Tr>
                        </thead>
                        <tbody>
                            {dataTable.map((data: { iteration: number, approximate: number, error: number }, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{data.iteration}</Td>
                                        <Td>{data.approximate}</Td>
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

export default Taylor
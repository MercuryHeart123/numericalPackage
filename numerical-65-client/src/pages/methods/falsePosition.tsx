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


const FalsePosition = () => {
    const [latex, setLatex] = useState('x^2-4')
    const [equation, setEquation] = useState('x^2-4')
    const [xl, setXl] = useState(0)
    const [xr, setXr] = useState(10)
    const [dataTable, setDataTable] = useState<[]>([])
    const [approxTable, setApproxTable] = useState<[]>([])
    const [errorMsg, setErrorMsg] = useState<string>('')

    const [approximate, setApproximate] = useState<number>(0)

    const calculate = () => {


        setDataTable([])
        axios.post('http://localhost:8081/api/falsePosition', {
            latex: equation,
            xl: xl,
            xr: xr
        }).then((res) => {
            setApproximate(res.data.data.result)
            setApproxTable(res.data.data.approxValue)
            setErrorMsg('')
            setDataTable(res.data.data.ans)
        }
        ).catch((err) => {
            console.log(err.response.data.msg)
            setErrorMsg(err.response.data.msg)
        })

    }

    return (
        <Container>
            <h1>
                False Position
            </h1>
            <Input
                equation={{ latex, setLatex, setEquation, isGx: false }}
                calculateFunc={calculate}
                state={[
                    {
                        keyName: 'xl',
                        keyValue: xl,
                        setKey: setXl
                    },
                    {
                        keyName: 'xr',
                        keyValue: xr,
                        setKey: setXr
                    }
                ]}
            />
            {errorMsg !== '' &&
                <h2>
                    {errorMsg}
                </h2>
            }

            {errorMsg === '' && <h2>
                {`Approximate : ${approximate}`}
            </h2>}
            {dataTable.length > 0 &&
                <>
                    <PreviewChart data={approxTable} approxValue={approximate} />
                    <Chart data={dataTable} />
                    <Table>
                        <thead>
                            <Tr>
                                <Th>Iteration</Th>
                                <Th>Xl</Th>
                                <Th>Xr</Th>
                                <Th>Xm</Th>
                                <Th>Error</Th>
                            </Tr>
                        </thead>
                        <tbody>
                            {dataTable.map((data: { iteration: number, xl: number, xr: number, xm: number, error: number }, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{data.iteration}</Td>
                                        <Td>{data.xl}</Td>
                                        <Td>{data.xr}</Td>
                                        <Td>{data.xm}</Td>
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

export default FalsePosition
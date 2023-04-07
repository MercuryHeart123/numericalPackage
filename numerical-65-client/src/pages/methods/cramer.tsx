import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 20px 20px;
    border-radius: 10px;
`



const Cramer = () => {
    const [n, setN] = useState(3)
    const [matrix, setMatrix] = useState<number[][]>([])
    const [vector, setVector] = useState<number[]>([])
    const [result, setResult] = useState<number[]>([])
    const calculate = () => {
        axios.post('http://localhost:8081/api/cramer', {
            matrix,
            vector
        }).then((res) => {
            setResult(res.data.data.result)
        }
        ).catch((err) => {
            console.log(err.response.data.msg);


        }
        )
    }

    const createMatrix = (n: number) => {
        return matrix.map((row, i) => {
            return <div style={{ display: 'flex' }}>
                {row.map((col, j) => {
                    return <input type="number" placeholder={`${matrix[i][j]}`} onChange={(e) => setMatrix(matrix.map((row, k) => {
                        return row.map((col, w) => {
                            if (i === k && j === w) {
                                return Number(e.target.value)
                            }
                            return col
                        })
                    }))} />


                })}
            </div>
        })
    }

    const createMatrixB = (n: number) => {
        return vector.map((row, i) => {
            return <input type="number" placeholder={`${vector[i]}`} onChange={(e) => setVector(vector.map((row, k) => {
                if (i === k) {
                    return Number(e.target.value)
                }
                return row
            }))} />
        })
    }

    useEffect(() => {
        let temp: any = []
        let tempB: any = []
        for (let i = 0; i < n; i++) {
            temp.push([])
            tempB.push(i)
            for (let j = 0; j < n; j++) {
                temp[i].push(j)
            }
        }
        if (n === 3) {
            temp[0][0] = 2
            temp[0][1] = 3
            temp[0][2] = 5
            temp[1][0] = 3
            temp[1][1] = 1
            temp[1][2] = -2
            temp[2][0] = 1
            temp[2][1] = 3
            temp[2][2] = 4

            tempB[0] = 0
            tempB[1] = -2
            tempB[2] = -3
        }

        setMatrix(temp)
        setVector(tempB)
    }, [n])

    return (
        <Container>
            <h1>
                Cramer's Rule
            </h1>
            <h4>
                {'N = '}
                <input type="number" placeholder={`${n}`} onChange={(e) => setN(Number(e.target.value))} />

            </h4>
            <div style={{ width: '100vw', display: 'flex', justifyContent: 'space-around' }}>
                <div>
                    {createMatrix(n)}

                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {createMatrixB(n)}
                </div>

            </div>
            <button onClick={calculate}>Calculate</button>
            <div>
                {result.map((row, i) => {
                    return <div>
                        {`x${i + 1} = ${row}`}
                    </div>
                })}
            </div>
        </Container>

    )
}

export default Cramer
import React from 'react'
import { methodsInterface } from '../App'
import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
const Container = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`

const MethodsPanel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 10px;
`
const NavLink = styled(Link)`
    color: Black;

    text-decoration: none;
`

const EachMethod = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    
`


interface homeInterface {
    allMethods: methodsInterface[]
}
function Home(props: homeInterface) {
    return (
        <Container>
            <h1>
                Methods available
            </h1>
            <MethodsPanel>
                {props.allMethods.length > 0 &&
                    props.allMethods.map((data: methodsInterface) => {
                        console.log(data);

                        return <EachMethod style={{ display: 'flex', justifyContent: 'space-between', width: '50%' }}>
                            <NavLink to={`/methods/${data.methodName}`}>
                                {data.methodName}

                            </NavLink>
                            <div style={{
                                color: data.available ? "green" : "red"
                            }}>
                                {data.available ? "active" : "inactive"}
                            </div>
                        </EachMethod>
                    })}

            </MethodsPanel>

        </Container>
    )
}

export default Home
import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { loginProps } from '../../../components/interface'

const LoginContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`
const LoginContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 500px;
    height: 100%;
    max-height: 500px;
    padding: 20px 20px;
    border-radius: 10px;
`

const LoginOrRegister = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 20px 0;
`

const LoginInput = styled.input`
    width: 100%;
    padding: 10px 10px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    background-color: #f5f5f5;
`

const LoginButton = styled.button<{ hover?: boolean; action?: boolean }>`
    width: 100%;
    padding: 10px 10px;
    margin: 10px 20px;
    border: ${({ action }) => (action ? '1px solid black' : 'none')};
    border-radius: 5px;
    background-color: ${({ action }) => (action ? '#e5e5e5' : '#f5f5f5')};
    cursor: pointer;
    ${({ hover }) => (hover ? `&:hover { background-color: #e5e5e5; }` : '')}

`
interface LoginFrom {
    username: string;
    password: string;
    cpassword?: string;
}

const Login = (prop: loginProps) => {
    const [action, setAction] = React.useState<'login' | 'register'>('login')

    const swapAction = (action: 'login' | 'register') => {
        setAction(action)
    }

    const handleSubmit = (event: any) => {
        event.preventDefault()
        let username = event.target.username.value;
        let password = event.target.password.value;
        let data: LoginFrom
        if (action == 'login') {
            data = {
                username: username,
                password: password
            }
            axios.post('http://localhost:8081/auth/login', data
            ).then((res) => {
                prop.setUserName(res.data.data.username)
                prop.setIsAdmin(res.data.data.isAdmin)
                const cookies = new Cookies();
                cookies.set('numericalToken', res.data.data.token, { path: '/' });

            }
            ).catch((err) => {
                console.log(err.response.data)
            })
        } else {
            let cpassword = event.target.cpassword.value;
            data = {
                username: username,
                password: password
            }
            if (password == cpassword) {
                axios.post('http://localhost:8081/auth/register', data
                ).then((res) => {
                    console.log(res.data)
                }
                ).catch((err) => {
                    console.log(err.response.data)
                })
            } else {
                alert('Password and Confirm Password not match')
            }
        }
    }

    return (
        <LoginContainer>
            <LoginContent>
                <LoginOrRegister>
                    <LoginButton hover action={action == "login" ? true : false} onClick={() => swapAction('login')}>Login</LoginButton>
                    <LoginButton hover action={action == "register" ? true : false} onClick={() => swapAction('register')}>Register</LoginButton>
                </LoginOrRegister>
                <form onSubmit={handleSubmit}>
                    {action == "login" && <>
                        <LoginInput name='username' placeholder="Username" />
                        <LoginInput type='password' name='password' placeholder="Password" />
                        <LoginButton type='submit'>Login</LoginButton>
                    </>}
                    {action == "register" && <>
                        <LoginInput name='username' placeholder="Username" />
                        <LoginInput type='password' name='password' placeholder="Password" />
                        <LoginInput type='password' name='cpassword' placeholder="Confirm Password" />
                        <LoginButton type='submit'>Register</LoginButton>
                    </>}
                </form>
            </LoginContent>
        </LoginContainer>
    )
}

export default Login
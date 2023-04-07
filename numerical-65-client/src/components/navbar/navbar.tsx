import React from 'react'
import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import { loginProps } from '../interface';
import Cookies from 'universal-cookie'

const NavContainer = styled.section`
    font-size: 1.1rem;
    height: 7%;
    background-color: #e5e5e5;
`

const NavContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const NavItem = styled.div<{ width?: string }>`
    width: ${({ width }) => (width ? width : '')};
    margin: 10px 25px;
    display: flex;
`

const NavLogo = styled(Link)`
    font-size: 1.4rem;
    color: Black;
    text-decoration: none;
`

const NavLink = styled(Link)`
    color: Black;
    padding: 0 5px;
    margin: 0 50px;
    text-decoration: none;
`

const NavText = styled.div`
    color: Black;
    padding: 0 5px;
    margin: 0 50px;
    text-decoration: none;
    cursor: pointer;
`

const NavSearch = styled.input`
    text-align: center;
    color: Black;
    width: 100%;
    padding: 5px 5px;
`


const Navbar = (prop: loginProps) => {
    const destroyCookie = () => {
        const cookies = new Cookies();
        cookies.remove('numericalToken');
        prop.setUserName('');
        prop.setIsAdmin(false);
    }

    return (
        <NavContainer>
            <NavContent>
                <NavItem>
                    <NavLogo to='/'>
                        Numerical Method
                    </NavLogo>
                </NavItem>

                <NavItem width='33%'>
                    <NavSearch placeholder="Method search..." />
                </NavItem>

                <NavItem>
                    {prop.username ? <NavLink to='/history'>History</NavLink> : ''}
                    {prop.isAdmin ? <NavLink to='/admin'>Admin</NavLink> : ''}
                    {prop.username ? <NavText onClick={destroyCookie}>Logout</NavText> : <NavLink to='/login'>Login</NavLink>}

                </NavItem>

            </NavContent>
        </NavContainer>
    )
}

export default Navbar
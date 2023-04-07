
import axios from "axios";
import React from "react";
import styled from "styled-components";
import { getHeaders } from "../../utill/cookieUtill";

const Box = styled.div`
    border-top: 1px solid black;
`

const Container = styled.div`
    display: flex;
    justify-content: space-between; 
    align-items: center;
    margin: 10px 5px;
`
const Toggle_Switch = styled.div`
    position: relative;
    width: 75px;
    display: inline-block;
    text-align: left;

`

const Checkbox = styled.input`
    display: none;
    &:checked + .label .inner {
        margin-left: 0;
    }
    &:checked + .label .switch {
        right: 0px;
    }
`

const Label = styled.label`
    display: block;
    overflow: hidden;
    cursor: pointer;
    border: 0 solid #bbb;
    border-radius: 20px;
`

const Inner = styled.span`
    display: block;
    width: 200%;
    margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
    &:before, &:after {
        float: left;
        width: 50%;
        height: 36px;
        padding: 0;
        line-height: 36px;
        color: #fff;
        font-weight: bold;
        box-sizing: border-box;
    }
    &:before {
        content: "YES";
        padding-left: 10px;
        background-color: #060;
        color: #fff;
    }
    &:after {
        content: "NO";
        padding-right: 10px;
        background-color: #900;
        color: #fff;
        text-align: right;
    }
`

const Switch = styled.span`
    display: block;
    width: 24px;
    margin: 5px;
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    border: 0 solid #bbb;
    border-radius: 20px;
    transition: all 0.3s ease-in 0s;
`

interface Props {
    label: string;
    checked: boolean;
    token: string | null;
    methodId: string;
}

const ToggleSwitch = (prop: Props) => {
    const ref = React.useRef<HTMLInputElement | null>(null);
    const [checked, setChecked] = React.useState<boolean>(prop.checked);

    const handleClick = () => {
        if (ref.current) {
            ref.current.click();
        }
    }

    const handleChecked = () => {
        let token = prop.token;
        let methodId = prop.methodId;

        axios.post(`http://localhost:8081/api/updateMethodById`, {
            methodId: methodId,
            available: !checked
        }, getHeaders(token),)
            .then(res => {
                console.log(res);
                setChecked(!checked);

            }).catch(err => {
                console.log(err);
            })

    }


    return (
        <Box>
            <Container>
                {prop.label}{" "}
                <Toggle_Switch>
                    <Checkbox
                        type="checkbox"
                        ref={ref}
                        checked={checked}
                        onClick={handleChecked}
                        name={prop.label} id={prop.label} />
                    <Label className="label" onClick={handleClick}>
                        <Inner className="inner" />
                        <Switch className="switch" />
                    </Label>
                </Toggle_Switch>
            </Container>
        </Box>

    );
};

export default ToggleSwitch;
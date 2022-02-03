import React, { useState, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components'

import { Fingerprint } from '../Fingerprint'

const Container = styled.div`
    background-color: #1563ff;
    height: 250px;
    width: 100%;
    position: absolute;
    bottom: -25px;
    z-index: 300;
    border-radius: 50px/25px;
    box-sizing: border-box;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;

    ${props => props.show ? css`
        animation: ${slideUp} 0.3s;
        animation-timing-function: ease-out;
    ` : css`
        animation: ${slideDown} 0.2s;
        animation-timing-function: ease-in;
    `}
`

const Confirm = styled.div`
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    color: #ffffff;
    font-weight: 700;
    text-align: center;
    max-width: 50%;
`

const slideUp = keyframes`
    0% {
        height: 0px;
    }

    100% {
        height: 250px;
    }
`

const slideDown = keyframes`
    0% {
        height: 250px;
    }

    100% {
        height: 0px;
    }
`

export const Payment = ({ show, setShow, setPaid }) => {
    const [shouldRender, setRender] = useState(show)

    useEffect(() => {
        if (show) setRender(true)
    }, [show])

    const onAnimationEnd = () => {
        if (!show) setRender(false)
    }

    return (
        shouldRender && (
            <Container show={show} onAnimationEnd={onAnimationEnd}>
                <Confirm>Confirm your purchase</Confirm>
                <Fingerprint onValidate={() => {
                    setPaid(true)
                    setShow(false)
                }} />
            </Container>
        )
    )
}
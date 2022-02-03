import React, { useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { useHistory } from "react-router-dom";

import { useCarousel } from '../../hooks/Carousel'

import { Payment } from '../Payment'

const Container = styled.div`
    position: relative;
    overflow: hidden;
    overscroll-behavior: none;
    text-align: center;
`

const slide = (props) => keyframes`
    0% {
        left: -${(props.length+2)*100}%;
    }    

    100% {
        left: 0%;
    }
`

const Name = styled.div`
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-weight: 700;
    text-transform: Capitalize;
    text-align: center;
    transform: translateY(100px);
`

const Buy = styled.div`
    box-sizing: border-box;
    font-weight: 600;
    border: 1px solid;
    border-radius: 50px;
    padding: 11px 24px;
    text-align: center;
    display: inline-block;
    width: 90px;
    background: #1563ff;
    border-color: #1563ff;
    color: #ffffff;
    margin: 20px auto 0 auto;
    transform: translateY(100px);
    ${props => props.ready && css`
        animation-name: ${animateBuy};
        animation-duration: 0.3s;
        animation-delay: 0.1s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        animation-timing-function: linear;
    `}

    ${props => props.paid && css`
        background: #ffcc00;
    `}
`

const Item = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    ${Name} {
        ${props => props.active && props.ready && css`
            animation-name: ${animateTitle};
            animation-duration: 0.3s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
            animation-timing-function: linear;
        `}
    }
`

const Image = styled.div`
    ${props => props.src && css`
        background-image: url(${props.src});
    `}

    background-size: auto 360px;
    background-repeat: no-repeat;
    background-position: center 80px;
    width: 100%;
    height: 500px;
`

const animateTitle = keyframes`
    0% {
        transform: translateY(50px);
    }

    100% {
        transform: translateY(0);
    }
`

const animateBuy = keyframes`
    0% {
        transform: translateY(80px);
    }

    100% {
        transform: translateY(0);
    }
`

const Items = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow: hidden;
    position: relative;

    animation-name: ${slide};
    animation-delay: 1s;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
    overscroll-behavior: none;
`


const createItem = ({ id, name, image }, active, ready) => (
    <Item key={id} active={active} ready={ready}>
        <Image alt={name} src={`${process.env.PUBLIC_URL}/img${image}`} />
        <Name>{name}</Name>
    </Item>
)

export const Slider = ({ className, items }) => {
    // Because circleci chokes on JS warnings, we have to use this nasty syntax to get around it.
    const [active, , handlers, style] = useCarousel(items.length, -1)
    let history = useHistory();

    const [ready, setReady] = useState(false)
    const [showPayment, setShowPayment] = useState(false)

    const [paid, setPaid] = useState(false)

    const onAnimationEnd = () => {
        if (!ready) setReady(true)
    }

    return (
        <>
            <Container className={className}>
                <Items {...handlers} style={style} length={items.length} onAnimationEnd={onAnimationEnd}>
                    {createItem(items[items.length - 1], false, ready)}
                    {items.map((item, index) => createItem(item, active === index, ready))}
                    {createItem(items[0], false, ready)}
                </Items>
                <Buy ready={ready} onClick={() => history.push("/payments")} paid={paid}>Buy</Buy>
            </Container>
            <Payment show={showPayment} setShow={setShowPayment} setPaid={setPaid} />
        </>
    )
}
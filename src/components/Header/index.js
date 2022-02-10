import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes, css } from 'styled-components'

const Logo = styled.div`
    position: absolute;
    top: calc(50% - 109px);
    width: 100px;
    z-index: 100; 

    svg {
        fill: #fff;
    }
`

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background: #000000;
    width: 100%;
    height: 100%;
    z-index: 1;
`

const animateLogo = keyframes`
    0% {
        top: calc(50% - 109px);
        width: 100px;
    }

    33% {
        top: 20px;
        width: 50px;
    }

    100% {
        top: 20px;
        width: 50px;
    }
`

const animateColor = keyframes`
    0% {
        fill: #fff;
    }

    66% {
        fill: #fff;
    }

    100% {
        fill: #000;
    }
`

const animateOverlay = keyframes`
    0% {
        height: 100%;
    }    

    50% {
        height: 100%;
    }

    75% {
        height: 0%;
    }

    100% {
        height: 0%;
    }
`

const animateHeader = keyframes`
    0% {
        min-height: 100%;
    }    

    50% {
        min-height: 100%;
    }

    75% {
        min-height: 90px;
    }

    100% {
        min-height: 90px;
    }
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    background: #ffffff;
    min-height: 100%;
    overflow: hidden;
    z-index: 10;
    width: 100%;

    ${Logo} {
        svg {
            ${props => !props.loading && css`
                animation-name: ${animateColor};
                animation-duration: 2s;
                animation-iteration-count: 1;
                animation-fill-mode: forwards;
                animation-timing-function: ease-in;
            `}
        }
    
        ${props => !props.loading && css`
            animation-name: ${animateLogo};
            animation-duration: 2s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
            animation-timing-function: ease-in-out;
        `}
    }

    ${Overlay} {
        ${props => !props.loading && css`
            animation-name: ${animateOverlay};
            animation-duration: 2s;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
            animation-timing-function: ease-in;
        `}
    }

    ${props => !props.loading && css`
        animation-name: ${animateHeader};
        animation-duration: 2s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        animation-timing-function: ease-in;
    `}
`

export const Header = ({ loading }) => {

    useEffect(() => {
        document.title = 'Hashicups'
    })

    return (
        <Container loading={loading ? 1 : 0}>
            <Logo>
                <svg id="logo_image" viewBox="0 0 33 36">
                    <g id="logo_path"><path d="M20 26.7l5.4-3V3.2L20 0v15.3h-6.9v-6l-5.5 3v20.5l5.5 3.2V20.7H20z" />
                        <path d="M28 4.6v20.8l-8 4.4V36l13-7.5v-21zM13.1 0L0 7.5v21l5.1 2.9V10.6l8-4.4z" />
                    </g>
                </svg>
            </Logo>
              HashiCups #2
            <Overlay />
        </Container>
    )
}

Header.propTypes = {
    loading: PropTypes.bool
}

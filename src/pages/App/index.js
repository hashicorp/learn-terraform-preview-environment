import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import styled from 'styled-components'

import { Header } from '../../components/Header'
import { Slider } from '../../components/Slider'
import { Container } from '@material-ui/core';
import Payment from '../Payment'

const QUERY_coffees = gql`
{
    coffees {
        id
        name
        image
        price
    }
}
`

const Coffees = styled(Slider)`
    position: fixed;
    top: 90px;
    width: 100%;
`



const App = () => {
    const { loading, error, data } = useQuery(QUERY_coffees)

    console.log(error)

    if (error) return <p>Error :(</p>

    return (
        <Router>
            <Switch>
                <Route path="/payments">
                    <Header loading={loading} />
                    <Container style={{ paddingTop: "5em" }}>
                        <Payment />
                    </Container>
                </Route>
                <Route path="/">
                    <Header loading={loading} />
                    {!loading &&
                        <Coffees items={data.coffees} />
                    }
                </Route>
            </Switch>
        </Router>
    )
}

export default App
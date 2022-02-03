import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/App'

import * as serviceWorker from './serviceWorker'

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'

let publicApiUrl = ""

if (process.env.REACT_APP_PUBLIC_API_URL) {
    publicApiUrl = process.env.REACT_APP_PUBLIC_API_URL
}

const httpLink = createHttpLink({
    uri: `${publicApiUrl}/api`,
})

console.log(`API: ${publicApiUrl}`)

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

const root = (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)

ReactDOM.render(root, document.getElementById('root'))
serviceWorker.unregister()

import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import NoMatch from './components/NoMatch'
import Layout from './components/Layout'
import Products from './components/Products'

import './App.scss'
import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

const App = () => (
  <BrowserRouter>
    <Layout className="layout">
      <Switch>
        <Route path="/" component={Products} />
        <Route component={NoMatch} />
      </Switch>
    </Layout>
  </BrowserRouter>
)

export default App

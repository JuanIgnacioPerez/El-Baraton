import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Footer from './Footer'

import './Layout.scss'

const Layout = ({ children }) => (
  <Fragment>
    <Header />
    <main role="main">{children}</main>
    <Footer />
  </Fragment>
)

Layout.propTypes = {
  children: PropTypes.element.isRequired
}

export default Layout

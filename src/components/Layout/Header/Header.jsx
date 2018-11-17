import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { InputText } from 'primereact/inputtext'

import logo from '../../../assets/baraton.png'
import picture from '../../../assets/picture.svg'
import garbage from '../../../assets/garbage.svg'
import shoppingBag from '../../../assets/shopping-bag.svg'
import empty from '../../../assets/bag-empty.svg'

import { addProductToCart, removeProductFromCart } from '../../Products/Cart-reducer'

import './Header.scss'

class Header extends Component {
  constructor(props) {
    super(props)
    this.header = React.createRef()
    this.cartListRef = React.createRef()
    this.state = {
      showCart: false,
      isSticky: false,
      cart: this.props.cartItems
    }
  }

  componentDidMount() {
    const header = this.header.current

    window.addEventListener('scroll', () => {
      const { scrollY } = window
      if (scrollY >= header.offsetHeight) {
        this.setState({
          isSticky: true
        })
      } else {
        this.setState({
          isSticky: false
        })
      }
    })
  }

  handleCart(e) {
    e.preventDefault()

    this.setState({
      showCart: !this.state.showCart
    })

    const cartListRef = this.cartListRef.current

    const mouseDownListener = document.addEventListener('mousedown', ({ target }) => {
      if (!cartListRef.contains(target)) {
        this.setState({
          showCart: false
        })
        document.removeEventListener('mousedown', mouseDownListener)
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  formatCurrency(total) {
    return total.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
  }

  getCartTotal(items) {
    return items.reduce(
      ({ total }, item) => ({
        total: (total + parseInt(item.price.replace(',', ''), 0)) * item.total
      }),
      {
        total: 0
      }
    )
  }

  render() {
    const { isSticky } = this.state
    const { cartItems, addProductToCart, removeProductFromCart } = this.props
    const cartTotal = this.getCartTotal(cartItems)

    return (
      <header>
        <div className={`header ${isSticky ? 'sticky' : ''}`} ref={this.header}>
          <div className="header__logo">
            <div className="header__brand">
              <img className="header__logo-image" src={logo} alt="El baraton Logo" />
            </div>
          </div>
          <div className="header__actions">
            <div className="header__shopping">
              <a className="header__shopping-icon" href="/" onClick={this.handleCart.bind(this)}>
                <img className="header__shopping-icon-bag" src={shoppingBag} alt="Cart" />
                <span className="header__shopping-icon-badge">{cartItems.length || 0}</span>
              </a>
              <div
                className={
                  this.state.showCart
                    ? 'header__shopping-preview active'
                    : 'header__shopping-preview'
                }
              >
                <div>
                  <ul className="header__items-box" ref={this.cartListRef}>
                    {cartItems.length > 0 &&
                      cartItems.map(product => (
                        <li className="header__product" key={product.id}>
                          <img className="header__product-image" src={picture} alt={product.name} />
                          <div className="header__product-info">
                            <p className="header__product-name">{product.name}</p>
                            <p className="header__product-price">{product.price}</p>
                          </div>

                          <div className="counter">
                            <button
                              type="button"
                              className="counter__decrement"
                              onClick={() => removeProductFromCart(product)}
                            >
                              –
                            </button>
                            <div className="counter__input">
                              <InputText
                                className="counter__quantity"
                                value={product.total || 0}
                                disabled={true}
                              />
                            </div>
                            <button
                              type="button"
                              className="counter__increment"
                              onClick={() => addProductToCart(product)}
                            >
                              +
                            </button>
                          </div>

                          <button
                            className="header__product-remove"
                            onClick={() => removeProductFromCart(product, true)}
                          >
                            <img src={garbage} alt="garbage" />
                          </button>
                        </li>
                      ))}
                    {cartItems.length <= 0 && (
                      <div className="header__empty">
                        <img src={empty} alt="empty-cart" className="header__empty-bag" />
                        <p className="header__empty-text">No tienes productos en tu carrito!</p>
                      </div>
                    )}
                  </ul>
                </div>
                <div className="header__bottom">
                  <p className="header__bottom-total">
                    Total: <span>$ {this.formatCurrency(cartTotal.total)}</span>
                  </p>
                  <button type="button" className={cartItems.length > 0 ? ' ' : 'disabled'}>
                    Proceder con el pago
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  cartItems: PropTypes.instanceOf(Array).isRequired,
  addProductToCart: PropTypes.func.isRequired,
  removeProductFromCart: PropTypes.func.isRequired
}

const mapStateToProps = ({ cart }) => ({
  cartItems: cart.list
})

export default connect(
  mapStateToProps,
  { addProductToCart, removeProductFromCart }
)(Header)

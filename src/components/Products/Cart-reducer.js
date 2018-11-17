import { getCart, saveCart } from '../../services/products-service'

// Constants
const FETCH_CART = 'FETCH_CART'
const ERROR = 'ERROR'
const LOAD_CART = 'LOAD_CART'
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const REMOVE_PRODUCT_TO_CART = 'REMOVE_PRODUCT_TO_CART'

// Initial State
const initialState = {
  list: [],
  loading: false,
  error: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CART:
      return { ...state, loading: true, error: null }
    case ERROR:
      return { ...state, loading: false, error: payload }
    case LOAD_CART:
      return { list: [...payload], loading: false, error: null }
    case ADD_PRODUCT_TO_CART:
      return { list: [...payload], loading: false, error: null }
    case REMOVE_PRODUCT_TO_CART:
      return { list: [...payload], loading: false, error: null }
    default:
      return state
  }
}

// actions
export const fetchCart = () => ({ type: FETCH_CART })
export const loadCart = payload => ({ type: LOAD_CART, payload })
export const addToCart = payload => ({ type: ADD_PRODUCT_TO_CART, payload })
export const removeFromCart = payload => ({ type: REMOVE_PRODUCT_TO_CART, payload })
export const loadError = payload => ({ type: ERROR, payload })

export const initCart = () => {
  return dispatch => {
    dispatch(fetchCart())
    const cartItems = getCart()
    if (cartItems.length <= 0) {
      saveCart(cartItems)
    }
    dispatch(loadCart(cartItems))
  }
}

export const addProductToCart = product => {
  return dispatch => {
    dispatch(fetchCart())

    const cartItems = getCart()
    let mappedItems = []
    const check = cartItems.every(p => p.id !== product.id)

    if (check) {
      const mappedProduct = { ...product, total: 1 }
      mappedItems = [...cartItems, mappedProduct]
    } else {
      mappedItems = cartItems.map(p => {
        if (p.id === product.id) {
          p.total = p.total + 1
        }
        return p
      })
    }

    saveCart(mappedItems)
    dispatch(addToCart(mappedItems))
  }
}

export const removeProductFromCart = (product, all = false) => {
  return dispatch => {
    dispatch(fetchCart())

    const cartItems = getCart()
    let mappedItems = []

    if (product.total <= 1 || all) {
      mappedItems = cartItems.filter(p => p.id !== product.id)
    } else {
      mappedItems = cartItems.map(p => {
        if (p.id === product.id) {
          p.total = p.total - 1
        }
        return p
      })
    }

    saveCart(mappedItems)
    dispatch(addToCart(mappedItems))
  }
}

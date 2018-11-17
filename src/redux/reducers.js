import { combineReducers } from 'redux'
import products from '../components/Products/Products-reducer'
import categories from '../components/Products/Categories-reducer'
import cart from '../components/Products/Cart-reducer'

const reducers = {
  products,
  categories,
  cart
}

export default combineReducers(reducers)

import { getProducts, filterProducts, sortProducts } from '../../services/products-service'

// Constants
const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
const ERROR = 'ERROR'
const LOAD_PRODUCTS = 'LOAD_PRODUCTS'

// Initial State
const initialState = {
  list: [],
  loading: false,
  error: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_PRODUCTS:
      return { ...state, loading: true, error: null }
    case ERROR:
      return { ...state, loading: false, error: payload }
    case LOAD_PRODUCTS:
      return { list: [...payload], loading: false, error: null }
    default:
      return state
  }
}

// actions
export const fetchProductList = () => ({ type: FETCH_PRODUCTS })
export const loadProductList = payload => ({ type: LOAD_PRODUCTS, payload })
export const loadError = payload => ({ type: ERROR, payload })

export const fetchProducts = ({ query = null, sortBy = '' }) => {
  return dispatch => {
    dispatch(fetchProductList())
    getProducts()
      .then(response => {
        let products = response.data.products

        if (!!query) {
          products = filterProducts({ products, query })
        }

        if (sortBy.length > 0) {
          products = sortProducts({ products, sortBy })
        }

        dispatch(loadProductList(products))
      })
      .catch(error => {
        dispatch(loadError(error))
      })
  }
}

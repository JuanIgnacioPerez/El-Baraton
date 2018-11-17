import { getCategories } from '../../services/products-service'

// Constants
const FETCH_CATEGORIES = 'FETCH_CATEGORIES'
const ERROR = 'ERROR'
const LOAD_CATEGORIES = 'LOAD_CATEGORIES'

// Initial State
const initialState = {
  list: [],
  loading: false,
  error: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CATEGORIES:
      return { ...state, loading: true, error: null }
    case ERROR:
      return { ...state, loading: false, error: payload }
    case LOAD_CATEGORIES:
      return { list: [...payload], loading: false, error: null }
    default:
      return state
  }
}

// actions
export const fetchCategoryList = () => ({ type: FETCH_CATEGORIES })
export const loadCategoryList = payload => ({ type: LOAD_CATEGORIES, payload })
export const loadError = payload => ({ type: ERROR, payload })

export const fetchCategories = () => {
  return dispatch => {
    dispatch(fetchCategoryList())
    getCategories()
      .then(response => {
        dispatch(loadCategoryList(response.data.categories))
      })
      .catch(error => {
        dispatch(loadError(error))
      })
  }
}

import axios from 'axios'

const API = '/api'

export const getProducts = () => axios.get(`${API}/products.json`)
export const getCategories = () => axios.get(`${API}/categories.json`)

export const filterProducts = ({ products, query }) => {
  let filtered = products

  if (!!query) {
    const fields = Object.keys(query)

    filtered = fields.reduce((acc, key) => {
      const match = key === 'price' ? parseInt(query[key], 0).toString() : query[key]

      return !!query[key]
        ? [
            ...acc,
            ...products.filter(product => {
              const productMatch = key === 'price' ? product[key].replace(',', '') : product[key]
              return key === 'price'
                ?  productMatch.match(new RegExp(`${match}`, 'g'))
                : new RegExp(`${productMatch}`, 'g').test(match)
            })
          ]
        : filtered
    }, [])
  }

  return filtered
}

export const sortProducts = ({ products, sortBy }) => {
  let sorted = products

  switch (sortBy) {
    case 'available':
      sorted = sorted.sort((a, b) => (a.available === b.available ? 0 : a.available ? -1 : 1))
      break
    case 'quantity':
      sorted = sorted.sort((a, b) => b.quantity - a.quantity)
      break
    default:
      sorted = sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      break
  }
  return sorted
}

export const saveCart = cart => localStorage.setItem('cart', JSON.stringify(cart || []))
export const getCart = () => JSON.parse(localStorage.getItem('cart')) || []

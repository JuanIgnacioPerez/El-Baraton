import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchProducts } from './Products-reducer'
import { fetchCategories } from './Categories-reducer'
import { initCart, addProductToCart } from './Cart-reducer'
import SearchPanel from './SearchPanel'
import picture from '../../assets/picture.svg'

import './Products.scss'

class Products extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      productList: [],
      sortOptions: [
        { label: 'Precio', value: 'price' },
        { label: 'Disponibilidad', value: 'available' },
        { label: 'Cantidad', value: 'quantity' }
      ],
      filters: {
        query: null,
        sortBy: ''
      }
    }
  }

  componentDidMount() {
    const { fetchProducts, fetchCategories, initCart } = this.props
    fetchProducts({})
    fetchCategories()
    initCart()
  }

  filterResults(query) {
    const { fetchProducts } = this.props
    fetchProducts({ query })
  }

  sortResults(sortBy) {
    const { fetchProducts } = this.props
    fetchProducts({ sortBy })
  }

  setCategoryAction(category) {
    return {
      ...category,
      command: () => this.filterResults({ sublevel_id: category.id })
    }
  }

  mapCategories(categories) {
    return categories.map(cat => this.setCategoryAction(cat))
  }

  render() {
    const { products, categories, addProductToCart } = this.props
    const { sortOptions } = this.state

    let mappedCategories

    if (categories.length > 0) {
      mappedCategories = this.mapCategories(categories)
    }

    return (
      <div className="products">
        <div className="row">
          <div className="col-md-3">
            <SearchPanel
              categories={mappedCategories}
              {...{ sortOptions }}
              filterResults={this.filterResults.bind(this)}
              sortResults={this.sortResults.bind(this)}
            />
          </div>
          <div className="col-md-9">
            <div className="products__box">
              {products.length &&
                products.map(product => (
                  <div className="products__item" key={product.id}>
                    {' '}
                    <div className="products__item-image">
                      <img src={picture} alt="item" />
                    </div>
                    <h4 className="products__item-name">{product.name}</h4>
                    <p className="products__item-price">{product.price}</p>
                    <div className="products__item-action">
                      <button
                        className="products__item-button"
                        type="button"
                        onClick={() => addProductToCart(product)}
                      >
                        {' '}
                        Añadir al carrito
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Products.propTypes = {
  products: PropTypes.instanceOf(Array).isRequired,
  categories: PropTypes.instanceOf(Array).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  initCart: PropTypes.func.isRequired,
  addProductToCart: PropTypes.func.isRequired
}

Products.defaultProps = {
  loading: false
}

const mapStateToProps = ({ products, categories }) => ({
  products: products.list,
  categories: categories.list,
  loading: products.loading
})

export default connect(
  mapStateToProps,
  { fetchProducts, fetchCategories, initCart, addProductToCart }
)(Products)

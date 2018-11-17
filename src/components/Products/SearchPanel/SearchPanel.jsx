import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { PanelMenu } from 'primereact/panelmenu'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Checkbox } from 'primereact/checkbox'

import './SearchPanel.scss'

class SearchPanel extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      query: null,
      sortBy: ''
    }
  }

  sort(sortBy) {
    const { sortResults } = this.props

    this.setState({ sortBy })

    sortResults(sortBy)
  }

  filter(query) {
    const { filterResults } = this.props

    this.setState({
      query: {
        ...this.state.query,
        ...query
      }
    })

    filterResults(query)
  }

  render() {
    const { sortOptions, categories } = this.props
    const { query, sortBy } = this.state
    return (
      <div className="panel">
        <form autoComplete="off" role="search">
          <div className="panel__info">
            <p> Utiliza los filtros para encontrar tu producto facilmente</p>
          </div>
          <div className="panel__section">
            <label>Filtrar por disponibilidad </label>
            <Checkbox
              onChange={e => this.filter({ available: e.checked })}
              checked={query && query.available}
            />
          </div>
          <div className="panel__section">
            <label>Filtrar por precio </label>
            <InputText
              type="number"
              placeholder="Ej: 20000"
              value={query && query.price ? query.price : ''}
              onChange={e => this.filter({ price: e.target.value })}
            />
          </div>
          <div className="panel__section">
            <label>Ordenar por </label>
            <Dropdown
              placeholder="Seleccione un valor"
              value={sortBy || ''}
              options={sortOptions}
              autoWidth={false}
              onChange={e => this.sort(e.value)}
            />
          </div>
        </form>
        <div className="panel__section panel__section-menu">
          <PanelMenu model={categories} />
        </div>
      </div>
    )
  }
}

SearchPanel.propTypes = {
  filterResults: PropTypes.func.isRequired,
  sortResults: PropTypes.func.isRequired,
  sortOptions: PropTypes.instanceOf(Array).isRequired
}

export default SearchPanel

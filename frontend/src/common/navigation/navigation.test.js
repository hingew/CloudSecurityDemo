import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import Navigation from './index'

let container = null

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

describe('Navigation Container component', () => {
  it('should have propTypes', () => {
    expect(Navigation.Container.propTypes).not.toBeUndefined()
  })
  it('renders without props', () => {
    act(() => {
      render(<Navigation.Container />, container)
    })
    expect(container.firstChild).toHaveClass('flex flex-shrink-0')
  })
})

describe('Navigation item component', () => {
  it('should have propTypes and default props', () => {
    expect(Navigation.Item.defaultProps).not.toBeUndefined()
    expect(Navigation.Item.propTypes).not.toBeUndefined()
  })
})

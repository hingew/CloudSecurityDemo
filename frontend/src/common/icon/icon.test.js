import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import Icon from './index'

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

describe('Icon component', () => {
  it('should have propTypes and defaultProps', () => {
    expect(Icon.defaultProps).not.toBeUndefined()
    expect(Icon.propTypes).not.toBeUndefined()
  })
  it('renders with and without props', () => {
    act(() => {
      render(<Icon />, container)
    })
    expect(container.children.length).toBe(0)
  })
})

import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import Video from './index'

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

describe('Navigation component', () => {
  it('should have propTypes and defaultProps', () => {
    expect(Video.defaultProps).not.toBeUndefined()
    expect(Video.propTypes).not.toBeUndefined()
  })
  it('renders without props', () => {
    act(() => {
      render(<Video />, container)
    })
    expect(container.firstChild).toHaveClass('w-full mb-4')
  })
})

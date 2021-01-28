import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import Loading from './index'

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

describe('Loading component', () => {
  it('renders without props', () => {
    act(() => {
      render(<Loading />, container)
    })

    expect(container.firstChild).toHaveClass('w-full  text-center my-8')
  })
})

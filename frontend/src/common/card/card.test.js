import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import Card from './index'

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

describe('Card component', () => {
  it('should have propTypes and defaultProps', () => {
    expect(Card.defaultProps).not.toBeUndefined()
    expect(Card.propTypes).not.toBeUndefined()
  })
  it('renders with and without props', () => {
    act(() => {
      render(<Card />, container)
    })
    const card = container.firstChild
    expect(card).toHaveClass('my-2')
    expect(card.firstChild).toHaveClass('relative bg-white rounded-lg shadow-sm')
    expect(card.firstChild.children.length).toBe(4)
  })

  it('should render the title component correctly', () => {
    act(() => {
      render(<Card author={{ username: 'Peter', name: 'Peter' }} createdAt={new Date().toDateString()} />, container)
    })
    const title = container.firstChild.firstChild.children[0]
    expect(title.querySelector('h3.text-gray-900').textContent).toBe('Peter')
    expect(title.querySelector('p.mt-1.text-gray-500.text-sm.truncate').textContent).toBe('@Peter')
  })

  it('should render the media component correctly', () => {
    act(() => {
      render(<Card media={null} />, container)
    })
    const media = container.firstChild.firstChild.children[1]
    expect(media).toHaveClass('px-4 mb-4 relative')
  })

  it('should render the content component correctly', () => {
    act(() => {
      render(<Card text={null} />, container)
    })

    act(() => {
      render(<Card text='Hello world' />, container)
    })
    const content = container.firstChild.firstChild.children[2]
    expect(content).toHaveClass('px-4 mb-4 relative')
    expect(content.firstChild).toHaveClass('text-medium text-gray-800')
    expect(content.firstChild).toHaveTextContent('Hello world')
  })

  it('should render the metrics component correctly', () => {
    act(() => {
      render(<Card public_metrics={null} />, container)
    })
    const metrics = container.firstChild.firstChild.children[3]
    expect(metrics).toHaveClass('-mt-px flex divide-x divide-gray-200 border-t-2')
  })
})

import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import Icon from '../icon'

import Button from './index'

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

describe('Button component', () => {
  it('should have propTypes and defaultProps', () => {
    expect(Button.defaultProps).not.toBeUndefined()
    expect(Button.propTypes).not.toBeUndefined()
  })
  it('renders with and without props', () => {
    act(() => {
      render(<Button>test</Button>, container)
    })
    expect(container.firstChild.textContent).toBe('test')
    expect(container.firstChild).toHaveClass(Button.defaultProps.className)

    act(() => {
      render(<Button className='testing-class'>test</Button>, container)
    })
    expect(container.firstChild).toHaveClass('testing-class')
  })
  it('has correct button type', () => {
    act(() => {
      render(<Button type='submit'>test</Button>, container)
    })
    expect(container.firstChild.type).toBe('submit')

    act(() => {
      render(<Button>test</Button>, container)
    })
    expect(container.firstChild.type).toBe('button')
  })

  it('should render an icon', () => {
    act(() => {
      render(<Button icon={Icon.TYPES.comment}>test</Button>, container)
    })
    expect(container.querySelector('svg')).toHaveClass('w-6 h-6')
  })
  it('fire event onClick', () => {
    const onClick = jest.fn()
    act(() => {
      render(<Button onClick={onClick}>test</Button>, container)
    })

    const el = container.firstChild
    act(() => {
      el.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

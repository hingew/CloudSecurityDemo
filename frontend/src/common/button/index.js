import Icon from '../icon'
import PropTypes from 'prop-types'

const Button = ({ className, onClick, icon, type, children, disabled = false }) => (
  <button
    className={className}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {icon && <Icon type={icon} />}
    {children}
  </button>
)

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['button', 'submit']),
  children: PropTypes.node.isRequired
}

Button.defaultProps = {
  type: 'button',
  onClick: () => null,
  icon: null,
  className: 'inline-flex items-center ml-4 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
}

export default Button

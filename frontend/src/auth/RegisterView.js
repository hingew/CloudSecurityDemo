import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../common/button'
import Icon from '../common/icon'
import Input from '../common/input'
import AuthAPI from './AuthAPI'

const RegisterView = ({ history }) => {
  const [data, setData] = useState({ email: '', username: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    setError(null)
    AuthAPI.Register(data)
      .then(() => {
        setIsLoading(false)
        history.push('/login')
      })
      .catch(err => {
        setIsLoading(false)
        setError(err.message)
      })
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"'>
      <div className='mx-auto w-full max-w-md'>
        <Icon type={Icon.TYPES.cloud} className='mx-auto h-24 w-auto' />
        <h2 className='mt-2 text-center text-sm text-gray-600 max-w'>
          Register a new Account

        </h2>
        <p className='mt-2 text-center text-sm text-gray-600 max-w'>
          Or
          <Link to='/login' className='ml-2 font-medium text-teal-600 hover:text-teal-500'>
            Sign in to your account
          </Link>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={e => handleSubmit(e)}>
            <Input
              type='email'
              name='email'
              placeholder='tony@testify.com'
              required
              value={data.email}
              label='Email'
              onChange={value => setData({ ...data, email: value })}
            />

            <Input
              type='text'
              name='username'
              placeholder='Tony Testify'
              value={data.username}
              required
              label='Username'
              onChange={value => setData({ ...data, username: value })}
            />

            <Input
              type='password'
              name='password'
              placeholder='*****'
              value={data.password}
              required
              label='Password'
              onChange={value => setData({ ...data, password: value })}
            />

            {error &&
              <div>
                <p class='mt-2 text-sm text-center text-red-600' id='email-error'>{error}</p>
              </div>}

            <div>
              <Button
                type='submit'
                disabled={isLoading}
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterView

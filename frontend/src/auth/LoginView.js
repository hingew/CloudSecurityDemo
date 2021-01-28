import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import AuthAPI from './AuthAPI'
import Button from '../common/button'
import Input from '../common/input'
import Icon from '../common/icon'

const LoginView = ({ history }) => {
  const [data, setData] = useState({ identifier: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    setError(null)
    console.log(data)
    AuthAPI.Login(data)
      .then(res => {
        setIsLoading(false)
        history.push('/')
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
          Sign in to your account
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600 max-w'>
          Or
          <Link to='/register' className='ml-2 font-medium text-teal-600 hover:text-teal-500'>
            Register a new Account
          </Link>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={e => handleSubmit(e)}>
            <Input
              type='text'
              name='identifier'
              placeholder='tony_testify'
              required
              value={data.identifier}
              label='Email / Username'
              onChange={value => setData({ ...data, identifier: value })}
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
                <p class='mt-2 text-sm text-red-600' id='email-error'>{error}</p>
              </div>}

            <div>
              <Button
                type='submit'
                disabled={isLoading}
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
              >
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginView

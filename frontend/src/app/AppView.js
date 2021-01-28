import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

import ListView from '../lists/ListView'
import RegisterView from '../auth/RegisterView'
import LoginView from '../auth/LoginView'
import BackdoorView from '../backdoor/BackdoorView'

function App () {
  return (
    <Switch>
      <PrivateRoute exact path='/' component={ListView} />
      <Route exact path='/login' component={LoginView} />
      <Route exact path='/register' component={RegisterView} />
      <Route exact path='/backdoor' component={BackdoorView} />
    </Switch>
  )
}

export default App

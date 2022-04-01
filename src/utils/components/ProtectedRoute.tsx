import { Route, Redirect } from 'react-router-dom'
import { RootStateOrAny, useSelector } from 'react-redux'

function ProtectedRoute({ children, component: Component, ...rest }: {
    [x: string]: any;
    children: any;
    component: any;
}): JSX.Element{
  
  const user = useSelector((state:RootStateOrAny|null) => state.auth.user)
    
  return user
    ? (<Route {...rest} component={Component} />)
    : (<Redirect to={'auth/login'} />)
}

export default ProtectedRoute
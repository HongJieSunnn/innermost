// Copyright (c) 2019 Andy Pottage
// 
// Distributed under MIT license.
// See file LICENSE for detail or copy at https://opensource.org/licenses/MIT

//Modify by HongJieSun 2022

import React, { useEffect, useRef } from 'react';
import { storeUser } from '../../redux/actions/authActions';
import { setAuthHeader } from '../axios/axiosHeaders';

//To dispatch actions when userManager's user changes by invoke event.
export default function AuthProvider({ userManager: manager, store, children }:{userManager:any,store:any,children:any}){

  let userManager = useRef<any>();
  
  useEffect(() => {
    userManager.current = manager

    const onUserLoaded = (user:any) => {
      console.log(`user loaded: ${user}`)//after signincallback this delagate will be invoked.
      store.dispatch(storeUser(user))
    }

    const onUserUnloaded = () => {
      setAuthHeader(null)
      console.log(`user unloaded`)
    }

    const onAccessTokenExpiring = () => {
      console.log(`user token expiring`)
    }

    const onAccessTokenExpired = () => {
      console.log(`user token expired`)
    }

    const onUserSignedOut = () => {
      console.log(`user signed out`)
    }

    // events for user
    userManager.current.events.addUserLoaded(onUserLoaded)
    userManager.current.events.addUserUnloaded(onUserUnloaded)
    userManager.current.events.addAccessTokenExpiring(onAccessTokenExpiring)
    userManager.current.events.addAccessTokenExpired(onAccessTokenExpired)
    userManager.current.events.addUserSignedOut(onUserSignedOut)

    // Specify how to clean up after this effect:
    return function cleanup() {
      userManager.current.events.removeUserLoaded(onUserLoaded);
      userManager.current.events.removeUserUnloaded(onUserUnloaded);
      userManager.current.events.removeAccessTokenExpiring(onAccessTokenExpiring)
      userManager.current.events.removeAccessTokenExpired(onAccessTokenExpired)
      userManager.current.events.removeUserSignedOut(onUserSignedOut)
    };
  }, [manager, store]);

  return (
    React.Children.only(children)
  )
}
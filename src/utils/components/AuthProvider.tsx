// Copyright (c) 2019 Andy Pottage
// 
// Distributed under MIT license.
// See file LICENSE for detail or copy at https://opensource.org/licenses/MIT

//Modify by HongJieSun 2022

import { message } from 'antd';
import { UserManager } from 'oidc-client';
import React, { useEffect, useRef } from 'react';
import { storeUser, userExpired, userSignedOut } from '../../redux/actions/authActions';
import { setAuthHeader } from '../axios/axiosHeaders';

//To dispatch actions when userManager's user changes by invoke event.
export default function AuthProvider({ userManager: manager, store, children }:{userManager:UserManager,store:any,children:any}){

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
      message.info("登陆状态已过期")
      store.dispatch(userExpired())
    }

    const onUserSignedOut = () => {
      console.log(`user signed out`)
      store.dispatch(userSignedOut())
      manager.removeUser();
      message.info("您已退出登录");
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
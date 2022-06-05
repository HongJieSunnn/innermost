import { UserManager } from "oidc-client";
import { Store } from "redux";
import { storeUser, storeUserError } from "../redux/actions/authActions";

const config = {
    authority: "https://localhost:5106",
    client_id: "reactapp",
    redirect_uri: "http://localhost:3000/signin-oidc",
    response_type: "id_token token",
    scope: "openid profile loglife tagserver meet musichub fileserver intelligence push reactapigateway userstatue userimages email",
    post_logout_redirect_uri: "http://localhost:3000/signout-oidc",
};

const userManager=new UserManager(config);

export async function loadUserFromStorage(store:Store<any,any>) {
    try {
        let user = await userManager.getUser()
        if (!user) { return store.dispatch(storeUserError()) }
        store.dispatch(storeUser(user))
    } catch (e) {
        console.error(`User not found: ${e}`)
        store.dispatch(storeUserError())
    }
}

export function signinRedirect() {
    return userManager.signinRedirect()
}

export function signinRedirectCallback() {
    return userManager.signinRedirectCallback()
}

export function signoutRedirect(id_token_hint:string) {
    userManager.clearStaleState()
    userManager.removeUser()
    return userManager.signoutRedirect({
        id_token_hint:id_token_hint
    })
}

export function signoutRedirectCallback() {
    userManager.clearStaleState()
    userManager.removeUser()
    return userManager.signoutRedirectCallback()
}
  
export default userManager
export function getLoginReturnUrl(){
    const search=window.location.search;

    return search.substring(11);
}
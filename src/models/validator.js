import jwtDecode from 'jwt-decode'

const VALIDATOR_KEY = 'com.saiyao.pages.user'
const ACCESS_TOKEN_KEY = 'access_token'
const ROLE_KEY = 'rol'
const ROLE_USER = 'operator'
const ROLE_ADMIN = 'employee'
const lic_KEY = 'lic'




let user = null

export function loadValidator() {
    if (user) {
        return user
    }
    user = localStorage.getItem(VALIDATOR_KEY)
    if (!user) {
        return null
    }
    user = JSON.parse(user)
    console.log(user)
    return user
}

export function saveValidator(obj) {
    user = obj
    localStorage.setItem(VALIDATOR_KEY, JSON.stringify(user))
}

export function clearValidator() {
    user = null
    localStorage.removeItem(VALIDATOR_KEY)
}

export function getAccessToken() {
    let validator = loadValidator()
    return validator && validator[ACCESS_TOKEN_KEY]
}

function getRole(value) {
    const validator = loadValidator()
    if (!validator) {
        return undefined
    }
    const decoded = jwtDecode(validator[ACCESS_TOKEN_KEY])
    return decoded[value ? value : ROLE_KEY]
}

export function isAdmin() {
    return getRole() === ROLE_ADMIN
}

export function isUser() {
    return getRole() === ROLE_USER
}

/**
 * 版本权限
 * @param index
 * @returns {boolean}
 */
export function isLicense(index) {
    if(isAdmin()){
        return true
    }
    if(index <= getRole(lic_KEY)){
        return true
    }else{
        return false
    }
}
/**
**当前使用的版本
 */
export function useLicense() {
    const lincense = ['免费版','基础版','标准版','高级版'];
    return lincense[getRole(lic_KEY)-1];
}
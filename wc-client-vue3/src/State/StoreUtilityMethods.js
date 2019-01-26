import Store from './store.js'

const CheckAndSetCookie = function (collectionLength) {
  let isCookie = GetCookie('wotd') // check if a cookie exists
  let randomWatchIndex = GetRandomWatchFromCollectionByArrayIndex(collectionLength)
  if (!isCookie || isCookie === '') {
    SetCookie(randomWatchIndex)
    Store.dispatch('SetCookieStateWOTD', randomWatchIndex)
  } else {
    let isCookieValid = CheckCookie('wotd')
    if (isCookieValid) {
      Store.dispatch('SetCookieStateWOTD', isCookie)
    } else {
      SetCookie(randomWatchIndex)

      Store.dispatch('SetCookieStateWOTD', randomWatchIndex)
    }
  }
}

const GetRandomWatchFromCollectionByArrayIndex = function (collectionLength) {
  let max = collectionLength
  let min = 0
  return Math.floor(Math.random() * (max - min) + min)
}

const GetCookie = function (cookieName) {
  let value = '; ' + document.cookie
  let parts = value.split('; ' + cookieName + '=')
  if (parts.length == 2) return parts.pop().split(';').shift()
  else return ''
}

const CheckCookie = function (cookieName) {
  var isCookie = GetCookie(cookieName)
  if (isCookie === '') {
    //   Cookie is valid
    return false
  } else {
    //   Cookie is not valid
    return true
  }
}

const SetCookie = function (wotdIndex) {
  let date = new Date()
  date.setDate(date.getDate() + 1)
  document.cookie = 'wotd=' + wotdIndex + ';expires=' + date + '; path=/'
}

export default {
  CheckAndSetCookie
}

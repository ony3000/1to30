import uuid from '~/plugins/uuid'

// reference - https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable (type) {
  let storage
  try {
    storage = window[type]
    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0)
  }
}

const baseState = {
  isStorageAvailable: storageAvailable('localStorage'),
  contentPath: '/index',
  ranking: [],
  settings: {
    useDarkTheme: false,
    useHint: true
  }
}

if (baseState.isStorageAvailable) {
  const storage = window.localStorage

  const ranking = []
  const storedData = storage.getItem('1to30:ranking')
  if (storedData) {
    try {
      ranking.push(...JSON.parse(storedData))
    } catch (e) {
      console.warn(e)
    }
  }
  ranking.forEach((record, index) => {
    if (!('uuid' in record)) {
      ranking[index].uuid = uuid()
    }
  })
  storage.setItem('1to30:ranking', JSON.stringify(ranking))
  baseState.ranking = ranking
}

export const state = () => ({
  ...baseState
})

export const mutations = {
  navigateContent (state, newPath) {
    state.contentPath = newPath
  },
  addRecord (state, newRecord) {
    state.ranking = [
      ...state.ranking,
      newRecord
    ]
  }
}

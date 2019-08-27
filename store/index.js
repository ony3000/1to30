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

const dummyRanking = [
  {
    name: 'Marie J. Holder',
    score: 28.202,
    timestamp: 1503088656430,
    userAgent: 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
  },
  {
    name: 'Vicki A. Blanchard',
    score: 23.222,
    timestamp: 1504227661675,
    userAgent: 'Mozilla/5.0 (Windows NT 6.1; rv:60.0) Gecko/20100101 Firefox/60.0'
  },
  {
    name: 'Christopher J. Walker',
    score: 19.714,
    timestamp: 1566608806422,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0'
  },
  {
    name: 'Isiah C. Chaney',
    score: 78.401,
    timestamp: 1566926573293,
    userAgent: 'Mozilla/5.0 (Windows NT 6.1; rv:60.0) Gecko/20100101 Firefox/60.0'
  },
  {
    name: 'James A. Starr',
    score: 97.301,
    timestamp: 1560301926436,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:66.0) Gecko/20100101 Firefox/66.0'
  },
  {
    name: 'Eric T. Rollins',
    score: 19.108,
    timestamp: 1556920005438,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
  },
  {
    name: 'Richard L. Downs',
    score: 94.019,
    timestamp: 1530385269878,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36'
  },
  {
    name: 'Hugo I. Overall',
    score: 33.169,
    timestamp: 1566948267291,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1 Safari/605.1.15'
  },
  {
    name: 'Rosa J. Carey',
    score: 93.710,
    timestamp: 1554397567234,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
  },
  {
    name: 'Mary M. White',
    score: 23.502,
    timestamp: 1549346786722,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'
  },
  {
    name: 'Christopher D. Murphy',
    score: 42.023,
    timestamp: 1500833249307,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36'
  },
  {
    name: 'Dorothy R. Hoosier',
    score: 63.492,
    timestamp: 1544974295071,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36 OPR/58.0.3135.132'
  },
  {
    name: 'Daniel B. Mauzy',
    score: 57.438,
    timestamp: 1542417170167,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:66.0) Gecko/20100101 Firefox/66.0'
  },
  {
    name: 'Dawn M. Martin',
    score: 39.286,
    timestamp: 1554873057077,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:66.0) Gecko/20100101 Firefox/66.0'
  },
  {
    name: 'Melanie J. Albers',
    score: 13.698,
    timestamp: 1550443237621,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.108 Safari/537.36'
  },
  {
    name: 'Louis Nash',
    score: 46.206,
    timestamp: 1566952095074,
    userAgent: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:66.0) Gecko/20100101 Firefox/66.0'
  },
  {
    name: 'Harriet Barlow',
    score: 47.573,
    timestamp: 1556762017796,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'
  },
  {
    name: 'Harvey Wong',
    score: 31.100,
    timestamp: 1534856970619,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0'
  },
  {
    name: 'Jodie Power',
    score: 18.620,
    timestamp: 1515447609704,
    userAgent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
  },
  {
    name: 'Sean Franklin',
    score: 73.769,
    timestamp: 1508364233281,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'
  },
  {
    name: 'Chloe Tyler',
    score: 37.951,
    timestamp: 1541448790756,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 YaBrowser/19.4.0.2397 Yowser/2.5 Safari/537.36'
  },
  {
    name: 'Oliver Bryant',
    score: 15.842,
    timestamp: 1557277986294,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36'
  },
  {
    name: 'Kai Wilkins',
    score: 8.679,
    timestamp: 1548371717280,
    userAgent: 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
  },
  {
    name: 'Lola Shaw',
    score: 91.087,
    timestamp: 1557276327583,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134'
  },
  {
    name: 'Samuel Fuller',
    score: 64.569,
    timestamp: 1560483575967,
    userAgent: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:66.0) Gecko/20100101 Firefox/66.0'
  },
  {
    name: 'Kai Scott',
    score: 47.303,
    timestamp: 1559678878198,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
  },
  {
    name: 'Evan Singh',
    score: 43.095,
    timestamp: 1538859659019,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36'
  },
  {
    name: 'Lewis Hart',
    score: 42.406,
    timestamp: 1546257269383,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36'
  },
  {
    name: 'Spencer Davison',
    score: 10.168,
    timestamp: 1539975169461,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36'
  },
  {
    name: 'Callum Miller',
    score: 22.965,
    timestamp: 1561295246084,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36'
  }
]

const baseState = {
  isStorageAvailable: storageAvailable('localStorage'),
  ranking: dummyRanking
}

export const state = () => ({
  ...baseState
})

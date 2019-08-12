(function () {
	'use strict'

	var app = {
		tileCount: 30,
		rowCount: 4,
		columnCount: 4,
		cellCount: 16, // equals to (rowCount * columnCount)
		layerCount: 2, // equals to (ceil(tileCount / cellCount) * cellCount)
		numbers: [],
		lastErrorCode: null,

		spinner: document.querySelector('.sample-loader'),
		container: document.querySelector('.main'),

		subsButton: document.getElementById('butSubscribe'),
		unsubsButton: document.getElementById('butUnsubscribe'),

		backwardButton: document.getElementById('butBackward'),
		stopButton: document.getElementById('butStop'),
		playButton: document.getElementById('butPlay'),
		scoreButton: document.getElementById('butScore'),
		refreshButton: document.getElementById('butRefresh'),

		state: {
			isLoading: true,
			isReady: false,
			isCountdown: false,
			isPlaying: false,
			isEnd: false
		}
	}

	app.upEvent = window.PointerEvent ? 'pointerup' : ( ( 'ontouchstart' in window ) || window.DocumentTouch && document instanceof DocumentTouch ) ? 'touchend' : 'mouseup'

	const applicationServerPublicKey = 'BGjKuHZhCtt0L-vhS9uZAYomiw_mqRcP32G3Q9owoc5mopireH7FADlS6XRXQDl6ECslvNoD2TRKS9ew9ExQjwk'

	let isSubscribed = false
	let swRegistration = null

	function urlB64ToUint8Array(base64String) {
		const padding = '='.repeat((4 - base64String.length % 4) % 4)
		const base64 = (base64String + padding)
			.replace(/\-/g, '+')
			.replace(/_/g, '/')

		const rawData = window.atob(base64)
		const outputArray = new Uint8Array(rawData.length)

		for (let i = 0; i < rawData.length; ++i) {
			outputArray[i] = rawData.charCodeAt(i)
		}
		return outputArray
	}

	/*****************************************************************
	 *
	 * Event listeners for UI elements
	 *
	 *****************************************************************/

	// prevent pinch zoom in iOS 10 Safari
	document.addEventListener('touchmove', function (e) {
		if (e.scale !== 1) {
			e.preventDefault()
		}
	})

	app.backwardButton.addEventListener(app.upEvent, function (e) {
		if (app.state.isEnd) {
			app.spinner.removeAttribute('hidden')
			app.container.setAttribute('hidden', true)
			app.backwardButton.setAttribute('hidden', true)

			// state transition
			app.state.isEnd = false
			app.state.isLoading = true

			app.initialize()
		}
	})

	app.stopButton.addEventListener(app.upEvent, function (e) {
		if (app.state.isPlaying) {
			clearInterval(app.timer)

			app.backwardButton.removeAttribute('hidden')
			app.stopButton.setAttribute('hidden', true)

			// do something more

			// state transition
			app.state.isPlaying = false
			app.state.isEnd = true
		}
	})

	app.playButton.addEventListener(app.upEvent, function (e) {
		if (app.state.isReady) {
			app.playButton.setAttribute('hidden', true)

			ReactDOM.render(
				<span>0.00초</span>,
				document.getElementById('root-time')
			)
			ReactDOM.render(
				<div>
					<div>Next</div>
					<div>1</div>
				</div>,
				document.getElementById('root-guide')
			)
			ReactDOM.render(
				<span>실수: 0</span>,
				document.getElementById('root-mistake')
			)

			for (var index = 0; index < app.cellCount; index += 1) {
				app.drawTile(index, app.numbers.shift())
			}

			document.getElementById('modal-countdown').classList.add('is-active')

			app.timerStart = (new Date()).getTime()
			app.timer = setInterval(function () {
				var elapsedTime = (new Date()).getTime() - app.timerStart

				app.tick(elapsedTime)
			}, 5)

			// state transition
			app.state.isReady = false
			app.state.isCountdown = true
		}
	})

	app.scoreButton.addEventListener(app.upEvent, function (e) {
		app.drawRank()
		document.getElementById('modal-highscore').classList.add('is-active')
	})

	app.refreshButton.addEventListener(app.upEvent, function (e) {
		location.reload()
	})

	document.querySelector('#modal-highscore .modal-close').addEventListener(app.upEvent, function (e) {
		document.getElementById('modal-highscore').classList.remove('is-active')
		e.stopPropagation()
	})

	/*****************************************************************
	 *
	 * Some UI Components
	 *
	 *****************************************************************/

	class Tile extends React.Component {
		constructor(props) {
			super(props)

			// This binding is necessary to make `this` work in the callback
			this.handleClick = this.handleClick.bind(this)
		}

		handleClick(e) {
			if (app.state.isPlaying) {
				if (app.guide === this.props.number) {
					app.markTile(this.props.index)
					app.guide += 1

					ReactDOM.render(
						<div>
							<div>Next</div>
							<div>{(app.guide > app.tileCount ? '-' : app.guide)}</div>
						</div>,
						document.getElementById('root-guide')
					)
				}
				else {
					app.mistake += 1

					ReactDOM.render(
						<span>실수: {app.mistake}</span>,
						document.getElementById('root-mistake')
					)
				}
			}
		}

		render() {
			const isTouchSupport = (this.props.upEvent === 'touchend')

			return (
				<div className='tile-wrap'>
				{isTouchSupport ? (
					<div className={this.props.number ? 'tile' : 'tile ready'} onTouchEnd={this.handleClick}>
						<span className='tile-number'>{this.props.number ? this.props.number : ''}</span>
					</div>
				) : (
					<div className={this.props.number ? 'tile' : 'tile ready'} onMouseUp={this.handleClick}>
						<span className='tile-number'>{this.props.number ? this.props.number : ''}</span>
					</div>
				)}
				</div>
			)
		}
	}

	/*****************************************************************
	 *
	 * Methods to update/refresh the UI
	 *
	 *****************************************************************/

	app.drawTile = function (index, number) {
		ReactDOM.render(
			<Tile index={index} number={number} upEvent={app.upEvent} />,
			document.getElementById('cell-' + index)
		)
	}

	app.markTile = function (index) {
		document.getElementById('cell-' + index).querySelector('.tile').classList.add('marked')

		if (app.numbers.length > 0) {
			setTimeout(function () {
				var tileNumber = app.numbers.shift()

				if (tileNumber) {
					app.drawTile(index, tileNumber)
					document.getElementById('cell-' + index).querySelector('.tile').classList.remove('marked')
				}
			}, 200)
		}

		if (app.guide === app.tileCount) {
			if (app.state.isPlaying) {
				clearInterval(app.timer)

				app.backwardButton.removeAttribute('hidden')
				app.stopButton.setAttribute('hidden', true)

				if (app.isPrivateMode() === false) {
					setTimeout(function () {
						var scoreTime = (app.countup / 1000).toFixed(2)
						var higherScoreList = _.filter(app.localScoreList, function (o) {
							return (
								(Number(o.time) < Number(scoreTime))
								||
								(Number(o.time) === Number(scoreTime) && Number(o.mistake) <= Number(app.mistake))
							)
						})

						if (higherScoreList.length === 10) {
							// do nothing
						}
						else {
							var scoreName = prompt('기록을 저장하려면 이름 또는 닉네임을 입력하세요.', '')

							app.localScoreList.splice(higherScoreList.length, 0, {
								name: (scoreName === null ? 'John Doe' : scoreName),
								time: scoreTime,
								mistake: app.mistake,
							})
							app.localScoreList = app.localScoreList.slice(0, 10)

							localStorage.setItem('scoreList', JSON.stringify(app.localScoreList))
						}
					}, 200)
				}
				else {
					if (localStorage.length === 0 && app.lastErrorCode === DOMException.QUOTA_EXCEEDED_ERR) {
						setTimeout(function () {
							alert('Private mode에서는 기록을 저장할 수 없습니다.')
						}, 100)
					}
				}

				// state transition
				app.state.isPlaying = false
				app.state.isEnd = true
			}
		}
	}

	app.tick = function (elapsedTime) {
		if (elapsedTime < 3000) {
			var countdown = 3000 - elapsedTime

			ReactDOM.render(
				<div>
					<span className='counter'>{Math.ceil(countdown / 1000)}</span>
				</div>,
				document.getElementById('root-countdown')
			)
		}
		else {
			var countup = elapsedTime - 3000
			app.countup = countup

			ReactDOM.render(
				<span>{(countup / 1000).toFixed(2)}초</span>,
				document.getElementById('root-time')
			)

			if (app.state.isCountdown) {
				app.stopButton.removeAttribute('hidden')
				app.guide = 1
				app.mistake = 0

				ReactDOM.render(
					<div>
						<span className='counter'>&nbsp;</span>
					</div>,
					document.getElementById('root-countdown')
				)

				document.getElementById('modal-countdown').classList.remove('is-active')

				// state transition
				app.state.isCountdown = false
				app.state.isPlaying = true
			}
		}
	}

	app.drawRank = function () {
		const listItems = app.localScoreList.map((rank, index) =>
			<div className="columns is-mobile is-gapless" key={index}>
				<div className="column is-2">{index + 1}위</div>
				<div className="column has-text-ellipsis">{rank.name}</div>
				<div className="column is-3 has-text-right">{rank.time}초</div>
				<div className="column is-3 has-text-right">{rank.mistake}회 실수</div>
			</div>
		)

		ReactDOM.render(
			<div>
				{listItems}
			</div>,
			document.getElementById('root-highscore')
		)
	}

	app.updateSubsButton = function () {
		if (Notification.permission === 'denied') {
			app.subsButton.setAttribute('hidden', true)
			app.unsubsButton.setAttribute('hidden', true)
			return
		}

		if (isSubscribed) {
			app.subsButton.setAttribute('hidden', true)
			app.unsubsButton.removeAttribute('hidden')
		}
		else {
			app.subsButton.removeAttribute('hidden')
			app.unsubsButton.setAttribute('hidden', true)
		}
	}

	app.initialize = function () {
		if (window.navigator.standalone === true) {
			document.querySelector('body').classList.add('is-standalone')
		}

		app.numbers = []
		for (var layer = 0; layer < app.layerCount; layer += 1) {
			var temp = []

			for (var cell = 1; cell <= app.cellCount; cell += 1) {
				var number = layer * app.cellCount + cell

				temp.push((number > app.tileCount ? null : number))
			}

			app.numbers = app.numbers.concat(_.shuffle(temp))
		}

		ReactDOM.render(
			<div>
				<span className='counter'>&nbsp;</span>
			</div>,
			document.getElementById('root-countdown')
		)
		ReactDOM.render(
			<span>&nbsp;</span>,
			document.getElementById('root-time')
		)
		ReactDOM.render(
			<div>
				<div>&nbsp;</div>
				<div>&nbsp;</div>
			</div>,
			document.getElementById('root-guide')
		)
		ReactDOM.render(
			<span>&nbsp;</span>,
			document.getElementById('root-mistake')
		)

		for (var index = 0; index < app.cellCount; index += 1) {
			app.drawTile(index)
		}

		var scoreList = localStorage.getItem('scoreList')
		if (scoreList) {
			app.localScoreList = JSON.parse(scoreList.slice())
		}
		else {
			var defaultList = []

			for (var grade = 1; grade <= 10; grade += 1) {
				defaultList.push({
					name: 'John Doe',
					time: (grade * 10).toFixed(2),
					mistake: 0
				})
			}

			app.localScoreList = defaultList.slice()
		}

		if (app.state.isLoading) {
			setTimeout(function () {
				app.spinner.setAttribute('hidden', true)
				app.container.removeAttribute('hidden')
				app.playButton.removeAttribute('hidden')

				if (app.isPrivateMode() === false) {
					app.scoreButton.removeAttribute('hidden')
				}

				// state transition
				app.state.isLoading = false
				app.state.isReady = true
			}, 750)
		}
	}

	app.initializeSubs = function () {
		app.subsButton.addEventListener(app.upEvent, function (e) {
			app.subscribeUser()
		})

		app.unsubsButton.addEventListener(app.upEvent, function (e) {
			app.unsubscribeUser()
		})

		swRegistration.pushManager.getSubscription()
		.then(function (subscription) {
			isSubscribed = ! (subscription === null)

			if (isSubscribed) {
				console.log('User is subscribed.')
			}
			else {
				console.log('User is NOT subscribed.')
			}
			app.updateSubsButton()
		})
	}

	/*****************************************************************
	 *
	 * Methods for dealing with the model
	 *
	 *****************************************************************/

	app.isPrivateMode = function () {
		try {
			localStorage.setItem('some_key', 'some_value')
			localStorage.removeItem('some_key')
			return false
		}
		catch (err) {
			app.lastErrorCode = err.code
			return err.code
		}
	}

	app.subscribeUser = function () {
		const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey)

		swRegistration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: applicationServerKey
		})
		.then(function(subscription) {
			console.log('User is subscribed:', subscription)
			console.log(JSON.stringify(subscription))
			isSubscribed = true
			app.updateSubsButton()
			alert('잠시 후 테스트 푸시가 전송됩니다.')
			app.pushTimer = setTimeout(function () {
				axios
				.post('/1to30/push.php', JSON.stringify(subscription))
				.then(function (response) {
					console.log(response)

					// 자동 구독 취소 (테스트용)
					app.unsubscribeUser()
				})
				.catch(function (error) {
					console.log(error)
				})
			}, 3000)
		})
		.catch(function(err) {
			console.log('Failed to subscribe the user: ', err)
			app.updateSubsButton()
		})
	}

	app.unsubscribeUser = function () {
		swRegistration.pushManager.getSubscription()
		.then(function (subscription) {
			if (subscription) {
				clearTimeout(app.pushTimer)
				return subscription.unsubscribe()
			}
		})
		.catch(function (error) {
			console.log('Error unsubscribing', error)
		})
		.then(function () {
			console.log('User is unsubscribed.')
			isSubscribed = false
			app.updateSubsButton()
		})
	}

	// TODO add startup code here
	app.initialize()

	// TODO add service worker code here
	if ('serviceWorker' in navigator) {

		if ('PushManager' in window) {
			console.log('Service Worker and Push is supported')

			navigator.serviceWorker.register('assets/scripts/sw.js')
			.then(function (swReg) {
				console.log('Service Worker is registered', swReg)

				swRegistration = swReg
				app.initializeSubs()
			})
			.catch(function (error) {
				console.error('Service Worker Error', error)
			})
		}
		else {
			console.warn('Push not supported')
		}
	}
	else {
		console.warn('Service Worker not supported')
	}
})()

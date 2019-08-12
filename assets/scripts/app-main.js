(function () {
	'use strict'

	var app = {
		isLoading: true,
		timer: false,
		spinner: document.querySelector('.loader'),
		container: document.querySelector('.main')
	}

	/*****************************************************************
	 *
	 * Event listeners for UI elements
	 *
	 *****************************************************************/

/*
	document.getElementById('butRefresh').addEventListener('click', function (e) {
		location.reload()
	})

	document.getElementById('butStop').addEventListener('click', function (e) {
		app.timer = false
	})

	document.getElementById('butPlay').addEventListener('click', function (e) {
		if (app.isLoading === false && app.timer === false) {
			globalHelper.initialize()

			app.timer = true
		}
	})
*/

	/*****************************************************************
	 *
	 * Methods to update/refresh the UI
	 *
	 *****************************************************************/

	app.initialize = function () {
/*
		var numbers = []

		for (var num = 1; num <= 16; num += 1) {
			numbers.push(num)
		}

		numbers = _.shuffle(numbers)

		for (var idx = 0; idx < numbers.length; idx += 1) {
			drawTile(idx, numbers[idx], false)
		}

		window.globalHelper = new Helper()

		if (app.isLoading) {
			app.spinner.setAttribute('hidden', true)
			app.container.removeAttribute('hidden')
			app.isLoading = false
		}
*/
	}

	/*****************************************************************
	 *
	 * Methods for dealing with the model
	 *
	 *****************************************************************/

	app.bar = function (param) {
		// do something another
	}

	// TODO uncomment line below to test app with fake data
	app.initialize()

	// TODO add startup code here

	// TODO add service worker code here

})()

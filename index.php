<?php
$agent_string = strtolower($_SERVER['HTTP_USER_AGENT']);
$is_standalone = FALSE;
if (strpos($agent_string, 'iphone') !== FALSE && strpos($agent_string, 'safari') === FALSE)
{
	$is_standalone = TRUE;
}
?><!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no">
	<title>1부터 30까지!</title>
	<link rel="icon" type="image/png" href="assets/images/icon-32x32.png">
	<link rel="stylesheet" href="assets/styles/font-awesome-4.7.0.min.css">
	<link rel="stylesheet" href="assets/styles/bulma-0.5.1.min.css">
	<link rel="stylesheet" href="assets/styles/inline.css">
	<link rel="stylesheet" href="assets/styles/custom.css">
	<link rel="stylesheet" media="all and (orientation: portrait)" href="assets/styles/portrait.css">
	<link rel="stylesheet" media="all and (orientation: landscape)" href="assets/styles/landscape.css">

	<!-- TODO add manifest here -->
	<link rel="manifest" href="manifest.json">

	<!-- Add to home screen for Safari on iOS -->
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
	<meta name="apple-mobile-web-app-title" content="1 to 30!">
	<link rel="apple-touch-icon" href="assets/images/icon-152x152.png">

	<!-- Add to home screen for Windows -->
	<meta name="msapplication-TileImage" content="assets/images/icon-144x144.png">
	<meta name="msapplication-TileColor" content="#d4b300">
</head>
<body class="<?php if ($is_standalone) { echo 'is-standalone'; } ?>">

	<header class="header">
		<h1 class="header__title">1 to 30!</h1>
		<button id="butSubscribe" class="headerButton" aria-label="Subscribe" hidden
			><i class="fa fa-bell fa-2x" aria-hidden="true"
		></i></button>
		<button id="butUnsubscribe" class="headerButton" aria-label="Unsubscribe" hidden
			><i class="fa fa-bell-slash fa-2x" aria-hidden="true"
		></i></button>
		<button id="butBackward" class="headerButton" aria-label="Backward" hidden
			><i class="fa fa-backward fa-2x" aria-hidden="true"
		></i></button>
		<button id="butStop" class="headerButton" aria-label="Stop" hidden
			><i class="fa fa-stop fa-2x" aria-hidden="true"
		></i></button>
		<button id="butPlay" class="headerButton" aria-label="Play" hidden
			><i class="fa fa-play fa-2x" aria-hidden="true"
		></i></button>
		<button id="butScore" class="headerButton" aria-label="Score" hidden
			><i class="fa fa-bar-chart fa-2x" aria-hidden="true"
		></i></button>
		<button id="butRefresh" class="headerButton" aria-label="Refresh"
			><i class="fa fa-repeat fa-2x" aria-hidden="true"
		></i></button>
	</header>

	<main class="main" hidden>
		<div class="board">
			<div class="score-board">
				<div class="box">
					<div class="media">
						<div class="media-left">
							<div id="root-guide" class="guide-helper">
								<div>
									<div>&nbsp;</div>
									<div>&nbsp;</div>
								</div>
							</div>
						</div>

						<div class="media-content">
							<div id="root-time" class="time-helper">
								<span>&nbsp;</span>
							</div>

							<div id="root-mistake" class="mistake-helper">
								<span>&nbsp;</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="game-board">
				<div class="cell-wrap">
				<?php for ($i = 0; $i < 16; $i += 1): ?>
					<div id="cell-<?php echo $i; ?>" class="cell"></div>
				<?php endfor; ?>
				</div>
			</div>
		</div>
	</main>

	<div class="sample-loader">
		<svg viewBox="0 0 32 32" width="32" height="32" style="vertical-align: top;">
			<circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
		</svg>
	</div>

	<div id="modal-countdown" class="modal">
		<div class="modal-background"></div>
		<div class="modal-content">
			<div id="root-countdown" class="countdown-helper"></div>
		</div>
	</div>

	<div id="modal-highscore" class="modal">
		<div class="modal-background"></div>
		<div class="modal-content">
			<div id="root-highscore" class="box"></div>
		</div>
		<button class="modal-close is-large" aria-label="close"></button>
	</div>

	<script src="assets/scripts/axios-0.16.2.min.js"></script>
	<script src="assets/scripts/lodash-4.17.4.min.js"></script>
	<script src="assets/scripts/react-15.4.1.js"></script>
	<script src="assets/scripts/react-dom-15.4.1.js"></script>
	<script src="assets/scripts/babel-standalone-6.21.1-0.min.js"></script>
	<script type="text/babel">
<?php include_once('assets/scripts/app-react.js'); ?>
	</script>

<?php if ($_SERVER['REQUEST_URI'] === '/dev/'): ?>
	<?php /* development */ ?>
<?php else: ?>
	<?php /* production */ ?>
<?php endif; ?>
</body>
</html>

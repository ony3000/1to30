<?php
require_once('vendor/autoload.php');
use Minishlink\WebPush\WebPush;

$params = json_decode(file_get_contents('php://input'), true);

/*
$params = Array
(
    [endpoint] => https://fcm.googleapis.com/fcm/send/dBMjXTfiHlQ:APA91bHoON2A5Oq8YnYN32xZW44tcmVRtXBkWgtZJfuxZ6jM6C7ewTnTCL_2_DQv4uwQUZH9g9dB7M-fgP6rNEn3s8qPJoQr1BER1FubNJKPrCTL1gkIC0uqWpDfnowabVHVaj7Xey90
    [expirationTime] =>
    [keys] => Array
        (
            [p256dh] => BPCRTikBMtcXaV3ysQ-QrZ8llhY2Kd3d9cHp99wcb5Jtz5uCiAAlXkCUW8uAfqmtsDlqH0bkvxVoigjoDHH9ZOs=
            [auth] => zGf1Pd7cC8Ti7nmMlhdKvw==
        )

)
*/

$auth = array(
	'VAPID' => array(

		/**
		 * You must provide a subject that is either a mailto: or a URL.
		 */
		'subject' => 'mailto:nianelo4@naver.com',

		/**
		 * https://web-push-codelab.appspot.com 에서 발급받을 수 있는 Application Server Keys
		 */
		'publicKey' => 'BGjKuHZhCtt0L-vhS9uZAYomiw_mqRcP32G3Q9owoc5mopireH7FADlS6XRXQDl6ECslvNoD2TRKS9ew9ExQjwk',
		'privateKey' => 'EqHEpLWeD00dXG0wup4m1sDE89YBR4hTPrUqrWZ43CE',
	),
);

$options = array(
	'TTL' => 300,
	'urgency' => 'normal',
	'topic' => 'new_event',
	'batchSize' => 200,
);

$webPush = new WebPush($auth, $options);
$webPush->setDefaultOptions($options);

$noti_data = array(
	'endpoint' => $params['endpoint'],
	'payload' => json_encode(array(
		'msg' => 'Yay it works! :D',
	)),
	'userPublicKey' => $params['keys']['p256dh'],
	'userAuthToken' => $params['keys']['auth'],
);

$res = $webPush->sendNotification(
	$noti_data['endpoint'],
	$noti_data['payload'],
	$noti_data['userPublicKey'],
	$noti_data['userAuthToken'],
	TRUE
);

file_put_contents('/tmp/dev_log', "push result = [{$res}]".PHP_EOL, FILE_APPEND);

echo json_encode(array(
	'test' => 'end',
));

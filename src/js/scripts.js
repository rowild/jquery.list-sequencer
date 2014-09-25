/*
 |-----------------------------------------------------------------------------
 | Sample Configuration: assign parameters to a div with the id of FLASH-INNER
 |-----------------------------------------------------------------------------
 */
$(function () {
	if ($('#LIST-SEQUENCE').length) {
		$('#LIST-SEQUENCE div ul').flashList({
			initialLevelZ: 1000,
			fadeSpeed: 500,
			moveSpeedX: 750,
			moveSpeedY: 750,
			directionY: "up",
			directionX: "none",
			delay: 3000,
			loop: 1,
			position: 'absolute'
		});
	}
});

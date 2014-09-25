/**
 * jquery flashList
 * https://github.com/rowild/jquery.list-sequencer
 *
 * Copyright 2013-2014 Robert Wildling
 * Released under the MIT license.
 *
 * Version: 0.0.1
 * Date: 2014-09-25
 */

// A list flashes in and out through its various elements
;(function ($) {
	$.fn.extend({
		flashList: function (vars) {
			var arr = [],
				i = 0,
				num = 0,
				looped = 0,
				h = $(this).children().height(),
				w = $(this).children().width(),
				directionX = vars.directionX || "none",// ltr,none,rtl
				directionY = vars.directionY || "none",// down,none,up
				delay = parseInt(vars.delay) || 3000,
				fadeSpeed = parseInt(vars.fadeSpeed) || 400,
				moveSpeedX = parseInt(vars.moveSpeedX) || 400,
				moveSpeedY = parseInt(vars.moveSpeedY) || 400,
				initialLevelZ = parseInt(vars.initialLevelZ) || 0,
				loop = parseInt(vars.loop) || 1, // 0 = stops on first element (not good!), 1 = 1 time loop (meaning there is no repeat)
				queue = queue || true,
				position = vars.position || 'absolute';

			// build motion parameters
			if (directionY === "down") { h = -h; }
			if (directionY === "none") { h = 0; }
			if (directionX === "ltr") { w = -w; }
			if (directionX === "none") { w = 0; }

			// Gather the child elements and put them into an array
			this.children().each(function () {
				var elem = $(this).css({
					'display': 'block',
					'position': position,
					'top': h,
					'left': w,
					'opacity': '0',
					'z-index': initialLevelZ + i
				});
				arr.push(elem);
			});

			function move() {
				// effect for one CSS aspect only!!!
				// we have three: top, left, opacity
				$(arr[num])
					.css({
						'top': h,
						'display': 'block',
						'opacity': 0
					})
					.animate({
						'opacity': '1',
						'top': 0,
						'left': 0
					},
					{
						duration: fadeSpeed,
						complete: function () {
							if ((num + 1) === arr.length) {
								num = 0;
								if (looped !== loop) {
									looped++;
								}
							}
							else {
								num++;
							}

							// let the last one not fade out
							if (looped !== loop) {
								disappear(this);
							}
						}
					});
			}

			function disappear(elem) {
				$(elem)
					.delay(delay)
					.animate({
						'top': -h,
						'left': -w,
						'opacity': 0
					}, fadeSpeed, function () {
						resetPosition(this);
						if (looped !== loop) {
							move();
						}
					});
			}

			function resetPosition(elem) {
				$(elem).css({
					'top': h,
					'left': w,
					'display': 'block',
					'opacity': 0
				});
			}

			// initialize the system
			move();
		}
	});
})(jQuery);

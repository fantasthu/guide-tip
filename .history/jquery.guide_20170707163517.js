
$.guide = function (options) {
	var defaults = {
		selector: '',  
		content: '', 
		align: 'center', // center, right,
		offset: {
			x: 0,
			y: 0
		}
	};
	// options
	/* [{
		selector: '',  
		content: '',
		align: 'left',
		offset: {
			x: 0,
			y: 0
		}
	}]

	*/

	var urlRoot = location.href.split('#')[0].replace(/\W/g, '') + 'Guide';

	if (!window.localStorage || !options || !$.isArray(options) || localStorage[urlRoot] == '1') {
		return;
	}

	var elGuideOverlay = $('#guideOverlay');
	var elGuideShut = $('#guideShut');
	var elGuide = $('#guideOverlap');

	var start = 0;

	var remove = function () {
		elGuideOverlay.remove();
		elGuideShut.remove();
		elGuide.remove();
		$(document).off('keydown.guide');
		$(window).off('resize.guide');
	};
	var goto = function (change) {
		start = start + change;
		if (start < 0) {
			start = 0;
		}
		if (!options[start]) {
			remove();
			return;
		}

		var data = $.extend({}, defaults, options[start]);

		// 鑾峰彇鍏冪礌
		var elTrigger = $(data.selector).eq(0);
		if (elTrigger.length == 0 && change) {
			goto(change);
			return;
		}

		// 瑁呰浇瀵瑰簲鎻愮ず鍐呭
		elGuide.empty();

		var elGuideContent = $('<div></div>').css({
			display: 'none',
			position: 'absolute'
		}).append(data.content);

		elGuide.append(elGuideContent);

		// 瀹氫綅
		elGuide.css({
			width: elTrigger.outerWidth(),
			height: elTrigger.outerHeight(),
			left: elTrigger.offset().left,
			top: elTrigger.offset().top
		});

		// 鎻愮ず鍐呭瀹氫綅
		elGuideContent.css({
			top: elTrigger.outerHeight() - 5 + data.offset.y
		});

		if (data.align == 'left') {
			elGuideContent.css({
				left: data.offset.x
			});
		} else if (data.align == 'right') {
			elGuideContent.css({
				right: data.offset.x
			});
		} else {
			elGuideContent.css({
				left: (elTrigger.outerWidth() - elGuideContent.width()) / 2 + data.offset.x
			});
		}
		
		setTimeout(function () {
			elGuideContent.show();
		}, history.pushState? 100: 0);
	};

	if (!elGuideOverlay.length) {
		elGuideOverlay = $('<a id="guideOverlay" href="javascript:" role="button"></a>').css({
			position: 'fixed',
			left: 0,
			top: 0,
			right: 0,
			bottom: 0,
			background: 'url(about:blank)',
			zIndex: 99,
			outline: 'none'
		});
		
		if (history.pushState) {
			elGuideOverlay.css('background', 'linear-gradient(to top, transparent, transparent)');	
		}

		elGuideShut = $('<a href="javascript:" id="guideShut" role="button">鍏抽棴</a>').css({
			position: 'fixed',
			top: 10,
			right: 10,
			color: '#fff',
			zIndex: 100
		});;

		elGuide = $('<div id="guideOverlap"></div>').css({
			position: 'absolute',
			transition: 'all .3s',
			boxShadow: '0 0 0 9999px rgba(0,0,0,.75)',
			// 濡傛灉鎯虫敮鎸佸渾瑙掞紝涓嬮潰鐨勬敞閲�
			// borderRadius: '50%',
			zIndex: 100
		});
		
		if (![].map) {
			// IE8娴忚鍣�
			elGuide.css('outline', '9999px solid #000').css('filter', 'alpha(opacity=75)');
		}

		$(document.body).append(elGuideOverlay).append(elGuide).append(elGuideShut);

		// 浜嬩欢
		elGuideShut.on('click', function () {
			remove();
		});

		// 缈婚〉
		elGuideOverlay.on({
			click: function () {
				goto(1);
			}
		});

		$(document).on('keydown.guide', function (event) {
			var keycode = {
				37: 'left',
				38: 'up',
				39: 'right',
				40: 'down',
				27: 'esc'
			};

			switch (keycode[event.keyCode]) {
				case 'esc': {
					remove();
					break;
				}
				case 'up': case 'left': {
					goto(-1);
					event.preventDefault();
					break;
				}
				case 'right': case 'down': {
					goto(1);
					event.preventDefault();
					break;
				}
			}
		});
		
		$(window).on('resize.guide', function () {
			goto(0);
		});
	}

	goto(0);
	
	elGuideOverlay[0].focus();

	localStorage[urlRoot] = '1';
};
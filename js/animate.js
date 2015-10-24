/**
 * @author Jelon
 * @date   2015/10/25
 * @brief  动画运动效果
 *
 */

var animate = (function() {
	return {
		$: function (str) {
			return document.getElementById(str);
		},
		/**
		 * @param  {object}  obj   DOM对象
		 * @return {object}  css   样式集合
		 */
		getStyle: function () {
			return function (obj) {
				if (obj.currentStyle) {
					return obj.currentStyle;
				} else {
					return getComputedStyle(obj);
				}
			}

		}(),

		init: function () {
			var _this = this;

			this.$('btn1').onclick = function () {
				var $this = this;
				if (/loading/.test($this.getAttribute('class'))) return;

				$this.setAttribute('class', $this.getAttribute('class') + ' loading'); 
	
				if ($this.getAttribute('rel') === '0') {
					_this.move(_this.$('div1'), _this.getStyle(_this.$('div1')), 'left', function () {
						$this.setAttribute('rel', '1');
						$this.setAttribute('class', $this.getAttribute('class').replace(/\s*loading/g, '')); 
					});
				} else {
					_this.move(_this.$('div1'), _this.getStyle(_this.$('div1')), 'right', function () {
						$this.setAttribute('rel', '0');
						$this.setAttribute('class', $this.getAttribute('class').replace(/\s*loading/g, '')); 
					});
				}
			};
			this.$('btn2').onclick = function () {
				var $this = this;
				if (/loading/.test($this.getAttribute('class'))) return;

				$this.setAttribute('class', $this.getAttribute('class') + ' loading'); 

				if ($this.getAttribute('rel') === '0') {
					_this.move(_this.$('div2'), _this.getStyle(_this.$('div2')), 'right', function () {
						$this.setAttribute('rel', '1');
						$this.setAttribute('class', $this.getAttribute('class').replace(/\s*loading/g, ''));  
					});
				} else {
					_this.move(_this.$('div2'), _this.getStyle(_this.$('div2')), 'left', function () {
						$this.setAttribute('rel', '0');
						$this.setAttribute('class', $this.getAttribute('class').replace(/\s*loading/g, '')); 
					});
				}

			};
		},

		/**
		 * @param {object}    obj       DOM对象
		 * @param {object}    css       样式集合
		 * @param {string}    dir       方向
		 * @param {function}  callback  回调
		 */
		move: function (obj, css, dir, callback) {
			var timer         = null,
				_end          = true,
				_screen_width = screen.width,
				_width        = parseInt(css.width),
				offset        = 0,
				speed         = 20;

			switch (dir) {
				case 'left': 
					timer = setInterval(function () {
						offset = obj.clientLeft + obj.offsetLeft - speed;

						if (offset <= 0) {
							_end = true;
							offset = 0;
						} else {
							_end = false;
						}

						if (_end) {
							clearInterval(timer);
							timer = null;
							obj.style.left = offset + 'px';

							callback && callback();
						} else {
							obj.style.left = offset + 'px';
						}
					}, 30);
					break;
				case 'right':
					timer = setInterval(function () {
						offset = obj.clientLeft + obj.offsetLeft + speed;

						if (offset >= _screen_width - _width) {
							_end = true;
							offset = _screen_width - _width;
						} else {
							_end = false;
						}

						if (_end) {
							clearInterval(timer);
							timer = null;
							obj.style.left = offset + 'px';

							callback && callback();
						} else {
							obj.style.left = offset + 'px';
						}
					}, 30);
					break;
				default: 
					break;
			}
	
		}

	}
}());

/*
 * 执行
 */
animate.init();
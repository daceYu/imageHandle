/**!
 * 加载图片核心方法
 * author: yugang <yugang@myhexin.com>
 */


/**
 * chose load `1x` or `2x`
 */
let suffix = (function () {
	let dpr = window.devicePixelRatio > 1 ? 2 : 1;
	let suffix = `_${dpr}x.`;
	return suffix;
})();

/**
 * judge support or not support webp
 * param {Function} callback: callback fucntion
 * explain: 
 *	 window._NOWEBP: 是否启用webp，默认启用
 *   window._WEBP: 是否支持webp 0:不支持，1:支持
 */
let supportWebp = (callback) => {
	let _img = new Image();
	_img.onload = () => {
		window._WEBP = window._NOWEBP ? 0 : 1;
		if (callback) callback();
	}
	_img.onerror = () => {
		window._WEBP = 0;
		if (callback) callback();
	}
	_img.src = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAgA0JaQAA3AA/vuUAAA=";
}

/**
 * render images
 * param {dom Object} objidx: img object
 * param {Function} callback: callback function
 */
let renderNewImg = (objidx, callback) => {
	let _ori = objidx.getAttribute("data-original"); // path
	let _fm = objidx.getAttribute("data-format");	// format

	if (!_ori) {
		console.warn('error! Cannot find "data-original"');
		return false;
	}

	let src = _fm ? `${_ori}${suffix}${_fm}` : _ori;
	// support webp
	if (window._WEBP && _ori.indexOf('.') < 0) {
		src = `${_ori}.webp`;
	}

	let _img = new Image();
	_img.onload = function () {
		objidx.setAttribute('src', _img.src);
		objidx.removeAttribute('data-original');
		objidx.removeAttribute('data-format');
		if (callback) callback.call(this, objidx);
	}
	_img.src = src;
}




module.exports = {
	suffix,
	supportWebp,
	renderNewImg
}
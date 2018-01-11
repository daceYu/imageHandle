/**!
 * 公用方法
 * author: yugang <yugang@myhexin.com>
 */

/**
 * judge Platform is pc
 * return {Boolean} flag: 是否为pc
 */
let isPC = () => {
	let userAgentInfo = navigator.userAgent.toLowerCase();
	let Agents = ["android", "iphone", "symbianos", "windows phone", "ipad", "ipod"];
	let flag = true;
	for (let v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;break;
		}
	}
	return flag;
}

module.exports = {
	isPC
}
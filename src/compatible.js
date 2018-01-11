/**!
 * 兼容处理(IE6+)
 * author: yugang <yugang@myhexin.com>
 */

/** 
 * document.getElementsByClassName
 * Compatible with IE6、IE7、IE8
 */
let getClassName = () => {
	if (!document.getElementsByClassName) {
		document.getElmentsByClassName = (className, element) => {
			let children = (element || document).getElementsByTagName("*");
			let elements = [];
			for (let i = 0; i < children.length; i++) {
				let child = children[i];
				let classNames = child.className.split(" ");
				for (let j = 0; j < classNames.length; j++) {
					if (classNames[j] === className) {
						elements.push(child);
					}
				}
			}
			return elements;
		}
	}
}

/**
 * add Event listener
 * Compatible with IE6、IE7、IE8
 * param {dom Object} object: 绑定对象
 * param {String} name: 事件名称
 * param {Function} handler: 绑定方法
 * param {Boolean} remove: 是否是移除的事件，本参数是为简化下面的removeEvent函数而写的，对添加事件处理程序不起任何作用
 */
let addEvent = (object, name, handler, remove) => {
	if (typeof object != 'object' || typeof handler != 'function') return false;
	
	try {
		let type = remove ? "removeEventListener" : "addEventListener";
		object[type](name, handler, false);
	} catch (e) {
		let xc = `_${name}`;
        object[xc] = object[xc] || [];

        if (remove) {
            let l = object[xc].length;
            for (let i = 0;i < l; i++){
                if(object[xc][i].toString() === handler.toString()) object[xc].splice(i,1);
            }
        }else{
            let l = object[xc].length;
            let exists = false;
            for (let i = 0;i < l;i ++) {                                                
                if(object[xc][i].toString() === handler.toString()) exists=true;
            }
            if(!exists) object[xc].push(handler);
        }

        object[`on${name}`] = () => {
            let l = object[xc].length;
            for(let i = 0;i < l; i++){
                object[xc][i].apply(object, arguments);
            }
        }
	}
}

/**
 * remove Event listener
 */
let removeEvent = (object, name, handler) => {
	addEvent(object, name, handler, true);
}



module.exports = {
	getClassName,
	addEvent,
	removeEvent
}
/**!
 * ImgLoad 图片加载
 * 针对图片过多或过大的页面，可使用该插件选择合适的图片加载方式。目前支持顺序加载、延时加载以及懒加载。
 * 
 * author: yugang <yugang@myhexin.com>
 *
 * @ 兼容
 * PC端——IE6+(IE6不支持base64格式图片)；移动端。
 * v2.1新增: 支持webp格式 (如设置`window._NOWEBP = true`，则不使用webp格式)
 *
 * @ 参数
 * param {Object} type(配置options): 必选 onebyone顺序加载 || timeout延时加载 || lazyload懒加载
 * param {String} domclass(配置options): 必选 图片检索class
 * param {dom Object} container(配置options): 可选 加载容器
 *
 * @ 方法
 *  init(param): 触发加载器；
 *      param {String} type为'lazyload'时，param表示页面加载完时最多渲染图片的数量；type为'timeout'时，param表示延时的时间间隔，默认为500ms
 *  justrender(obj): 函数单加载某张图片；
 *      param {dom Object} obj：需要加载的img节点；
 *
 * @ Example
 * dom:
 *   <img class="imgload" src="base64" data-original='images/banner' data-format='png'>
 * js:
 *   let imgload = new ImgLoad({
 *      type: "lazyload",
 *      domclass: "imgload"
 *   })
 *   imgload.init();
 */
import core from './core';
import compatible from './compatible';
import common from './common';

/**
 * 构造函数
 * param {Object} type(配置options): 必选 onebyone顺序加载 || timeout延时加载 || lazyload懒加载
 * param {String} domclass(配置options): 必选 图片检索class
 * param {dom Object} container(配置options): 可选 加载容器
 */
function ImgLoad (options) {
    if (!options.type) {
        console.warn("error! Cannot find load type");
        return false;
    }

    [this.type, this.domclass, this.container = document] = [
        options.type, options.domclass, options.container ];

    compatible.getClassName();
    this.oriImgs = this.container.getElementsByClassName(this.domclass);
}

/**
 * initialize function 
 * param {String} param: 可选参数
 *    type为'lazyload'时，param表示页面加载完时最多渲染图片的数量
 *    type为'timeout'时，param表示延时的时间间隔，默认为500ms
 */
ImgLoad.prototype.init = function (param) {
    let init = () => {
        switch (this.type) {
            case 'lazyload': 
                this.lazyload(param);
                break;
            case 'timeout':
                this.timeout(param);
                break;
            case "onebyone":
                this.onebyone();
                break;
            default: 
                console.warn("error! Unsupported type");
        }
    }
    core.supportWebp(init);
}

/**
 * load one by one 顺序加载
 */
ImgLoad.prototype.onebyone = function () {
    let loading = (objidx, index) => {
        // replace className caused oriImgs.length--
        objidx.className = objidx.className.replace(this.domclass, '');

        if (this.oriImgs.length > 0) {
            core.renderNewImg(this.oriImgs[0], loading);
        }  
    }
    core.renderNewImg(this.oriImgs[0], loading);
}

/** 
 * timeout 延时加载
 * param {String} time: 延时的时间间隔，默认为500ms
 */
ImgLoad.prototype.timeout = function (time = 500) {
    let loading = (objidx, index) => {
        // console.log(this.oriImgs.length);
    }

    let _func = (i) => {
        return () => {
            console.log(i);
            core.renderNewImg(this.oriImgs[i], loading);
        }
    }
    for (var i = 0; i < this.oriImgs.length; i++) {
        var _time = i * time;
        setTimeout(_func(i), _time);
    }
}

/**
 * lazyLoad
 * param {String} length:页面加载完时最多渲染图片的数量，默认全部渲染
 */
ImgLoad.prototype.lazyload = function (length) {
    const isPC = common.isPC();
    const winHeight = parseInt(window.innerHeight || document.documentElement.clientHeight),
        winWidth = parseInt(window.innerWidth || document.documentElement.clientWidth);
    let eventName = isPC ? "scroll" : "touchmove";

    let init = () => {
        // No rendering object exists
        if (this.oriImgs.length < 1) {
            compatible.removeEvent(window, eventName, init);
            return false;
        }
        scrollEnd(render);
    }

    // scroll handler
    let scrollEnd = (cb) => {
        let pos1 = document.documentElement.scrollTop || document.body.scrollTop;

        // handler scorll fast
        let timer = setInterval( () => {
            let pos2 = document.documentElement.scrollTop || document.body.scrollTop;
            if (Math.abs(pos1 - pos2) < 1.5) {
                clearInterval(timer);
                cb();
            } else {
                pos1 = pos2;
            }
        }, 35)
    }

    // render
    let render = (length) => {
        let scTop = document.documentElement.scrollTop || document.body.scrollTop;
        scTop = parseInt(scTop);
        // 默认值
        if (!length) length = this.oriImgs.length;

        let loading = (objidx) => {
            objidx.className = objidx.className.replace(this.domclass, "");
        }

        for (let i = 0; i < length; i++) {
            let _height = this.oriImgs[i].offsetHeight,
                _top = parseInt(this.oriImgs[i].offsetTop);

            // judge render images or not
            if (scTop + winHeight + _height >= _top && _top >= scTop - _height) {
                core.renderNewImg(this.oriImgs[i], loading);
            }
        }
    }

    render(length);
    compatible.addEvent(window, 'load', function () {
        compatible.addEvent(window, eventName, init);
    });
}

/**
 * just render one image
 * param {dom Object} obj: image object 
 */
ImgLoad.prototype.justRender = function (obj) {
    core.renderNewImg(obj);
}


module.exports = ImgLoad;

# imageHandle
Deal with the load of the picture and optimize the performance

[Blog Link](http://daceyu.com/2018/01/09/node_builder/)

## Support
- 顺序加载
- 延时加载
- 懒加载
- 指定单张图片加载

## Version
___v1.0___  根据不同设备加载`1x`、`2x`图
___v2.0___  支持顺序加载、延时加载
___v2.1___  支持懒加载
___v2.2___  支持`webp`格式

## Usage

大致使用如下：

```javascript
import ImgLoad from './imgload';
let imgload = new ImgLoad({
    type: "",
    domclass: "",
    container: ""
})
imgload.init(param);

imgload.justRenter($dom);
```

参数说明：

`type: onebyone | lazyload | timeout`：___必须参数___  加载方式，分别对应顺序加载、懒加载、延时加载

`domclass`：___必须参数___  图片对象的`className`

`container`：___可选参数___  加载容器

`param`：___可选参数___  




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

`type: onebyone | lazyload | timeout`：必须参数  加载方式，分别对应顺序加载、懒加载、延时加载

`domclass`：必须参数  图片对象的`className`

`container`：可选参数  加载容器

`param`：可选参数 

​	`type:lazyload`时，`param`表示页面加载完时最多渲染图片的数量

​	`type:timeout`时，`param`表示延时的时间间隔，默认为500ms

`$dom`：需要加载的img节点



## imagine

这里实现了图片加载的处理，但是感觉每次开发，拿到UI稿都需要切很多图啊，`1x`、`2x`、`webp`、`base64`，这样子还没开发就浪费很多时间了，有没有什么办法来提升下效率呢？请关注后面的分享。


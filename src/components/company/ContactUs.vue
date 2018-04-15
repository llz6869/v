<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <div class="company">
            <div class="half-title">联系我们</div>
            <div class="content">
                <div class="contact-us">
                    <div class="map"></div>
                    <!-- <div style="width:880px;height:450px;border:#ccc solid 1px;margin: 25px 0;" id="dituContent"></div> -->
                    <p>公司地址：北京朝阳区光华路甲8号和乔大厦B座503-508</p>
                    <p>客服电话：400-770-6678（9:00-21:00）</p>
                    <p>QQ客服：3461949153</p>
                    <!-- <p>在线客服：
                        <router-link to="" class="orange-contact">点击咨询</router-link>
                    </p> -->
                    <div class="client clearfix">
                        <div class="app fl"></div>
                        <div class="subscribe fl"></div>
                        <div class="service fl"></div>
                        <div>
                            <div class="words fl">APP客户端下载</div>
                            <div class="words fl">关注订阅号</div>
                            <div class="words fl">关注服务号</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import ComponyAside from '../public/Aside';

    export default {
        metaInfo: {
            title: '联系我们_公司地址-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '联系我们,金谷财行地址'
            }]
        },
        name: 'contactUs',
        components: {
            'my-aside': ComponyAside
        },
        data () {
            return {
                navType: 'company',
                // markerArr: [{
                //     title: '我的标记',
                //     content: '北京朝阳区光华路甲8号和乔大厦B座503-508',
                //     point: '116.476984|39.918495',
                //     isOpen: 1,
                //     icon: {w: 21, h: 21, l: 0, t: 0, x: 6, lb: 5}
                // }
                // ]
            };
        },
        mounted () {
            this.init();
            //this.initMap();

        },
        methods: {
            init: function () {
                // 此处是客服弹框的代码
                // let script = document.createElement('script')
                // script.setAttribute('type', 'text/javascript')
                // script.setAttribute('src', '//www.sobot.com/chat/frame/js/entrance.js?sysNum=bc476ec3aac745dea021b987a535b4e7')
                // script.setAttribute('class', 'orange-contact')
                // script.setAttribute('id', 'zhichiScript')
                // script.setAttribute('data-args', 'uname=小智&age=2&partnerId=${userId}')
                // script.setAttribute('charset', 'utf-8')
                // document.getElementsByClassName('orange-contact')[0].appendChild(script)
            }
            //创建和初始化地图函数：
            // initMap: function () {
            //     this.createMap();//创建地图
            //     this.setMapEvent();//设置地图事件
            //     this.addMapControl();//向地图添加控件
            //     this.addMarker();//向地图中添加marker
            // },

            //创建地图函数：
            // createMap: function () {
            //     var map = new BMap.Map('dituContent');//在百度地图容器中创建一个地图
            //     var point = new BMap.Point(116.478138, 39.918751);//定义一个中心点坐标
            //     map.centerAndZoom(point, 18);//设定地图的中心点和坐标并将地图显示在地图容器中
            //     window.map = map;//将map变量存储在全局
            // },

            //地图事件设置函数：
            // setMapEvent: function () {
            //     map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
            //     map.enableScrollWheelZoom();//启用地图滚轮放大缩小
            //     map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
            //     map.enableKeyboard();//启用键盘上下左右键移动地图
            // },

            //地图控件添加函数：
            //addMapControl: function () {
                //向地图中添加缩放控件
                // var ctrl_nav = new BMap.NavigationControl({
                //     anchor: BMAP_ANCHOR_TOP_LEFT,
                //     type: BMAP_NAVIGATION_CONTROL_LARGE
                // });
                //map.addControl(ctrl_nav);
                //向地图中添加缩略图控件
                //var ctrl_ove = new BMap.OverviewMapControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1});
                //map.addControl(ctrl_ove);
                //向地图中添加比例尺控件
                //var ctrl_sca = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});
                //map.addControl(ctrl_sca);
            //},

            //标注点数组
            //创建marker
            // addMarker: function () {
            //     let that = this;
            //     for (var i = 0; i < this.markerArr.length; i++) {
            //         var json = that.markerArr[i];
            //         var p0 = json.point.split('|')[0];
            //         var p1 = json.point.split('|')[1];
            //         var point = new BMap.Point(p0, p1);
            //         var iconImg = that.createIcon(json.icon);
            //         var marker = new BMap.Marker(point, {icon: iconImg});
            //         var iw = that.createInfoWindow(i);
            //         var label = new BMap.Label(json.title, {'offset': new BMap.Size(json.icon.lb - json.icon.x + 10, -20)});
            //         marker.setLabel(label);
            //         map.addOverlay(marker);
            //         label.setStyle({
            //             borderColor: '#808080',
            //             color: '#333',
            //             cursor: 'pointer'
            //         });

            //         (function () {
            //             var index = i;
            //             var _iw = that.createInfoWindow(i);
            //             var _marker = marker;
            //             _marker.addEventListener('click', function () {
            //                 this.openInfoWindow(_iw);
            //             });
            //             _iw.addEventListener('open', function () {
            //                 _marker.getLabel().hide();
            //             })
            //             _iw.addEventListener('close', function () {
            //                 _marker.getLabel().show();
            //             })
            //             label.addEventListener('click', function () {
            //                 _marker.openInfoWindow(_iw);
            //             })
            //             if (!!json.isOpen) {
            //                 label.hide();
            //                 _marker.openInfoWindow(_iw);
            //             }
            //         })()
            //     }
            // },
            //创建InfoWindow
            // createInfoWindow: function (i) {
            //     var json = this.markerArr[i];
            //     var iw = new BMap.InfoWindow('<b class=\'iw_poi_title\' title=\'' + json.title + '\'>' + json.title + '</b><div class=\'iw_poi_content\'>' + json.content + '</div>');
            //     return iw;
            // },
            //创建一个Icon
            // createIcon: function (json) {
            //     var icon = new BMap.Icon('https://map.baidu.com/image/us_mk_icon.png', new BMap.Size(json.w, json.h), {
            //         imageOffset: new BMap.Size(-json.l, -json.t),
            //         infoWindowOffset: new BMap.Size(json.lb + 5, 1),
            //         offset: new BMap.Size(json.x, json.h)
            //     })
            //     return icon;
            // }
        }
    }
</script>
<style lang="scss">
    @import '../../assets/css/company.scss';
</style>

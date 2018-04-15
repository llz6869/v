<template>
    <div class="img-box">
        <img :src="src" @click="showBigImg();" :alt="alt || ''" />
        <div class="img-big" v-show="isDn" :style="'width: ' + wStr + ';height: ' + hStr + ';margin: -' + (orgH/2) + 'px 0 0 -' + (orgW/2) + 'px;'">
            <!-- <div class="img-big-con" :style="'height: ' + h + 'px;'"> -->
            <div class="img-close" @click="showBigImg();"></div>
            <img :src="src" :alt="alt || ''" ref="orgImg">
            <!-- </div> -->
        </div>
        <div class="img-mask" v-show="isDn"></div>
    </div>
</template>
<script>
    export default {
        props:[
            'src', 'alt'
        ],
        data() {
            return {
                isDn: false,
                orgH: 0,
                orgW: 0,
                wStr: '', 
                hStr: ''
            }
        },
        methods: {
            showBigImg(){
                this.isDn = !this.isDn;
                if(this.isDn){
                    this.orgH = this.$refs.orgImg.height;
                    if(this.orgH > 600) {
                        this.orgH = 600;
                        this.hStr = this.orgH + 'px';
                    }
                    this.orgW = this.$refs.orgImg.width;
                    if(this.orgW > 800) {
                        this.orgW = 800;
                        this.wStr = this.orgW + 'px';
                    }
                }
            }
        },
    }
</script>
<style lang="scss">
    .img-box{
        display: $dib;
        img{cursor: pointer;}
        .img-big{
            position: fixed;top: 50%;left: 50%;max-height: 100%;max-width: 100%;z-index: 110;text-align: center;
            .img-big-con{position: relative;}
            img{width: auto !important;height: auto !important; max-width: 100%;max-height: 100%;cursor: default;text-align: center;}
            .img-close{position: absolute;right: -72px;top: 0;width: 27px;height: 27px;background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbBAMAAAB/+ulmAAAAHlBMVEUAAAD///////////////////////////////////8kfJuVAAAACXRSTlMA1RYXKr/4viuECUl5AAAAe0lEQVQY02XQsQ2DQAyF4acoE5A06ZIiomUEOlpaehpGoKNhABrm5dAv+wnhwvb5k++kU/dVRt1qqPL0+PT6bcGlbcqoSnxJcKDgQNgIG2EwGDSDwe9z37yXdcdzGnXT265vhv0uDJICyUaKkeopDUMzmDxf/3lNlP7LAafFG8a1HdOqAAAAAElFTkSuQmCC) center center no-repeat;cursor: pointer;z-index: 110;}
        }
        .img-mask{position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: $c0;opacity: .4;z-index: 109; }
    }
</style>

<template>
  <!-- modal start -->
  <div v-if="show">
    <div class="modal-mask"></div>
    <div class="modal-box" ref="modalBox" :style="'margin-top: -'+h+'px;'">
        <div class="modal-title"><span>{{title || '系统提示'}}</span><div class="modal-close" @click="close"></div></div>
        <div class="modal-container">
          <slot name="context"></slot>
        </div>
        <div class="modal-submit">
          <slot name="button"></slot>
          <button v-if="isBtnShow" class="btn ok" @click="close">关闭</button>
        </div>
        <div class="modal-tips">
          <slot name="tips"></slot>
        </div>
    </div>
  </div>
  <!-- modal end -->
</template>

<script>
export default {
  props:['title', 'show'],
  data(){
    return {
      btnHTML: '', // 按钮列表
      isBtnShow: false, // 如果没有按钮
      myShow: this.show,
      isAuto: true,
      h: 0 // 距离上部高度
    }
  },
  mounted(){
    if(!this.$slots.button){
      this.isBtnShow = true;
    }
  },
  updated(){
    if(this.show){
      this.h = (this.$refs.modalBox.offsetHeight/2);
    }
  },
  methods:{
    close(){
      this.$emit('update:show', false)
    }
  }
}
</script>
<style lang="scss">

/* 弹框 start */
.modal-mask{position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 999;background-color: $c0;opacity: .4;}
.modal-box{
    position: fixed;top: 50%;left: 50%;width: 750px;margin:-400px 0 0 -375px;background-color: $cf;z-index: 1000;/*transform:translate(-50%,-50%);*/

    .modal-title{
        padding: 20px 50px;font-size: $px18;color: $c3;border-bottom: 1px solid #eee;font-weight: bold;

        .modal-close{float: right;display: $dib;width: 20px;height: 20px;margin: 5px 0 0;background: $cf url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAAG1BMVEUAAABmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZ8aTmeAAAACHRSTlMA1hcYv74qKZa/UywAAABcSURBVAjXRc7RCcAgDIThoyPYlz7qBp2idIN2gK7QAQQHN94vKCjJhzmiP8tne3QnytJUajYee9zBIacGgzKDZiNshI0wgavkA9mMwYSliW5B9zwAiLxr9S/QfHXi5hIzcEgAsAAAAABJRU5ErkJggg==) center center no-repeat;cursor: pointer;}
    }
    .modal-container{
        min-height: 50px;padding: 0 50px;background-color: #fff;
        .h3{margin:20px 0;text-align: center;font-size: 24px;color: $c6;}
        .text{margin:20px 0;text-align: center;font-size: $px16;color: $c6;}
        .text-left{margin:20px 0;text-align: left; font-size: $px16;color: $c6;}
    }
    .modal-submit{
        padding: 30px;@extend .m-auto; background-color: $cf;text-align: center;
        button, a{
            display: $dib;width: 140px;height: 42px; line-height: 42px; margin:0 15px;font-size: $px16;color: $cef6c2d;background-color: $cf;border: 1px solid $cef6c2d;cursor:pointer;transition:all .35s;

            &:hover{background-color: #e6e6e6;border-color: #e6e6e6;}
            &.ok{
                color: $cf;background-color: $cef6c2d;

                &:hover{background-color: #dd5919;}
            }
            /*空心btn start*/ 
            &.hollow{ 
                height: 42px; color: $cef6c2d; background-color: $cf; border: 1px solid $cef6c2d; 
                
                &:hover{color: $cf;background-color: $cef6c2d;}
            }
            /*空心btn end*/
            &:disabled{
                background-color: #bbb;border: 1px solid #bbb;cursor: not-allowed;
                &:hover{background-color: #bbb;border: 1px solid #bbb;cursor: not-allowed;}
            }
            &.loading{
                background-color: #dd5919;color: #dbdbdb;border: 1px solid $cef6c2d;cursor: not-allowed;
                &:hover{background-color: #dd5919;border: 1px solid $cef6c2d;}
            }
        }
    }
    .modal-tips{background-color: #fcfcfc;}

    @media only screen and (max-height: 768px) {
      .modal-container{max-height: 300px;overflow-y: auto;}
    }
}
/* 弹框 end */
</style>


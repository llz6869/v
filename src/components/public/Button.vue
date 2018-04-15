<template>
  <button @click="btnSubmit" :disabled="btnDisabled" class="public-btn">{{btnText}}</button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
      default: '提交'
    }
  },
  data () {
    return {
      btnText: this.text,
      btnDisabled: false
    }
  },
  methods: {
    btnSubmit() {
      this.btnDisabled = true;
      this.$emit('btnCallback', this.btnDisabled);
    },
    setDisabled(val) {
      this.btnDisabled = val;
    }
  }
}
</script>

<style lang="scss">
  .public-btn{
    display: $dib;width: 100%;height: 38px;text-align: center;line-height: 38px;background-color: $cef6c2d;color: $cf;font-size: $px14;border: 1px solid $cef6c2d;border-radius:4px;cursor: pointer;transition: all .35s;

    &:hover{background-color: #dd5919;border: 1px solid #dd5919;}
    &.disabled,&:disabled{background-color: #bbb;border-color: #bbb;cursor: not-allowed;}
  }
</style>

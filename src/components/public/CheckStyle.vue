<template>
  <span class="check-style" :class="{active: checked}" @click="setChecked"></span>
</template>

<script>

export default {
  props: ['isChecked'],
  data() {
    return {
      checked: this.isChecked
    }
  },
  methods: {
    setChecked() {
      this.checked = !this.checked;
      this.$emit('update:isChecked', this.checked);
    }
  },
  watch:{
    isChecked: function(val){
    }
  }

}
</script>

<style lang="scss">
  .check-style{
    float: left;display: $dib;width: 14px;height: 14px;margin-right:10px;background-color: $cf;border: 1px solid #bbb;border-radius: 3px;
    &.active{background: $cef6c2d url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAJBAMAAAD0ltBnAAAALVBMVEUAAAD///////////////////////////////////////////////////////+hSKubAAAADnRSTlMAB+q1K/iRZkjKo4FoDn8hdt0AAAA1SURBVAjXYwABlg1gyuk5mKNnyCDcwOD0WIChLgLEYWB7egjIYWDIe2cIUsD5SACsfC0QAwBKdgsXyIWh6AAAAABJRU5ErkJggg==) center center no-repeat;border-color: $cef6c2d;}
  }
</style>


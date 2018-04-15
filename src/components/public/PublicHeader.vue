<template>
  <div>
    <my-header></my-header>
    <router-view></router-view>
    <my-footer></my-footer>
  </div>
</template>

<script>
    import myFooter from './Footer.vue'
    import myHeader from './Header.vue'

    export default {
      components: {
        'my-footer': myFooter, 'my-header': myHeader
      }
    }
</script>

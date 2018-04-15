<template>
  <div class="choose-wrapper">
        <ul class="choose clearfix">
            <li>{{chooseTitle}}：</li>
            <li @click="refurbish(item, index)" v-for="(item,index) in chooseArray" v-bind:key="item.id" :class="{active: index == nowIndex}"><span>{{item.title}}</span></li>
        </ul>
    </div>
</template>
<script>

    import Bus from '../../router/bus'
    export default {
        data(){
            return {
                nowIndex: 0
            }
        },
        props:[
            'chooseTitle', 'chooseArray', 'status'
        ],
        methods: {
            refurbish(item, index){
                // 触发事件，设置分页为1
                this.nowIndex = index
                Bus.$emit('setCurrentPage', 1)
                this.$emit('update:status', item.id)
            }
        }
    }
</script>

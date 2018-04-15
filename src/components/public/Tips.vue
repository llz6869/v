<!-- tip 组件 待续.... -->
<template>
    <div class="tip-container">
        <div class="tip-arrow" :class="cssDirection"></div>
        <div class="tip-context" v-if="context">{{context}}</div>
    </div>
</template>
<script>
    export default {
        props: {
            context: { type: String, default: '' },
            direction: { type: String, default: 'top' }
        },
        data(){
            return {
                cssDirection: 'top'
            }
        },
        method:{
            setCssDirection(){

            }
        }
    }
</script>

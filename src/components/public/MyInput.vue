<template>
    <div class="xyz">
        <input :type="myType" :value="xValue" placeholder="" autocomplete="off" minlength="6" maxlength="11"/>
        <!-- 
        <slot name="input"></slot>
        <slot name="error"></slot>
        <slot name="addon"></slot>
         -->

    </div>
</template>

<script>
    export default{
        data(){
            return {
                xValue:this.myValue
            }
        },
        props: {
            myType: {// 类型
                type: String,
                default: 'text'
            },
            placeholder: {// 
                type: String,
                default: ''
            },
            myValue: {// 
                type: Object,
                default: null
            }

        }
    }
</script>


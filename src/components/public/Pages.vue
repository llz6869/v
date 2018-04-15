<template>
    <div v-if="total<=0"></div>
    <div v-else class="p-layer">
        <div class="pagination">
            <a class="first" :class="{'disabled': current <= 1}" href="javascript:;" @click="setCurrent(1)">首页</a>
            <a :class="{'disabled': (current == 1 )}" href="javascript:;" @click="setCurrent(current-1)">上一页</a>
            <a v-for="p in grouplist" :class="{'active': current == p.val}" href="javascript:;" @click="setCurrent(p.val)" :key="p.id">{{ p.text }} </a>
            <a href="javascript:;" :class="{'disabled': current == page}" @click="setCurrent(current+1)">下一页</a>
            <a href="javascript:;" :class="{'disabled': current >= page}" @click="setCurrent(page)">尾页</a>
        </div>
    </div>
</template>

<script>

    import Bus from '../../router/bus'

    export default{
        data(){
            return {
                current: this.currentPage
            }
        },
        props: {
            total: {// 数据总条数
                type: Number,
                default: 0
            },
            display: {// 每页显示条数
                type: Number,
                default: 10
            },
            currentPage: {// 当前页码
                type: Number,
                default: 1
            },
            pagegroup: {// 分页条数
                type: Number,
                default: 10,
                coerce: function (v) {
                    v = v > 0 ? v : 5;
                    return v % 2 === 1 ? v : v + 1;
                }
            }
        },
        computed: {
            page: function () { // 总页数
                return Math.ceil(this.total / this.display);
            },
            grouplist: function () { // 获取分页页码
                var len = this.page, temp = [],list = [], count = Math.floor(this.pagegroup / 2), center = this.current;
                if (len <= this.pagegroup) {
                    while (len--) {
                        temp.push({text: this.page - len, val: this.page - len});
                    }
                    return temp;
                }

                while (len--) {
                    temp.push(this.page - len);
                }

                var idx = temp.indexOf(center);
                (idx < count) && ( center = center + count - idx);
                (this.current > this.page - count) && ( center = this.page - count);
                temp = temp.splice(center - count - 1, this.pagegroup);
                do {
                    var t = temp.shift();
                    list.push({
                        text: t,
                        val: t
                    });
                } while (temp.length);

                return list;
            }
        },
        methods: {
            setCurrent: function (idx) {
                // 非父子组件通信
                // 监听事件，e为接收的数据
                Bus.$on('setCurrentPage', (e) => {
                    // 重置分页
                    this.current = e
                })
                if (this.current != idx && idx > 0 && idx < this.page + 1) {
                    this.current = idx;
                    this.$emit('pagechange', this.current);
                }
            }
        }
    }
</script>


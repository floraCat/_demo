<template>
    <div class="test">
        <div @click="push">push</div>
        <div @click="del">del</div>
        <div @click="del_arr">del_arr</div>
        <div @click="mod">mod</div>
        <ol class="ol">
            <li v-for="li in list">
                <span v-for="x in li.t2">{{x.x1}} --- {{x.x2}}</span>
            </li>
        </ol>
    </div>
</template>
<style>
    .test div {
        margin-bottom: 20px;
    }
</style>
<script>
export default {
    name: 'test',
    data () {
        return {};
    },
    computed: {
        list () {
            return this.$store.state.sheet.testList;
        }
    },
    methods: {
        push () {
            let _item = {
                t2: [
                    {
                        x1: 'aaa',
                        x2: 'bbb'
                    }
                ]
            };
            this.$store.commit('testListPush', _item);
            console.log('----------push');
            console.log(this.$store.state.sheet.testList);
        },
        del () {
            this.list.map((x,i) => {
                if (x.t2.length <= 0) {
                    //this.list.splice(i,1);
                    this.$store.commit('testListDel', i);
                }
            });
            console.log('----------del');
            console.log(this.$store.state.sheet.testList);
        },
        del_arr () {
            delete this.list[0].t2.x1;
        },
        mod () {
            this.list.map((x) => {
                if (x.t2.length <= 0) {
                    x.t2 = '555';
                }
            });
        }
    }
};
</script>

<style lang="scss">

</style>

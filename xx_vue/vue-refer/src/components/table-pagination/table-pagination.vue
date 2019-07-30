<template>
    <div class="table-pagination">
        <div class="table-pagination-head">
            <div class="table-pagination-head-tools">
                <slot name="head"></slot>
            </div>

            <div class="table-pagination-head-pagination" v-if="paginationShow">
                <el-pagination background layout="prev, total, slot, next" :total="total || 0" :page-size="pageSize"
                               :current-page="currentPage"
                               @prev-click="$emit('prev')" @next-click="$emit('next')">
                    <div class="table-pagination-head-pagination-count">
                        {{total === 0 || !total? 0 : currentPage}}/{{Math.ceil(total/pageSize)}}
                    </div>
                </el-pagination>
            </div>
        </div>

        <div class="table-pagination-content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'table-pagination',
        props: {
            total: {
                type: Number,
                default: 0
            },
            currentPage: {
                type: Number,
                default: 0
            },
            pageSize: {
                type: Number,
                default: 20
            },
            paginationShow: {
                type: Boolean,
                default: true
            }
        },
        data: function () {
            return {};
        },
        computed: {
            selection: function () {
                return this.$refs.table.selection;
            }
        },
        methods: {},
        mounted: function () {
        }
    };
</script>

<style lang="scss">
    .table-pagination {
        position: relative;
        height: 100%;
        width: 100%;
        overflow: auto;
        $head-height: 44px;
        &-head {
            display: flex;
            align-items: center;
            position: relative;
            width: 100%;
            height: $head-height;
            padding: 0 15px;
            border-bottom: 1px solid #ccc;
            &-tools {
                display: inline-block;
                position: relative;
                vertical-align: middle;
                flex: 1;
            }
            &-pagination {
                display: inline-block;
                float: right;
                &-count {
                    display: inline-block;
                    font-size: 13px;
                    height: 28px;
                    line-height: 28px;
                    color: #606266;
                    font-weight: normal;
                    padding-right: 4px;
                }
                .el-pagination__total {
                    padding-left: 4px;
                }
            }
        }

        &-content {
            position: relative;
            height: calc(100% - #{$head-height});
            width: 100%;
            overflow: auto;
        }
    }
</style>

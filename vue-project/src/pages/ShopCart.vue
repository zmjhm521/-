<template>
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
            <div class="cart-body">
                <ul class="cart-list" v-for="(cartInfo, index) in cartInfoList" :key="cartInfo.id">
                    <li class="cart-list-con1">
                        <input type="checkbox" name="chk_list" :checked="cartInfo.isChecked == 1"
                            @change="changeChecked(cartInfo, $event)">
                    </li>
                    <li class="cart-list-con2">
                        <img :src="cartInfo.imgUrl">
                        <div class="item-msg">{{ cartInfo.skuName }}</div>
                    </li>
                    <li class="cart-list-con4">
                        <span class="price">{{ cartInfo.cartPrice }}</span>
                    </li>
                    <li class="cart-list-con5">
                        <a href="javascript:void(0)" class="mins" @click="handler('minus', -1, cartInfo)">-</a>
                        <input autocomplete="off" type="text" :value="cartInfo.skuNum" minnum="1" class="itxt"
                            @change="handler('change', $event.target.value * 1, cartInfo)">
                        <a href="javascript:void(0)" class="plus" @click="handler('add', 1, cartInfo)">+</a>
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">{{ cartInfo.cartPrice * cartInfo.skuNum }}</span>
                    </li>
                    <li class="cart-list-con7">
                        <a @click="deleteCartList(cartInfo)" class="sindelet">删除</a>
                        <br>
                        <a href="#none">移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cart-tool">
            <div class="select-all">
                <input class="chooseAll" type="checkbox" :checked="isAllChecked" @change="checkedAll1">
                <span>全选</span>
            </div>
            <div class="option">
                <a @click="deleteChecked">删除选中的商品</a>
                <a href="#none">移到我的关注</a>
                <a href="#none">清除下柜商品</a>
            </div>
            <div class="money-box">
                <div class="chosed">已选择
                    <span>0</span>件商品
                </div>
                <div class="sumprice">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney">{{ totalPrice }}</i>
                </div>
                <div class="sumbtn">
                    <a class="sum-btn" @click="goTrade">结算</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import throttle from 'lodash/throttle'
export default {
    name: 'ShopCart',
    mounted() {
        this.getData()
    },
    computed: {
        ...mapGetters(['getCartList']),
        cartInfoList() {
            return this.getCartList.cartInfoList || []
        },
        //  计算产品的总价
        totalPrice() {
            let sum = 0
            let arr = this.cartInfoList
            if (typeof arr != 'undefined') {
                arr.forEach(element => {
                    if (element.isChecked == 1) {
                        sum += element.skuNum * element.cartPrice
                    }
                });
            }
            return sum
        },
        isAllChecked() {
            // 判断底部复选框是否勾选,只要全部元素isChecked都为1则为真否则为假
            return this.cartInfoList.every(item => item.isChecked == 1) && this.cartInfoList != ''
        }
    },
    methods: {
        // 获取个人购物车信息
        getData() {
            this.$store.dispatch('getCartList')
        },
        handler: throttle(async function (type, disNum, cartInfo) {
            // 目前disNum形参：+变化量（1）-变化量（-1）input最终的个数（不是变化量）
            // type区分三个元素
            // cartInfo哪一个产品
            switch (type) {
                case 'add':
                    // 带给服务器变化量
                    disNum = 1
                    break;
                case 'minus':
                    // 判断产品个数大于1带给服务器变化量-1否则为0
                    disNum = cartInfo.skuNum > 1 ? -1 : 0
                    break;
                case 'change':
                    // 用户输入非法
                    // if (!isNaN(disNum)) {
                    //     disNum = disNum > 0 ? parseInt(disNum) - cartInfo.skuNum : 0
                    // } else {
                    //     disNum = 0
                    // }
                    disNum = (isNaN(disNum) || disNum < 0) ? 0 : (parseInt(disNum) - cartInfo.skuNum)
                    break;
            }
            // 派发action
            try {
                // 代表的是修改成功
                await this.$store.dispatch('addOrUpdateShopCart', { skuid: cartInfo.skuId, skuNum: disNum })
                this.getData()
            } catch (error) {
                console.log(error);
            }
        }, 500),
        async changeChecked(cartInfo, event) {
            // 带给夫妇其的参数isChecked,不是布尔值，应该是0|1
            try {
                let checked = event.target.checked ? 1 : 0
                await this.$store.dispatch('checkCart', { skuId: cartInfo.skuId, isChecked: checked })
                this.getData()
            } catch (error) {
                alert(error.message)
            }

            // if (cartInfo.isChecked == 1) {
            //     cartInfo.isChecked = 0
            // } else {
            //     cartInfo.isChecked = 1
            // }
        },
        checkedAll() {
            let arr = this.cartInfoList
            if (typeof arr != 'undefined') {
                arr.forEach(async cartInfo => {
                    checked == 1 ? cartInfo.isChecked = 1 : cartInfo.isChecked = 0
                    try {
                        await this.$store.dispatch('checkCart', { skuId: cartInfo.skuId, isChecked: cartInfo.isChecked })
                        this.getData()
                    } catch (error) {
                        alert(error.message)
                    }
                });
            }
        },
        async checkedAll1(event) {
            try {
                let isChecked = event.target.checked ? 1 : 0
                await this.$store.dispatch('checkedAll', isChecked)
                this.getData()
            } catch (error) {
                alert(error.message)
            }
        },
        async deleteCartList(cartInfo) {
            try {
                // 如果删除成功再次发送请求获取新的数据进行展示
                await this.$store.dispatch('deleteCartList', cartInfo.skuId)
                this.getData()
            } catch (error) {
                alert(error.message)
            }
        },
        // 删除选中的全部产品
        deleteChecked() {
            try {
                let arr = this.cartInfoList
                if (typeof arr != 'undefined') {
                    arr.forEach(async element => {
                        if (element.isChecked == 1) {
                            await this.$store.dispatch('deleteCartList', element.skuId)
                            this.getData()
                        }
                    });
                }
            }
            catch (error) {
                alert(error.message)
            }
        },
        goTrade(){
            this.$router.push('/trade')
        }
    }
}
</script>

<style lang="less" scoped>
.cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
    }

    .cart-main {
        .cart-th {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            overflow: hidden;

            &>div {
                float: left;
            }

            .cart-th1 {
                width: 25%;

                input {
                    vertical-align: middle;
                }

                span {
                    vertical-align: middle;
                }
            }

            .cart-th2 {
                width: 25%;
            }

            .cart-th3,
            .cart-th4,
            .cart-th5,
            .cart-th6 {
                width: 12.5%;

            }
        }

        .cart-body {
            margin: 15px 0;
            border: 1px solid #ddd;

            .cart-list {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                overflow: hidden;

                &>li {
                    float: left;
                }

                .cart-list-con1 {
                    width: 15%;
                }

                .cart-list-con2 {
                    width: 35%;

                    img {
                        width: 82px;
                        height: 82px;
                        float: left;
                    }

                    .item-msg {
                        float: left;
                        width: 150px;
                        margin: 0 10px;
                        line-height: 18px;
                    }
                }

                .cart-list-con4 {
                    width: 10%;
                }

                .cart-list-con5 {
                    width: 17%;

                    .mins {
                        border: 1px solid #ddd;
                        border-right: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }

                    input {
                        border: 1px solid #ddd;
                        width: 40px;
                        height: 33px;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                    }

                    .plus {
                        border: 1px solid #ddd;
                        border-left: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }
                }

                .cart-list-con6 {
                    width: 10%;

                    .sum {
                        font-size: 16px;
                    }
                }

                .cart-list-con7 {
                    width: 13%;

                    a {
                        color: #666;
                    }
                }
            }
        }
    }

    .cart-tool {
        overflow: hidden;
        border: 1px solid #ddd;

        .select-all {
            padding: 10px;
            overflow: hidden;
            float: left;

            span {
                vertical-align: middle;
            }

            input {
                vertical-align: middle;
            }
        }

        .option {
            padding: 10px;
            overflow: hidden;
            float: left;

            a {
                float: left;
                padding: 0 10px;
                color: #666;
            }
        }

        .money-box {
            float: right;

            .chosed {
                line-height: 26px;
                float: left;
                padding: 0 10px;
            }

            .sumprice {
                width: 200px;
                line-height: 22px;
                float: left;
                padding: 0 10px;

                .summoney {
                    color: #c81623;
                    font-size: 16px;
                }
            }

            .sumbtn {
                float: right;

                a {
                    display: block;
                    position: relative;
                    width: 96px;
                    height: 52px;
                    line-height: 52px;
                    color: #fff;
                    text-align: center;
                    font-size: 18px;
                    font-family: "Microsoft YaHei";
                    background: #e1251b;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>
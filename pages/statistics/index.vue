<template>
  <view class="">
  	<u-cell-group>
  		<u-cell-item :arrow="false" v-for="(order,index) in orderInfo" :key="index" @click="assignDetails(order)" :title="order.name"  :label="'编号：'+order.id">
  				<!-- <view class="info-box">
  					<view class="fruit-info">
  						<text class="info-item">价格：{{order.price}} 元/kg</text>
  						<text class="info-item">数量： {{ order.num}} kg</text>
  					</view>	 -->
  					<view class="fruit-info">
  						<text class="info-item">价格：{{order.price}} 元/kg</text>
  						<text class="info-item">库存：{{order.total}} kg</text>
  						<text class="info-item">产地：{{order.from}}</text>
  					</view>
  				<!-- </view> -->
  				
  		</u-cell-item>
  	</u-cell-group>
  	<!-- <u-loadmore @loadmore="loadmoreInfo" :status="status" /> -->
  	<u-back-top :scroll-top="scrollTop"></u-back-top>
  </view>
</template>

<script>
export default {
	name:"",
	data(){
		return{
		scrollTop: 0,
		orderInfo:[
			{
					name: "苹果",
					id: "2020122401",
					price: 12,
					total: 999,
					from: '成都'
				},
				{
					name: "香蕉",
					id: "2020122402",
					price: 16,
					total: 888,
					from: '杭州'
				},
				{
					name: "梨",
					id: "2020122403",
					price: 22,
					total: 777,
					from: '上海'
				},
				{
					name: "橘子",
					id: "2020122404",
					price: 6,
					total: 666,
					from: '北京'
				},
		]
			}
	},
	methods:{},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
}

</script>
<style lang='scss' scoped>
	.u-cell{
		line-height: 34rpx;
		padding: 12rpx 32rpx;
		.fruit-info{
			display: flex;
			flex-direction: column;
			/* text-align: left; */
			.info-item{
				font-size: 20rpx;
			}
		}
	}
	
</style>

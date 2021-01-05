<template>
	<view class="add-info">
		<u-form border-bottom label-width=120 label-align="center" :model="form" ref="uForm">
			<u-form-item label="名称：">
				<u-input v-model="form.name" type="select" @click="show = true" />
			</u-form-item>
			<u-form-item label="编号：">
				<u-input disabled v-model="form.id" />
			</u-form-item>
			<u-form-item label="价格：">
				<u-input disabled v-model="form.price" />
			</u-form-item>
			<u-form-item label="数量：">
				<u-input v-model="form.num" />
			</u-form-item>
			<u-form-item label="应付：">
				<u-input disabled v-model="form.total" />
			</u-form-item>
			<u-form-item label="实付：">
				<u-input v-model="form.actPay" />
			</u-form-item>
			<u-form-item label="差价：">
				<u-input disabled v-model="form.lessPay" />
			</u-form-item>
		</u-form>
		<u-select v-model="show" @confirm="confirm" :list="actionSheetList"></u-select>
		<!-- <u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet> -->
		<u-button class="custom-style" ripple>保存</u-button>
		<!-- <u-cell-group>
  		<u-cell-item :arrow="false" v-for="(order,index) in orderInfo" :key="index" @click="assignDetails(order)" :title="order.name"  :label="'编号：'+order.id">
				<view class="info-box">
					<view class="fruit-info">
						<text class="info-item">价格：{{order.price}} 元/kg</text>
						<text class="info-item">数量： {{ order.num}} kg</text>
					</view>	
					<view class="fruit-info">
						<text class="info-item">总价：{{order.price*order.num}} 元</text>
						<text class="info-item">实付：{{order.actPay}} 元</text>
						<text class="info-item">差价：{{order.price*order.num-order.actPay}} 元</text>
					</view>
				</view>
				
		</u-cell-item>
  	</u-cell-group>
	<u-loadmore @loadmore="loadmoreInfo" :status="status" />
	<u-back-top :scroll-top="scrollTop"></u-back-top> -->
	</view>
</template>

<script>
	export default {
		name: "",
		filters: {
			dateFilter(val) {
				const date = new Date(val);
				let y = date.getFullYear();
				let m = date.getMonth() + 1;
				m = m < 10 ? "0" + m : m;
				let d = date.getDate();
				d = d < 10 ? "0" + d : d;
				let h = date.getHours();
				h = h < 10 ? "0" + h : h;
				let minute = date.getMinutes();
				let second = date.getSeconds();
				minute = minute < 10 ? "0" + minute : minute;
				second = second < 10 ? "0" + second : second;
				return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
			},
		},
		data() {
			return {
				show: false,
				form: {
					id: 2020122401,
					price: 12,
					total: 24,
					lessPay: 0
				},
				title: "派单",
				scrollTop: 0,
				status: 'loadmore',
				lastStatus: false,
				orderInfo: [
				],
				// 分页对象
				listQuery: {
					timeList: [],
					cityId: "",
					page: 1,
					pageSize: 10,
					queryType: "first",
					passengerName: "",
					orderStatus: 0,
					driverPhone: "",
					passengerPhone: "",
					driverName: "",
					isRefund: "",
					startAddress: "",
					endAddress: "",
					isChangePrice: "",
					businessType: "",
					orderChannel: "",
					cancelReason: "",
					orderNo: "",
					vehNo: "",
					userOrderId: "",
					sort: "+id",
					didiOrderId: "",
					orderType: "",
					officeId: "",
				},
				actionSheetList: [{
						value: '苹果',
						label: '苹果'
					},
					{
						value: '香蕉',
						label: '香蕉'
					},
					{
						value: '梨',
						label: '梨'
					},
					{
						value: '橘子',
						label: '橘子'
					}
				],
			}
		},
		methods: {
			confirm(e) {
				this.form.name = e[0].value
				console.log(e);
			},
			loadmoreInfo() {
				if (this.lastStatus) {
					this.$u.toast("没有更多啦！")
				} else {
					this.status = 'loading'
					this.listQuery.page += 1
					this.getOrderList(false)
				}
			},
			assignDetails(order) {
				const appointment = this.$options.filters['dateFilter'](order.appointment)
				const str = '?orderNo=' + order.orderNo + '&passengerName=' + order.passengerName + '&passengerPhone=' + order.passengerPhone +
					'&vehicleTypeStr=' + order.vehicleTypeStr + '&startAddress=' + order.startAddress + '&endAddress=' + order.endAddress +
					'&appointment=' + appointment + '&officeId=' + order.officeId + '&orderStatus=' + order.orderStatus +
					'&driverPhone=' + order.driverPhone + '&driverId=' + order.driverId
				uni.navigateTo({
					url: './assignDetails' + str
				})
			},
			getOrder() {
				this.$u.api.getOrder(this.listQuery).then(res => {
					// console.log(res);
					// this.orderInfo=res.data.records
					if (res.data.records.length == 10) {
						this.orderInfo = [...this.orderInfo, ...res.data.records]
						this.status = 'loadmore'
						this.lastStatus = false
					} else if (res.data.records.length > 0 && res.data.records.length < 10) {
						this.orderInfo = [...this.orderInfo, ...res.data.records]
						this.lastStatus = true
						this.status = 'nomore'
					} else {
						// this.orderInfo=[]
						this.lastStatus = true
						this.status = 'nomore'
					}
				}).catch(err => this.$u.toast(err.msg))
			}
		},
		onReachBottom() {
			// console.log('loadmore');
			if (this.lastStatus) {
				this.$u.toast("没有更多啦！")
			} else {
				this.status = 'loading'
				this.listQuery.page += 1
				this.getOrderList(false)
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		// onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
		// 		// console.log(option); //打印出上个页面传递的参数。
		// 		if(option.type==1){
		// 			this.title="派单"
		// 			this.listQuery.orderStatus=0
		// 			this.getOrder()
		// 		}else if(option.type==2){
		// 			this.title="改派"
		// 			this.listQuery.orderStatus=3
		// 			this.getOrder()
		// 		}
		// 	},
		onReady() {
			// uni.setNavigationBarTitle({
			//     title: this.title
			// });
		}
	}
</script>
<style lang='scss' scoped>
	.add-info {
		background-color: #FFFFFF;

		.u-form-item {
			padding: 12rpx 0;
		}

		.custom-style {
			margin: 24rpx
		}
	}

	/* .u-cell{
		line-height: 34rpx;
		padding: 12rpx 32rpx;
			.info-box{
				display: flex;
				justify-content: space-between;
				margin-left: 60rpx;
				.fruit-info{
					display: flex;
					flex-direction: column;
					text-align: left;
					.info-item{
						font-size: 20rpx;
					}
				}
			}
		
		
	} */
</style>

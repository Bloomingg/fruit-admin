<template>
	<view class="content">
		<u-popup height="50%" v-model="show" mode="top">
			<view class="">
				<u-form :label-style="labelStyle" label-width="200" label-align="left" :model="form" ref="uForm">
					<u-form-item label="名称" prop="name">
						<u-input clearable v-model="form.name" />
					</u-form-item>
					<u-form-item label="销售编号" prop="passengerName">
						<u-input clearable v-model="form.orderNo" />
					</u-form-item>
					<u-form-item label="业务员编号" prop="driverName">
						<u-input clearable v-model="form.serverNo" />
					</u-form-item>
					<u-form-item label="产地" prop="phoneNum">
						<u-input clearable v-model="form.from" />
					</u-form-item>
					<u-form-item label="销售时间" prop="date">
						<u-input placeholder="请选择时间" disabled v-model="form.date" @click="selectDate=true" />
					</u-form-item>
				</u-form>
				<view style="display: flex;">
					<u-button @click="submit">搜索</u-button>
					<u-button @click="reset">重置</u-button>
				</view>
			</view>
		</u-popup>

		<u-picker @confirm="dateConfirm" @cancel="dateCancel" mode="time" v-model="selectDate" :params="params"></u-picker>

		<!-- <u-subsection :list="list" current="0" @change="sectionChange"></u-subsection> -->
		<u-card border-radius="24" @click="orderDetails(order)" v-for="(order,index) in orderInfo" :key="index">
			<view class="" slot="head">
				<view class="my-head">
					<image class="head-img" src="../../static/image/date.png" mode=""></image>
					<text class="date1">{{order.name}}</text>
					<text class="date2">{{order.date}}</text>
					<u-icon class="arrow" name="arrow-right" size="28"></u-icon>
				</view>
			</view>
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">商品编号：{{order.id}}</view>
				</view>
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<view class="u-body-item-title u-line-2">销售编号：{{order.orderNo}}</view>
				</view>
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<view class="u-body-item-title u-line-2">业务员编号：{{order.serverNo}}</view>
				</view>
				<view class="u-body-item u-flex u-row-between u-p-b-0">
					<view class="u-body-item-title u-line-2">产地：{{order.from}}</view>
				</view>
			</view>
			<view class="" slot="foot">
				<view class="order-status order-status1">
					<text class="status-pos">单价：{{order.price}} 元/kg</text>
					<text class="status-pos">数量：{{order.num}} kg</text>
				</view>
				<view class="order-status">
					<text class="status-pos">应付：{{order.price*order.num}} 元</text>
					<text class="status-pos">实付：{{order.actPay}} 元</text>
					<text class="status-pos">差价：{{order.price*order.num-order.actPay}} 元</text>
				</view>
			</view>
		</u-card>
		<u-loadmore @loadmore="loadmoreInfo" :status="status" />
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
	import {
		getToken
	} from "@/utils/app.js"
	export default {
		name: "",
		filters:{
			/**
			 * 时间过滤器
			 */
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
			dateFilter2(val) {
				const date = new Date(val);
				const day = date.getDay()
				let week=""
				if(day == 0) week = "星期日"
				    if(day == 1) week = "星期一"
				    if(day == 2) week = "星期二"
				    if(day == 3) week = "星期三"
				    if(day == 4) week = "星期四"
				    if(day == 5) week = "星期五"
				    if(day == 6) week = "星期六"
				return week;
			},
		},
		data() {
			return {
				labelStyle:{
					marginLeft:"24rpx"
				},
				scrollTop:0,
				status:'loadmore',
				lastStatus:false,
				selectDate: false,
				params: {
					year: true,
					month: true,
					day: true,
				},
				form: {
					orderNo: "",
					passengerName: "",
					driverName: "",
					driverPhone: "",
					pointDate: ""
				},
				// 分页对象
				listQuery: {
					timeList: [],
					cityId: "",
					page: 1,
					pageSize: 10,
					queryType: "first",
					passengerName: "",
					orderStatus: "",
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
				curNow: 0,
				list: [{
						name: "等待应答"
					},
					{
						name: "已接单"
					},
					{
						name: "已完成"
					},
					{
						name: "乘客取消"
					},
					{
						name: "全部订单"
					},
				],
				show: false,
				orderInfo:[
					{
						name:"苹果",
						id:"2020122401",
						orderNo:"asdasfassadsa",
						from:"成都",
						date:"2020-12-24 12:10:23",
						serverNo:"1001",
						price:12,
						num:2,
						actPay:24
					},
					{
						name:"香蕉",
						id:"2020122402",
						orderNo:"asdasfassadsa",
						from:"成都",
						date:"2020-12-24 12:10:23",
						serverNo:"1001",
						price:16,
						num:1,
						actPay:16
					},
					{
						name:"梨",
						id:"2020122403",
						orderNo:"asdasfassadsa",
						from:"成都",
						date:"2020-12-24 12:10:23",
						serverNo:"1001",
						price:22,
						num:3,
						actPay:60
					},
					{
						name:"橘子",
						id:"2020122404",
						orderNo:"asdasfassadsa",
						from:"成都",
						date:"2020-12-24 12:10:23",
						serverNo:"1001",
						price:6,
						num:4,
						actPay:20
					},
				]
			}
		},
		onShow() {
			// this.getOrderList(true)
		},
		methods: {
			loadmoreInfo(){
				if(this.lastStatus){
					this.$u.toast("没有更多啦！")
				}else{
					this.status='loading'
					this.listQuery.page+=1
					this.getOrderList(false)
				}
			},
			// 搜索
			submit() {
				this.listQuery.passengerName = this.form.passengerName
				this.listQuery.driverName = this.form.driverName
				this.listQuery.orderNo = this.form.orderNo
				this.listQuery.driverPhone = this.form.driverPhone
				if (this.form.pointDate != "") {
					let date = this.form.pointDate + ' 00:00:00'
					date = new Date(date)
					date = date.valueOf();
					date = date - 28800000
					let date2 = date + 86399000
					date =  this.$options.filters['dateFilter'](date)
					date2 = this.$options.filters['dateFilter'](date2)
					const dateArr = date.split(" ")
					const dateStr = dateArr[0] + 'T' + dateArr[1] + '.000Z'
					const dateArr2 = date2.split(" ")
					const dateStr2 = dateArr2[0] + 'T' + dateArr2[1] + '.000Z'
					this.listQuery.timeList = [dateStr, dateStr2]
				}
				console.log(this.listQuery);
				this.getOrderList(true)
				this.show = false
			},
			reset() {
				this.listQuery = {
					timeList: [],
					cityId: "",
					page: 1,
					pageSize: 10,
					queryType: "first",
					passengerName: "",
					orderStatus: "",
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
				}
				this.form = {
					orderNo: "",
					passengerName: "",
					driverName: "",
					driverPhone: "",
					pointDate: ""
				}
				this.getOrderList(true)
				this.show = false
			},
			//选择日期
			dateConfirm(param) {
				// console.log(param);
				this.form.pointDate = param.year + '-' + param.month + '-' + param.day
			},
			dateCancel() {
				this.form.pointDate = ""
			},
			// 跳转到详情
			orderDetails(order) {
				const query = '?orderNo='+order.orderNo+'&personalId='+order.personalId+'&queryType='+this.listQuery.queryType+'&orderStatus='+order.orderStatus
				uni.navigateTo({
					url: './orderDetails'+query
				})
			},
			sectionChange(index) {
				this.curNow = index
				this.getOrderList(true)
			},
			getOrderList(isTab) {
				if (this.curNow == 0) {
					this.listQuery.orderStatus = 0;
				} else if (this.curNow == 1) {
					this.listQuery.orderStatus = 3;
				} else if (this.curNow == 2) {
					this.listQuery.orderStatus = 12;
				} else if (this.curNow == 3) {
					this.listQuery.orderStatus = 10;
				} else if (this.curNow == 4) {
					this.listQuery.orderStatus = "";
				}
				if(isTab){
					this.listQuery.page=1,
					this.orderInfo=[]
				}
				this.$u.api.getOrder(this.listQuery).then(res => {
					// console.log(res);
					// this.orderInfo=res.data.records
					if(res.data.records.length==10){
						this.orderInfo=[...this.orderInfo,...res.data.records]
						this.status='loadmore'
					}else if(res.data.records.length>0&&res.data.records.length<10){
						this.orderInfo=[...this.orderInfo,...res.data.records]
						this.lastStatus=true
						this.status='nomore'
					}else{
						// this.orderInfo=[]
						this.lastStatus=true
						this.status='nomore'
					}
				}).catch(err => this.$u.toast(err.msg))
			}
		},
		onNavigationBarButtonTap: function(e) {
			// console.log(JSON.stringify(e))
			this.show = true
		},
		onReachBottom(){
			// console.log('loadmore');
			if(this.lastStatus){
				this.$u.toast("没有更多啦！")
			}else{
				this.status='loading'
				this.listQuery.page +=1 
				this.getOrderList(false)
			}
		},
		onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			}
	}
</script>
<style lang='scss' scoped>
	.content {
		/* background-color: #f3f4f6; */
		/* height: calc(100vh - 94px); */

		.my-head {
			height: 24px;

			.head-img {
				width: 16px;
				height: 16px;
				vertical-align: middle;
			}

			.date1 {
				margin-left: 12px;
				font-weight: bold;
				font-size: 16px;
			}

			.date2 {
				margin-left: 24px;
				font-size: 12px;
			}

			.arrow {
				float: right;
				height: 24px;
				line-height: 24px;
			}
		}

		.order-status {
			display: flex;
			justify-content: space-between;
			/* flex-direction: column; */
			.status-img {
				width: 16px;
				height: 16px;
				vertical-align: middle;
			}

			.status-pos {
				/* margin-left: 12px; */
				font-size: 14px;
			}
		}

		.order-status1 {
			margin-bottom: 5px;
		}
	}

	/deep/.u-card {
		margin-top: 0 !important;
		box-shadow: 2px 2px 12px 1px rgba(0, 0, 0, 0.2) !important;

		.u-card__body,
		.u-card__foot {
			padding: 8px 15px !important;

			.u-body-item-title {
				font-size: 14px;
			}
		}
	}

	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
</style>

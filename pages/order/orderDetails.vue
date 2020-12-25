<template>
	<view class="content">
		<!-- 等待应答 -->
		<u-card border-radius="24" title="等待应答" :show-foot="showFoot">
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">创建时间：{{OrderDetails.createTimeStr|replaceEmp}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">预约时间：{{OrderDetails.appointment|replaceEmp}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">乘客姓名：{{OrderDetails.passengerName|replaceEmp}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">乘客手机：{{OrderDetails.passengerPhone|replaceEmp}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">订单起点：{{OrderDetails.startAddress|replaceEmp}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">订单起点：{{OrderDetails.endAddress|replaceEmp}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">业务类型：{{OrderDetails.businessTypeStr|replaceEmp}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">订单类型：{{OrderDetails.orderType|replaceEmp}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">预估里程：{{OrderDetails.travelMileage|replaceEmp}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">预估时长：{{OrderDetails.travelTimeStr|replaceEmp}}</view>
				</view>
			</view>
		</u-card>

		<!-- 去接乘客 -->
		<u-card border-radius="24" title="去接乘客" :show-foot="showFoot">
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">去接时间：{{OrderDetail.meetCTime|dateFilter}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">司机姓名：{{OrderDetails.driverName|replaceEmp}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">司机手机：{{OrderDetails.driverPhone|replaceEmp}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">车牌号：{{OrderDetails.vehicleNo|replaceEmp}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">司机起点：{{OrderDetail.meetCStartName|replaceEmp}}</view>
				</view>
			</view>
		</u-card>

		<!-- 司机就位 -->
		<u-card border-radius="24" title="司机就位" :show-foot="showFoot">
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">到达时间：{{OrderDetail.driverInPlaceTime|dateFilter}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">到达位置：{{OrderDetail.driverInPlaceStartName|replaceEmp}}</view>
				</view>
			</view>
		</u-card>

		<!-- 开始行程 -->
		<u-card border-radius="24" title="开始行程" :show-foot="showFoot">
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">开始时间：{{OrderDetail.startJourneyTime|dateFilter}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">行程起点：{{OrderDetails.driverStartAddress|replaceEmp}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2"><u-button size="mini" @click="clone">复制行程录音下载地址</u-button></view>
				</view>
			</view>
		</u-card>

		<!-- 行程结束 -->
		<u-card v-if="!isCancle" border-radius="24" title="行程结束" :show-foot="showFoot">
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">结束时间：{{OrderDetail.endJourneyTime|dateFilter}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">行程终点：{{OrderDetails.driverEndAddress|replaceEmp}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">起步价：{{OrderDetails.startFeeStr|replaceEmp}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">行驶时长：{{OrderDetails.travelTimeStr|replaceEmp}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">行驶里程：{{OrderDetails.travelMileage|replaceEmp}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">里程费：{{OrderDetails.mileageFee|replaceEmp}}</view>
				</view>
			</view>
		</u-card>

		<!-- 订单取消 -->
		<u-card v-if="isCancle" border-radius="24" title="订单取消" :show-foot="showFoot">
			<view class="" slot="body">
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">取消时间：{{OrderDetails.cancelOrderTimeStr|replaceEmp}}</view>
				</view>
				<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
					<view class="u-body-item-title u-line-2">取消类型：{{OrderDetails.cancelReasonStr|replaceEmp}}</view>
				</view>
			</view>
		</u-card>
	</view>
</template>

<script>
	export default {
		name: "",
		filters: {
		    replaceEmp(value) {
		      if (value === null || value === "" || value === undefined) {
		        return "暂无数据";
		      }
		      return value;
		    },
		    /**
		     * 时间过滤器
		     */
		    dateFilter(val) {
		      // console.log(val);
		      if (val === undefined || val === "") {
		        return "暂无数据";
		      } else {
		        var date = new Date(val);
		        var y = date.getFullYear();
		        var m = date.getMonth() + 1;
		        m = m < 10 ? "0" + m : m;
		        var d = date.getDate();
		        d = d < 10 ? "0" + d : d;
		        var h = date.getHours();
		        h = h < 10 ? "0" + h : h;
		        var minute = date.getMinutes();
		        var second = date.getSeconds();
		        minute = minute < 10 ? "0" + minute : minute;
		        second = second < 10 ? "0" + second : second;
		        return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
		      }
		    },
		  },
		data() {
			return {
				showFoot: false,
				detailsInfo:{
					orderNo:"",
					orderStatus:"",
					personalId:"",
					queryType:""
				},
				OrderDetail:{},
				OrderDetails:{},
				amrUrl:"",
				isCancle:false
			}
		},
		methods: {
				//复制行程录音地址
			clone(){
				if(this.amrUrl=="暂无"||this.amrUrl==""){
					this.$u.toast("该行程暂无录音或录音文件已过期！")
				}else{
					uni.setClipboardData({
					    data: this.amrUrl,
					    success: function () {
					        console.log('success');
					    }
					});
				}
			},
			getAmr(){
				this.$u.api.getAmr({orderNo:this.detailsInfo.orderNo}).then(res=>{
					console.log(res);
					this.amrUrl=res.data.fileUrl
				}).catch(err=>this.amrUrl="暂无")
			},
			getOrderDetails(){
				this.$u.api.getOrderDetails(this.detailsInfo).then(res=>{
					// console.log(res);
					this.OrderDetails=res.data
				}).catch(err=>this.OrderDetails={})
			},
			getOrderDetail(){
				const str = '?orderNo='+this.detailsInfo.orderNo
				this.$u.api.getOrderDetail(str).then(res=>{
					// console.log(res);
					this.OrderDetail=res.data
				}).catch(err=>this.OrderDetail={})
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		        // console.log(option); //打印出上个页面传递的参数。
				this.detailsInfo.orderNo=option.orderNo
				this.detailsInfo.orderStatus=parseInt(option.orderStatus)
				if(this.detailsInfo.orderStatus==10){
					this.isCancle=true
				}
				this.detailsInfo.personalId=option.personalId
				this.detailsInfo.queryType=option.queryType
				this.getOrderDetails()
				this.getOrderDetail()
				this.getAmr()
		    },
	}
</script>
<style lang='scss' scoped>
	.content {
		background-color: #f3f4f6;
		height: calc(100vh - 94px);

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
			.status-img {
				width: 16px;
				height: 16px;
				vertical-align: middle;
			}

			.status-pos {
				margin-left: 12px;
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
		margin: 6rpx
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
</style>

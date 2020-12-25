<template>
	<view class="content">
		<u-cell-group class="per-info">
			<u-cell-item :arrow="arrow">
				<template slot="title">
					<u-avatar size="mini" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-avatar>
					<text class="per">负责人：{{userName}}</text>
					<!-- <u-image width="164rpx" height="164rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg" shape="circle"></u-image> -->
				</template>
				<view class="info-filed-right">
					<text>城市：{{userCity}}</text>
					<text>级别：{{roleName}}</text>
				</view>
			</u-cell-item>
		</u-cell-group>
		
		<u-cell-group>
			<u-cell-item @click="assign"  icon="order"  :arrow="true">
				<template slot="title">
					<view style="position: relative">
						<text>派单</text>
						<u-badge size="mini" is-center type="error" :count="count"></u-badge>
					</view>
				</template>
			</u-cell-item>
			<u-cell-item @click="reassignment" icon="edit-pen" title="改派"  :arrow="true"></u-cell-item>
			<u-cell-item @click="driverList" icon="list-dot" title="司机列表"  :arrow="true"></u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arrow: false,
				userCity:"",
				userName:"",
				roleName:"",
				count:0,
				next:false,
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
			}
		},
		
		methods: {
		reassignment(){
			uni.navigateTo({
				url:"./assign?type=2"
			})
		},
		assign(){
			uni.navigateTo({
				url:"./assign?type=1"
			})
		},
		driverList(){
			uni.navigateTo({
				url:"./driverList"
			})
		},
		getUserInfo(){
			console.log(22);
			this.userCity=uni.getStorageSync('userCity')
			this.userName=uni.getStorageSync('userName')
			this.roleName=uni.getStorageSync('roleName')
		},
		getOrder(){
			this.$u.api.getOrder(this.listQuery).then(res => {
				// console.log(res);
				if(res.data.records){
					this.count += res.data.records.length
					if(this.count==(this.listQuery.page*10)){
						this.listQuery.page+=1
						this.getOrder()
					}else{
						return
					}
				}else{
					this.count=0
				}
				
			}).catch(err => this.$u.toast(err.msg))
			}
		},
		onShow() {
			this.getUserInfo()
			this.getOrder()
		}
	}
</script>

<style lang="scss">
	/deep/ .per-info{
		.u-cell{
			padding-top: 0;
			padding-bottom: 0;
			 .u-cell__value{
				margin-right: 36rpx;
				.info-filed-right{
					display: flex;
					flex-direction:column;
					justify-content: center;
				}
			}
			 .u-cell_title{
				display: flex;
				.per{
					margin-left: 36rpx;
					align-self: center;
				}
			}
		}
	}
	
	
	.custom-style{
		margin:24rpx
	}
</style>

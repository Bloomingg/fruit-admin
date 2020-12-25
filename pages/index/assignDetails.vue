<template>
	<view class="">
		<u-cell-group>
			<u-cell-item :arrow="arrow" title="预约单号:" :value="detailsInfo.orderNo|replaceEmp"></u-cell-item>
			<u-cell-item :arrow="arrow" :title="'乘客姓名：'+detailsInfo.passengerName|replaceEmp" :value="'乘客手机号：'+detailsInfo.passengerPhone|replaceEmp"></u-cell-item>
			<u-cell-item :arrow="arrow" title="运力类型:" :value="detailsInfo.vehicleTypeStr|replaceEmp"></u-cell-item>
			<u-cell-item :arrow="arrow" :title="'起始点：'+detailsInfo.startAddress|replaceEmp" :value="'目的地：'+detailsInfo.endAddress|replaceEmp|replaceEmp"></u-cell-item>
			<u-cell-item :arrow="arrow" title="预约时间:" :value="detailsInfo.appointment|replaceEmp"></u-cell-item>
		</u-cell-group>

		<!-- 供应商功能 -->
		<view v-if="showSup" class="assign-driver">
			<u-button @click="assignOthers">{{detailsInfo.orderStatus==0?'指派他人':'改派他人'}}</u-button>
			<u-button @click="assignOne">{{detailsInfo.orderStatus==0?'指派司机':'改派司机'}}</u-button>
		</view>
		<!-- 车头功能 -->
		<view v-if="showCaH" class="assign-driver">
			<u-button @click="assignSupplier">{{detailsInfo.orderStatus==0?'指派供应商':'改派供应商'}}</u-button>
			<!-- <u-button @click="showMal=true">指派司机</u-button> -->
		</view>

		<u-popup v-model="showPop" mode="bottom" height="60%">
			<u-collapse>
				<u-collapse-item v-for="(driver,index) in driverList" :key="index">
					<template slot="title">
						<view class="driver-info">
							<text style="margin-bottom: 10rpx;">{{driver.driverName}}</text>
							<text>{{driver.driverPhone}}</text>
						</view>
						<view class="driver-lv">
							<text>运力类型：{{driver.vehType|vehTypefilter}}</text>
						</view>
					</template>
					<view class="item-body">
						<u-cell-group>
							<u-cell-item :arrow="arrow" title="司机城市:" :value="driver.cityName"></u-cell-item>
							<u-cell-item :arrow="arrow" title="当前车牌:" :value="driver.vehNo"></u-cell-item>
							<u-cell-item :arrow="arrow" title="已接单数:" :value="driver.orderCompleted"></u-cell-item>
							<u-cell-item :arrow="arrow">
								<template slot="right-icon">
									<view>
										<u-button @click="confirmAssign2(driver)" size="mini">{{detailsInfo.orderStatus==0?'确认指派':'确认改派'}}</u-button>
									</view>
								</template>
							</u-cell-item>
						</u-cell-group>
					</view>
				</u-collapse-item>

			</u-collapse>
		</u-popup>

		<u-modal v-model="showMal" title="司机手机号" show-cancel-button :confirm-text="detailsInfo.orderStatus==0?'确认指派':'确认改派'" @confirm="confirmAssign">
			<template slot="default">
				<u-input :custom-style="customStyle" v-model="assignPhone" type="number" border focus maxlength="11" placeholder="请输入手机号" />
			</template>
		</u-modal>

		<u-popup v-model="showPop2" mode="bottom" height="60%">
			<u-cell-group>
				<u-cell-item v-for="(supplier,index) in supplierList" :key="index" :arrow="arrow" title="供应商名称:" :label="supplier.name">
					<template slot="right-icon">
						<view>
							<u-button @click="confirmAssignSupplier(supplier)" size="mini">{{detailsInfo.orderStatus==0?'确认指派':'确认改派'}}</u-button>
						</view>
					</template>
				</u-cell-item>
			</u-cell-group>
		</u-popup>
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
			vehTypefilter(type) {
				if (type == 0) {
					return '经济型'
				} else if (type == 1) {
					return '舒适型'
				} else if (type == 2) {
					return '商务型'
				} else if (type == 3) {
					return '豪华型'
				}else{
					return '暂无'
				}
			}
		},
		data() {
			return {
				title:"指派订单",
				arrow: false,
				showPop: false,
				showPop2: false,
				showMal: false,
				assignPhone: "",
				customStyle: {
					margin: "24prx"
				},
				detailsInfo: {},
				driverList: [],
				supplierList:[],
				showSup:false,
				showCaH:false
			}
		},
		methods: {
			// 通过手机号派单
			confirmAssign() {
				const assignForm = {
					driverPhone: this.assignPhone,
					driverId: "",
					orderId: this.detailsInfo.orderNo,
					officeId: this.detailsInfo.officeId,
				}
				this.$u.api.getAssign(assignForm).then(res => {
					// console.log(res);
					if(res.suc){
						this.$u.toast(res.msg)
						this.showMal=false
					}
				}).catch(err=>this.$u.toast(err.msg))
			},
			//通过司机列表派单
			confirmAssign2(driverInfo) {
				const assignForm = {
					driverPhone: driverInfo.driverPhone,
					driverId: driverInfo.driverId,
					orderId: this.detailsInfo.orderNo,
					officeId: this.detailsInfo.officeId,
				}
				this.$u.api.getAssign(assignForm).then(res => {
					console.log(res);
					if(res.suc){
						this.$u.toast(res.msg)
						this.showPop=false
					}
				}).catch(err=>this.$u.toast(err.msg))
			},
			assignOthers() {
				this.$u.api.getDriverByManager({
					id: this.detailsInfo.officeId
				}).then(res => {
					// console.log(res);
					this.driverList = res.data
					for(let k in this.driverList){
						this.driverList[k].orderCompleted+=''
					}
					this.showPop = true
				}).catch(err => this.$u.toast(err.msg))
			},
			assignOne() {
				this.showMal = true
			},
			assignSupplier(){
				this.$u.api.getDriverManagers({cityId:""}).then(res=>{
					// console.log(res);
					this.supplierList=res.data
				})
				this.showPop2=true
			},
			confirmAssignSupplier(sup){
				const assignForm = {
					driverPhone:this.detailsInfo.driverPhone,
					driverId:this.detailsInfo.driverId,
					orderId:this.detailsInfo.orderNo,
					officeId:this.detailsInfo.officeId
				}
				this.$u.api.getAssignSupplier(assignForm).then(res=>{
					console.log(res);
					if(res.suc){
						this.$u.toast(res.msg)
						this.showPop2=false
					}else{
						this.$u.toast(res.msg)
					}
				})
			},
			checkAuthority(){
				const auth = uni.getStorageSync('roleName')
				if(auth=='最高管理员'){
					this.showCaH=true
					this.showSup=true
				}else if(auth=='城市车头'){
					this.showCaH=false
					this.showSup=true
				}else if(auth=='开发测试'){
					this.showCaH=true
					this.showSup=true
				}else if(auth == '供应商'){
					this.showCaH=true
					this.showSup=false
				}
			}
		},
		onShow() {
			this.checkAuthority()
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			this.detailsInfo = option
			if(option.orderStatus==0){
				this.title="指派订单"
			}else{
				this.title="改派订单"
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
			    title: this.title
			});
		}
	}
</script>
<style lang='scss' scoped>
	.driver-lv,
	.driver-info {
		font-size: 28rpx;
	}
	.driver-info {
		display: flex;
		flex-direction: column;
	}

	/deep/.u-collapse-head {
		padding: 24rpx 30rpx;
	}

	.assign-driver {
		display: flex;
		margin-top: 48rpx;
	}

	/deep/.u-model__content {
		margin: 12rpx 24rpx;
	}

	/deep/.u-model__title {
		padding: 24rpx 0;
	}
</style>

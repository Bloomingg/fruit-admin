let loginUrl = '/order/v1/oa/auth/loginToken';
// let getUserInfo = '/order/v1/oa/auth/loginToken';
let getVeriUrl = '/order/v1/oa/cmsUser/getLoginCheckCode';
let getOrderUrl = '/mis/v1/cms/corder/personal/getNewOrderList';
let getOrderDetailsUrl = '/mis/v1/cms/corder/personal/getCmsOacOrderPersonalDetail';
let getOrderDetailUrl = '/mis/v1/cms/corder/personal/getOrderDetail';
let getAmrUrl = '/resource/v1/oa/oss/getMp3FileUrl';
let getDriverUrl = '/mis/v1/cmsapi/driver/getDriverManagementList';
let getDriverByManagerUrl = '/mis/v1/cmsapi/user/getDriverByManager';
let getAssignUrl = '/order/v1/dpi/driverWorkStatistics/disBookingOrder';
let getDriverManagersUrl = '/mis/v1/cmsapi/user/getDriverManagersByCity';
let getAssignSupplierUrl = '/order/v1/dpi/driverWorkStatistics/disBookingOrderToManager';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	let login = (params = {}) => vm.$u.post(loginUrl, params);
	
	let getveri = (params = {}) => vm.$u.get(getVeriUrl, params);
	
	let getOrder = (params = {}) => vm.$u.post(getOrderUrl, params);
	
	let getOrderDetails = (params = {}) => vm.$u.post(getOrderDetailsUrl, params);
	
	let getOrderDetail = (params = "") => vm.$u.post(getOrderDetailUrl+params);
	
	let getAmr = (params = {}) => vm.$u.get(getAmrUrl,params);
	
	let getDriver = (params = {}) => vm.$u.get(getDriverUrl,params);

	let getDriverByManager = (params = {}) => vm.$u.get(getDriverByManagerUrl,params);
	
	let getAssign = (params = {}) => vm.$u.post(getAssignUrl,params);
	
	let getDriverManagers = (params = {}) => vm.$u.get(getDriverManagersUrl,params);
	
	let getAssignSupplier = (params = {}) => vm.$u.post(getAssignSupplierUrl,params);
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {login,getveri, getOrder,getOrderDetails,getOrderDetail,getAmr,getDriver,getDriverByManager,getAssign,getDriverManagers,getAssignSupplier};
}

export default {
	install
}
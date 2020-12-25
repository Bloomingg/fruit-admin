// /common/http.interceptor.js
// import MD5 from 'md5.js'
// import CryptoJS from 'crypto-js'
// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'http://139.155.36.92:25666',
		loadingText: '努力加载中~',
		loadingTime: 800,
		// // ......
	});

	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// 引用token
		const token = uni.getStorageSync('token');
		config.header.Authorization = token;
		// 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
		if (config.url == '/order/v1/oa/auth/loginToken') config.header.Authorization = '';
		
		
		 // 取参数    后台签名认证
		 //    const method = config.method
		 //    let parameter
		 //    const clientId = 'CMS'
		 //    const clientSecurity = 'Q12wk5e0Lt8pNh2H'
		 //    const reqTime = new Date().getTime()
		 //    let isGet = false
		 //    if (method in {
		 //        'get': true,
		 //        'delete': true
		 //      }) {
		 //      parameter = config.params
		 //      if (parameter != null) {
		 //        isGet = true
		 //      } else {
		 //        parameter = undefined
		 //      }
		 //    } else if (method in {
		 //        'post': true,
		 //        'put': true
		 //      }) {
		 //      parameter = config.data
		 //    }
		 //    // 修改模糊匹配请求地址
			// console.log(config);
		 //    const contentType = config.header['Content-Type']
		 //    if (contentType != null && contentType.startsWith('multipart/form-data')) {
		 //      parameter = reqTime
		 //    }
		 //    const sign = signs(parameter, clientId, reqTime, clientSecurity, isGet)
		 //    config.header['sign'] = sign
		 //    config.header['reqTime'] = reqTime
		 //    config.header['clientId'] = clientId
		 //    config.header['tag'] = 'lhy'
		 //    config.header['appCode'] = 'CMS:1.0.3'
		 //    config.header['userType'] = '3'
			
			
		// 最后需要将config进行return
		return config;
		// 如果return一个false值，则会取消本次请求
		// if(config.url == '/user/rest') return false; // 取消某次请求
	}
// 签名
// const signs = (params, clientId, reqTime, clientSecurity, isGet) => {
//   // 签名格式：请求参数json串&clientId&reqTime 使用clientSecurity进行aes加密后进行MD5得到的加密串
//   let paramsed = JSON.stringify(params)
//   // 判断是否是get请求
//   if (isGet) {
//     // 函数执行
//     const newParams = objKeySort(params)
//     paramsed = JSON.stringify(newParams)
//     paramsed = paramsed.replace(/\"/g, '')
//     while (paramsed.indexOf('null') !== -1) {
//       const paramsedFront = paramsed.slice(0, paramsed.lastIndexOf('null'))
//       const paramsedFrontReal = paramsedFront.slice(0, paramsedFront.lastIndexOf(','))
//       const paramsedAfter = paramsed.slice(paramsed.lastIndexOf('null')).slice(4)
//       paramsed = paramsedFrontReal + paramsedAfter
//     }
//     // 要求此对象中的key按照a-z排序}
//     var str1 = paramsed.replace(new RegExp(':', 'g'), '=')
//     // new RegExp(':','g') 参数‘g’表示替换字符串中所有的匹配模式串，如果不写此参数，只替换找到的第一个模式串
//     var str2 = str1.replace(new RegExp(',', 'g'), '&')
//     var str3 = str2.substring(1, str2.length - 1)
//     if (str3 == null || str3 == '') {
//       str3 = 'undefined'
//     }
//     paramsed = str3
//   }
//   // 排序的函数
//   function objKeySort(params) {
//     // 先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
//     var newkey = Object.keys(params).sort()
//     // console.log('newkey='+newkey);
//     var newObj = {} // 创建一个新的对象，用于存放排好序的键值对
//     for (var i = 0; i < newkey.length; i++) {
//       // 遍历newkey数组
//       newObj[newkey[i]] = params[newkey[i]]
//       // 向新创建的对象中按照排好的顺序依次增加键值对
//     }
//     return newObj // 返回排好序的新对象
//   }
//   // aes加密
//   const signsrc = paramsed + '&' + clientId + '&' + reqTime
//   // console.log(signsrc)
//   const srcs = CryptoJS.enc.Utf8.parse(signsrc)
//   const key = CryptoJS.enc.Utf8.parse(clientSecurity)
//   const sign = CryptoJS.AES.encrypt(srcs, key, {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7
//   })
//   const md5stream = new MD5()
//   const str = md5stream.update(sign + '').digest('hex').toUpperCase()
//   return str
// }
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if (res.code == 200 || res.code == 0) {
			// res为服务端返回值，可能有code，result等字段
			// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
			// 如果配置了originalData为true，请留意这里的返回值
			// console.log(res);
			return res;
		} else if (res.code === 208 || res.code === 209 || res.code === 201) {
			// 假设201为token失效，这里跳转登录
			vm.$u.toast('验证失败，请重新登录');
			setTimeout(() => {
				// 此为uView的方法，详见路由相关文档
				uni.removeStorageSync('token')
				vm.$u.route('/pages/profile/login')
			}, 500)
			return false;
		} else if (res.code === 9101 || res.code === 9102 || res.code === 9103 || res.code === 9104 || res.code === 9105) {
			vm.$u.toast(res.msg)
			return res
		} else {
			// 如果返回false，则会调用Promise的reject回调，
			// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
			return false;
		}
	}
}

export default {
	install
}

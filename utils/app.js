export function setToken(token) {
  uni.setStorage({
      key: 'token',
      data: token,
      success: function () {
          console.log('success');
      }
  });
}

export function setRoleName(roleName) {
  uni.setStorage({
      key: 'roleName',
      data: roleName,
      success: function () {
          console.log('success');
      }
  });
}

export function setUserCity(userCity) {
  uni.setStorage({
      key: 'userCity',
      data: userCity,
      success: function () {
          console.log('success');
      }
  });
}

export function setUserName(userName) {
  uni.setStorage({
      key: 'userName',
      data: userName,
      success: function () {
          console.log('success');
      }
  });
}
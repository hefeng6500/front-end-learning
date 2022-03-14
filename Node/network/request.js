

function request({ method, url, timeout, ontimeout }) {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      option.success(xhr.response)
    }
  }
  xhr.timeout = timeout
  xhr.ontimeout = ontimeout
  xhr.open(method, url, true)
  xhr.send()
}

request({
  url: 'http://localhost:3000/api',
  method: 'GET',
  data: {},
  timeout: 2000,
  success: function (res) {
    console.log(res);
  },
  ontimeout: function () {
    console.log('超时了');
  }
})

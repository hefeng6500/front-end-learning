function jsonp({ url, params, getData }) {
  const script = document.createElement("script");
  let str = "";
  const callbackName = `jsonp_${Math.random().toString.slice(2)}`

  params.callback = callbackName

  for (let key in params) {
    str += `&${key}=${params[key]}`;
  }
  script.src = url + '?' + str.slice(1);
  window[callbackName] = getData
}

jsonp({
  url: "",
  params: {},
  getData(data) {
    console.log(data);
  },
});

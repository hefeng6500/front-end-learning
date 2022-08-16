function jsonp({ url, params, getData }) {
  const script = document.createElement("script");

  const callbackName = `__jsonp_${Math.random()}__`;
  let str = "";

  params.callback = callbackName;

  for (let key in params) {
    str += `&${key}=${params[key]}`;
  }

  url = url + "?" + str.slice(1);

  script.url = url;

  window[callbackName] = getData;

  document.body.append(script);
}

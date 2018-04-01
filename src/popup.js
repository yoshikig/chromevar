var ua = window.navigator.userAgent.split(' ');
ua = ua.filter(function(s) { return s.lastIndexOf("Chrome/", 0) === 0; });

document.querySelector('#ua').innerText = ua;

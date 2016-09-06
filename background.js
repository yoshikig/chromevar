
function initialize() {
  var ua = window.navigator.userAgent.split(' ');
  ua = ua.filter(function(s) { return s.lastIndexOf("Chrome/", 0) === 0; });

  if (ua.length === 0)
    return;

  var version = ua[0].substr(7).split('.');
  if (version.length === 0)
    return;
  
  var c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  
  var ctx=c.getContext("2d");
  ctx.fillStyle = 'rgb(255,255,255)';
  ctx.fillRect(0, 0, 64, 64);
  ctx.fillStyle = 'black';    
  ctx.font="36px Verdana";
  ctx.fillText(version[0], 4, 36, 40);
  ctx.font="16px Verdana";
  ctx.fillText('.' + version[1] + '.', 42, 36, 20);
  ctx.font="20px Verdana";
  ctx.fillText(version[2] + '.' + version[3], 2, 56, 60);
  document.body.appendChild(c);

  var WINDOW_OPTIONS = {
    type: 'panel',
    state: 'minimized',
    hidden: true,
    frame: {type: 'none'},
    height: 100,
    width: 400,
  };

  chrome.app.window.create("popup.html", WINDOW_OPTIONS, function (appWindow) {
    appWindow.setIcon(c.toDataURL("image/png"));
    appWindow.show();
    appWindow.minimize();
  });

}

chrome.runtime.getPlatformInfo(function(info) {
  // Display host OS in the console
  if (info.os == 'cros') {
    chrome.runtime.onStartup.addListener(initialize);
    chrome.runtime.onInstalled.addListener(initialize);
  }
});

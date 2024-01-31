const axios = require("axios");
const {
  performance
} = require("perf_hooks");
module.exports.config = {
  'name': "uptimer",
  'version': "1.0.0",
  'hasPermssion': 0x0,
  'credits': "Heiro",
  'description': "Monitor the uptime of a URL",
  'commandCategory': "utility",
  'usages': ["/uptime [URL]"],
  'cooldowns': 0x5
};
const monitoringData = {};
function startMonitoring(_0x450e47, _0x413fea, _0x4d8549, _0x5585af) {
  const _0x420ee5 = performance.now();
  let _0x1e2909 = _0x420ee5;
  const _0x4bae4e = async () => {
    try {
      const _0x482a7d = await axios.get(_0x413fea);
      if (_0x482a7d.status === 200) {
        const _0x4c7e4a = performance.now();
        const _0x3d5ba2 = (_0x4c7e4a - _0x420ee5) / 1000;
        _0x450e47.sendMessage("🆕 The URL " + _0x413fea + " is up and running. Uptime: " + _0x3d5ba2.toFixed(2) + " seconds.", _0x4d8549, _0x5585af);
        _0x1e2909 = _0x4c7e4a;
        console.log("[32m[" + new Date().toISOString() + "] URL " + _0x413fea + " is up.[0m");
      }
    } catch (_0x16bc22) {
      const _0x4b9404 = performance.now();
      const _0x4d0e56 = (_0x4b9404 - _0x1e2909) / 1000;
      _0x450e47.sendMessage("⏬ The URL " + _0x413fea + " is currently down. Downtime: " + _0x4d0e56.toFixed(2) + " seconds.", _0x4d8549, _0x5585af);
      _0x1e2909 = _0x4b9404;
      console.log("[32m[" + new Date().toISOString() + "] URL " + _0x413fea + " is down.[0m");
    }
  };
  const _0xb879d9 = setInterval(_0x4bae4e, 300000);
  setTimeout(() => {
    clearInterval(_0xb879d9);
    _0x450e47.sendMessage("🚫 Monitoring of " + _0x413fea + " has been stopped.", _0x4d8549, _0x5585af);
    console.log("[32m[" + new Date().toISOString() + "] Monitoring of " + _0x413fea + " has been stopped.[0m");
    setTimeout(() => {
      startMonitoring(_0x450e47, _0x413fea, _0x4d8549, _0x5585af);
    }, 86400000);
  }, 86400000);
  _0x450e47.sendMessage("🆙 Monitoring " + _0x413fea + " for uptime.", _0x4d8549, _0x5585af);
  console.log("[32m[" + new Date().toISOString() + "] Started monitoring " + _0x413fea + ".[0m");
  monitoringData[_0x413fea] = {
    'intervalId': _0xb879d9,
    'startTimestamp': _0x420ee5
  };
}
module.exports.run = async function ({
  api: _0x3d78ef,
  event: _0x4f0e6c,
  args: _0x51fa76
}) {
  const {
    threadID: _0x411356,
    messageID: _0x12f5d9
  } = _0x4f0e6c;
  const _0xc78c6b = _0x51fa76[0];
  if (!_0xc78c6b) {
    _0x3d78ef.sendMessage("🚀 | Please provide a URL to monitor.", _0x411356, _0x12f5d9);
    return;
  }
  if (!_0xc78c6b.startsWith("https://")) {
    _0x3d78ef.sendMessage("❎ Invalid URL. Please make sure the URL starts with \"https://\".", _0x411356, _0x12f5d9);
    return;
  }
  if (monitoringData[_0xc78c6b]) {
    _0x3d78ef.sendMessage("🆙 Monitoring of " + _0xc78c6b + " is already active.", _0x411356, _0x12f5d9);
    return;
  }
  startMonitoring(_0x3d78ef, _0xc78c6b, _0x411356, _0x12f5d9);
  console.log("[32m[" + new Date().toISOString() + "] Monitoring " + _0xc78c6b + " for uptime.[0m");
};
for (const url in monitoringData) {
  if (monitoringData.hasOwnProperty(url)) {
    startMonitoring(api, url, threadID, messageID);
  }
}
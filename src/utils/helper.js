export const callNative = (action, data, callback) => {
  let timer;
  const callbackId = `cb_${Date.now()}_${Math.random().toString(36).substr(2)}`;
  
  window.nativeCallbacks = window.nativeCallbacks || {};
  window.nativeCallbacks[callbackId] = (result) => {
    clearTimeout(timer);
    delete window.nativeCallbacks[callbackId];
    callback && callback(result);
  };
  
  try {
    window.webkit.messageHandlers.RecordAppJsBridgeIsSet.postMessage({
      action, data, callbackId
    });

    timer = setTimeout(() => {
      if (window.nativeCallbacks[callbackId]) {
        delete window.nativeCallbacks[callbackId];
        callback && callback({ success: false, error: 'Timeout' });
      }
    }, 5000);
  } catch (error) {
    clearTimeout(timer);
    delete window.nativeCallbacks[callbackId];
    callback && callback({ success: false, error: error.message });
  }
};
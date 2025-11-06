// 调用原生方法并设置回调
export const callNative = (action, data, callback) => {
    // 生成唯一ID用于匹配回调
    const callbackId = 'cb_' + Date.now() + '_' + Math.random().toString(36).substr(2);
    
    // 存储回调函数
    window.nativeCallbacks = window.nativeCallbacks || {}
    window.nativeCallbacks[callbackId] = callback
    
    // 调用原生方法
    try {
      window.webkit.messageHandlers.RecordAppJsBridgeIsSet.postMessage({
        action: action,
        data: data,
        callbackId: callbackId
      })
        
      // 设置超时处理
      setTimeout(() => {
        if (window.nativeCallbacks[callbackId]) {
          delete window.nativeCallbacks[callbackId];
          callback && callback({ success: false, error: 'Timeout' });
        }
      }, 5000)
        
    } catch (error) {
      console.error('调用原生方法失败:', error);
      callback && callback({ success: false, error: error.message });
    }
}
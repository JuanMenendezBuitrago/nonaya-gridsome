
const Utils = {
  install(Vue) {
    Vue.prototype.$formatCurrency = function(value) {
      let euro = Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
      });

      return euro.format(value);
    },
    Vue.prototype.$isMobile = function() {
      console.log(window.visualViewport.width)
      return window.visualViewport.width > 0 && window.visualViewport.width < 431
    }
  }
};

export default Utils;

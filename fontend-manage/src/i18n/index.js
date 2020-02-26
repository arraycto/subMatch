import VueI18n from 'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n)
var locale;

// 新打开的浏览器设置默认语言包
localStorage.getItem('locale') ? locale = localStorage.getItem('locale') : locale = 'zh';

const i18n = new VueI18n({
  locale: locale, // 语言标识
  messages: {
    'zh': require('./lang/zh'), // 中文语言包
    'en': require('./lang/en')  // 英文语言包
  }
})

export default i18n

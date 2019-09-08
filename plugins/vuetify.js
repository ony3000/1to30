import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify, {
  iconfont: 'fa',
  theme: {
    'amber-like': '#ffc039',
    'deep-brown-like': '#3f240d',
    'gold-like': '#f4a622',
    'silver-like': '#b9b9b9',
    'bronze-like': '#d06a3d'
  }
})

Vue.mixin({
  computed: {
    // reference - https://developer.mozilla.org/en-US/docs/Web/CSS/@media/orientation
    isLandscape () {
      return this.$vuetify.breakpoint.width > this.$vuetify.breakpoint.height
    }
  }
})

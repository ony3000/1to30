<template>
  <v-layout
    v-if="isLoading"
    fill-height
    align-center
    justify-center
  >
    <v-progress-circular
      indeterminate
      color="deep-brown-like"
    />
  </v-layout>
  <index-content
    v-else-if="!isLoading && contentPath === '/index'"
  />
  <game-content
    v-else-if="!isLoading && contentPath === '/game'"
  />
</template>

<script>
import IndexContent from '~/components/IndexContent'
import GameContent from '~/components/GameContent'

export default {
  name: 'IndexPage',
  layout: 'web-app',
  components: {
    IndexContent,
    GameContent
  },
  data () {
    return {
      isLoading: true
    }
  },
  computed: {
    contentPath () {
      return this.$store.state.contentPath
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    })
  }
}
</script>

<template>
  <v-app>
    <v-content>
      <v-container
        fluid
        fill-height
        justify-center
      >
        <v-sheet
          width="100%"
          height="100%"
          color="transparent"
          class="board"
        >
          <nuxt />
        </v-sheet>
      </v-container>
      <v-btn
        v-if="contentPath !== '/index'"
        icon
        fixed
        left
        bottom
        @click="navigateContent('/index')"
      >
        <v-icon>fas fa-arrow-left</v-icon>
      </v-btn>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'WebAppLayout',
  computed: {
    contentPath () {
      return this.$store.state.contentPath
    }
  },
  methods: {
    navigateContent (path) {
      this.$store.commit('navigateContent', path)
    }
  }
}
</script>

<style lang="scss">
html {
  overflow: hidden;
}
</style>

<style lang="scss" scoped>
/deep/ .application--wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}

@media (orientation: portrait) {
  .board {
    max-width: 540px;
  }
}

@media (orientation: landscape) {
  .board {
    max-height: 540px;
  }
}
</style>

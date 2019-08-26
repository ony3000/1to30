<template>
  <v-app>
    <v-toolbar
      app
      dense
    >
      <v-btn
        icon
        to="/"
        nuxt
      >
        <v-icon>fas fa-arrow-left</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container
        fluid
        fill-height
        justify-center
      >
        <v-sheet
          width="100%"
          max-width="540"
          height="100%"
          color="transparent"
        >
          <nuxt />
        </v-sheet>
      </v-container>
    </v-content>
    <v-footer
      app
    >
      <span>&copy; 2017-2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'SimpleLayout'
}
</script>

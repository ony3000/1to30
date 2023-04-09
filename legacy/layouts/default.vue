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
  name: 'DefaultLayout'
}
</script>

<template>
  <v-layout
    wrap
    fill-height
    justify-center
  >
    <v-flex>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              다크 테마
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-switch
              color="amber-like"
              class="toggle-switch"
            />
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-divider />
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title
              class="error--text"
            >
              기록 삭제
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'SettingsPage',
  layout: 'simple'
}
</script>

<style lang="scss" scoped>
.toggle-switch {
  flex: 0 0 auto;

  /deep/ .v-input--selection-controls__input {
    margin-left: 8px;
    margin-right: 0;
  }
}
</style>

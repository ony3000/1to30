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
              v-model="useDarkTheme"
              color="amber-like"
              class="toggle-switch"
            />
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>
              힌트 제공
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-switch
              v-model="useHint"
              color="amber-like"
              class="toggle-switch"
            />
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-divider />
      <v-list>
        <v-list-tile
          @click="resetSettings"
        >
          <v-list-tile-content>
            <v-list-tile-title>
              설정 초기화
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider
        v-if="$store.state.isStorageAvailable"
      />
      <v-list
        v-if="$store.state.isStorageAvailable"
      >
        <v-list-tile
          @click="resetRanking"
        >
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
    <v-snackbar
      v-model="snackbar.general"
      bottom
      :timeout="1500"
      @click="snackbar.general = false"
    >
      설정이 저장되었습니다.
    </v-snackbar>
    <v-snackbar
      v-model="snackbar.deleteRanking"
      bottom
      :timeout="1500"
      @click="snackbar.deleteRanking = false"
    >
      기록이 삭제되었습니다.
    </v-snackbar>
  </v-layout>
</template>

<script>
export default {
  name: 'SettingsPage',
  layout: 'simple',
  data () {
    return {
      useDarkTheme: false,
      useHint: true,
      snackbar: {
        general: false,
        deleteRanking: false
      }
    }
  },
  watch: {
    useDarkTheme () {
      if (this.useDarkTheme !== this.$store.state.settings.useDarkTheme) {
        this.$store.commit('setDarkTheme', this.useDarkTheme)
        this.snackbar.general = true
      }
    },
    useHint () {
      if (this.useHint !== this.$store.state.settings.useHint) {
        this.$store.commit('setHint', this.useHint)
        this.snackbar.general = true
      }
    }
  },
  mounted () {
    this.useDarkTheme = this.$store.state.settings.useDarkTheme
    this.useHint = this.$store.state.settings.useHint
  },
  methods: {
    resetRanking () {
      if (confirm('이 브라우저에서 달성한 모든 기록이 삭제됩니다.')) {
        this.$store.commit('deleteRecords')
        this.snackbar.deleteRanking = true
      }
    },
    resetSettings () {
      this.useDarkTheme = false
      this.useHint = true
      this.snackbar.general = true
    }
  }
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

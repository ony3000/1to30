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
      </v-list>
      <v-divider
        v-if="$store.state.isStorageAvailable"
      />
      <v-list
        v-if="$store.state.isStorageAvailable"
      >
        <v-list-tile
          @click="openDialog"
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
    <v-dialog
      v-if="$store.state.isStorageAvailable"
      v-model="isDialogActive"
      max-width="270"
    >
      <v-card>
        <v-card-text>이 브라우저에서 달성한 모든 기록이 삭제됩니다.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="info"
            outline
            @click="closeDialog"
          >
            취소
          </v-btn>
          <v-btn
            color="error"
            outline
            @click="deleteRanking"
          >
            삭제
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar.darkTheme"
      bottom
      :timeout="1500"
      @click="snackbar.darkTheme = false"
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
      snackbar: {
        darkTheme: false,
        deleteRanking: false
      },
      isDialogActive: false
    }
  },
  watch: {
    useDarkTheme () {
      if (this.useDarkTheme !== this.$store.state.settings.useDarkTheme) {
        this.$store.commit('setDarkTheme', this.useDarkTheme)
        this.snackbar.darkTheme = true
      }
    }
  },
  mounted () {
    this.useDarkTheme = this.$store.state.settings.useDarkTheme
  },
  methods: {
    openDialog () {
      this.isDialogActive = true
    },
    closeDialog () {
      this.isDialogActive = false
    },
    deleteRanking () {
      this.$store.commit('deleteRecords')
      this.snackbar.deleteRanking = true
      this.closeDialog()
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

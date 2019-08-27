<template>
  <v-layout
    wrap
    fill-height
    justify-center
  >
    <v-flex>
      <v-tabs
        v-model="activeTab"
        grow
        color="amber-like"
        slider-color="deep-brown-like"
      >
        <v-tab
          key="local"
        >
          Local
        </v-tab>
        <v-tab
          key="daily"
        >
          Daily
        </v-tab>
        <v-tab-item
          key="local"
        >
          <v-sheet
            :height="sheetHeight"
            :max-height="sheetHeight"
            tile
            class="rank-sheet"
          >
            <v-list>
              <v-list-tile
                v-for="(num, index) in 10"
                :key="index"
                avatar
              >
                <v-sheet
                  width="45"
                >
                  <span>{{ num }}</span>
                </v-sheet>
                <v-list-tile-content
                  class="pr-1"
                >
                  <v-list-tile-title>홍길동</v-list-tile-title>
                  <v-list-tile-sub-title>{{ ((Math.random() + index + 3) * 5).toFixed(3) }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text
                    title="YYYY-MM-DD HH:mm:ss +0900"
                  >
                    {{ ['방금', 'n분 전', 'n시간 전', 'n일 전', 'n개월 전', 'n년 전'][Math.floor(Math.random() * 6)] }}
                  </v-list-tile-action-text>
                  <v-list-tile-action-text>
                    <v-icon>fab fa-windows</v-icon>
                    <v-icon>fab {{ ['fa-chrome', 'fa-edge', 'fa-firefox'][Math.floor(Math.random() * 3)] }}</v-icon>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-sheet>
        </v-tab-item>
        <v-tab-item
          key="daily"
        >
          <v-sheet
            :height="sheetHeight"
            :max-height="sheetHeight"
            tile
            class="rank-sheet"
          >
            <v-layout
              fill-height
              align-center
              justify-center
            >
              <div>저장된 기록이 없습니다.</div>
            </v-layout>
          </v-sheet>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'RankingPage',
  layout: 'simple',
  data () {
    return {
      activeTab: 'local'
    }
  },
  computed: {
    sheetHeight () {
      const outerSpaceHeights = [
        this.$vuetify.application.top,
        this.$vuetify.application.footer,

        // sum of vertical padding of .container
        (this.$vuetify.breakpoint.smAndDown ? 32 : 48),

        // height of .v-tabs__container
        48
      ]
      const totalOuterHeight = outerSpaceHeights.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      }, 0)
      return this.$vuetify.breakpoint.height - totalOuterHeight
    }
  }
}
</script>

<style lang="scss" scoped>
.rank-sheet {
  overflow-y: auto;
}
</style>

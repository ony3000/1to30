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
        light
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
            <ranking-list
              :data="localRanking"
            />
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
            <ranking-list
              :data="dailyRanking"
            />
          </v-sheet>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
import parser from 'ua-parser-js'
import dayjs from '~/plugins/dayjs'
import RankingList from '~/components/RankingList'

const LAST_DISPLAY_RANK = 30
const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

export default {
  name: 'RankingContent',
  components: {
    RankingList
  },
  data () {
    return {
      activeTab: 'local',
      currentMoment: dayjs()
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
    },
    orderedRanking () {
      const ranking = [
        ...this.$store.state.ranking
      ]
      ranking.sort((former, latter) => {
        if (former.score < latter.score) {
          return -1
        } else if (former.score > latter.score) {
          return 1
        } else if (former.timestamp < latter.timestamp) {
          return -1
        } else if (former.timestamp > latter.timestamp) {
          return 1
        } else {
          return 0
        }
      })
      return ranking
    },
    localRanking () {
      const baseRanking = this.orderedRanking.slice(0, LAST_DISPLAY_RANK)
      return baseRanking.map((record) => {
        const data = parser(record.userAgent)
        const moment = dayjs(record.timestamp)
        return {
          ...record,
          os: data.os.name,
          browser: data.browser.name,
          readableDate: moment.format('YYYY-MM-DD HH:mm:ss ZZ'),
          diff: {
            year: this.currentMoment.diff(moment, 'year'),
            month: this.currentMoment.diff(moment, 'month'),
            day: this.currentMoment.diff(moment, 'day'),
            hour: this.currentMoment.diff(moment, 'hour'),
            minute: this.currentMoment.diff(moment, 'minute')
          }
        }
      })
    },
    dailyRanking () {
      const currentDate = this.currentMoment.format('YYYY-MM-DD')
      const currentTimestamp = Number(this.currentMoment.format('x'))
      let midnightTimestamp = Number(dayjs(`${currentDate} 00:00:00 +0900`, 'YYYY-MM-DD HH:mm:ss ZZ').format('x'))
      if (midnightTimestamp > currentTimestamp) {
        midnightTimestamp -= DAY
      } else if (currentTimestamp - midnightTimestamp > DAY) {
        midnightTimestamp += DAY
      }
      const baseRanking = this.orderedRanking.filter((record) => {
        return record.timestamp >= midnightTimestamp
      }).slice(0, LAST_DISPLAY_RANK)
      return baseRanking.map((record) => {
        const data = parser(record.userAgent)
        const moment = dayjs(record.timestamp)
        return {
          ...record,
          os: data.os.name,
          browser: data.browser.name,
          readableDate: moment.format('YYYY-MM-DD HH:mm:ss ZZ'),
          diff: {
            year: this.currentMoment.diff(moment, 'year'),
            month: this.currentMoment.diff(moment, 'month'),
            day: this.currentMoment.diff(moment, 'day'),
            hour: this.currentMoment.diff(moment, 'hour'),
            minute: this.currentMoment.diff(moment, 'minute')
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.rank-sheet {
  overflow-y: auto;
}
</style>

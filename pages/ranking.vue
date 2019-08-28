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
            <v-layout
              v-if="localRanking.length === 0"
              fill-height
              align-center
              justify-center
            >
              <div>저장된 기록이 없습니다.</div>
            </v-layout>
            <v-list
              v-else
            >
              <v-list-tile
                v-for="(record, index) in localRanking"
                :key="index"
                avatar
              >
                <v-sheet
                  width="45"
                >
                  <span>{{ 1 + index }}</span>
                </v-sheet>
                <v-list-tile-content
                  class="pr-1"
                >
                  <v-list-tile-title>{{ record.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ record.score.toFixed(3) }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-tooltip
                    left
                  >
                    <template
                      v-slot:activator="{ on }"
                    >
                      <v-list-tile-action-text
                        v-on="on"
                      >
                        {{ record.diff | diffConvert }}
                      </v-list-tile-action-text>
                    </template>
                    <span>{{ record.readableDate }}</span>
                  </v-tooltip>
                  <v-list-tile-action-text>
                    <v-icon>{{ record.os | osConvert }}</v-icon>
                    <v-icon>{{ record.browser | browserConvert }}</v-icon>
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
              v-if="dailyRanking.length === 0"
              fill-height
              align-center
              justify-center
            >
              <div>저장된 기록이 없습니다.</div>
            </v-layout>
            <v-list
              v-else
            >
              <v-list-tile
                v-for="(record, index) in dailyRanking"
                :key="index"
                avatar
              >
                <v-sheet
                  width="45"
                >
                  <span>{{ 1 + index }}</span>
                </v-sheet>
                <v-list-tile-content
                  class="pr-1"
                >
                  <v-list-tile-title>{{ record.name }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ record.score.toFixed(3) }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-tooltip
                    left
                  >
                    <template
                      v-slot:activator="{ on }"
                    >
                      <v-list-tile-action-text
                        v-on="on"
                      >
                        {{ record.diff | diffConvert }}
                      </v-list-tile-action-text>
                    </template>
                    <span>{{ record.readableDate }}</span>
                  </v-tooltip>
                  <v-list-tile-action-text>
                    <v-icon>{{ record.os | osConvert }}</v-icon>
                    <v-icon>{{ record.browser | browserConvert }}</v-icon>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-sheet>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
import parser from 'ua-parser-js'
import dayjs from '~/plugins/dayjs'

const LAST_DISPLAY_RANK = 30
const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

export default {
  name: 'RankingPage',
  layout: 'simple',
  filters: {
    diffConvert (value = {}) {
      if (value.year > 0) {
        return `${value.year}년 전`
      } else if (value.month > 0) {
        return `${value.month}개월 전`
      } else if (value.day > 0) {
        return `${value.day}일 전`
      } else if (value.hour > 0) {
        return `${value.hour}시간 전`
      } else if (value.minute > 0) {
        return `${value.minute}분 전`
      } else {
        return '방금'
      }
    },
    osConvert (value = '') {
      value = value.toLowerCase()
      switch (value) {
        case 'windows':
        case 'windows phone':
          return 'fab fa-windows'
        case 'mac os':
        case 'ios':
          return 'fab fa-apple'
        case 'android':
          return 'fab fa-android'
        case 'linux':
          return 'fab fa-linux'
        case 'ubuntu':
          return 'fab fa-ubuntu'
        case 'suse':
          return 'fab fa-suse'
        case 'redhat':
          return 'fab fa-redhat'
        case 'fedora':
          return 'fab fa-fedora'
        case 'centos':
          return 'fab fa-centos'
        case 'playstation':
          return 'fab fa-playstation'
        default:
          return 'fas fa-question'
      }
    },
    browserConvert (value = '') {
      value = value.toLowerCase()
      switch (value) {
        case 'chrome':
        case 'chrome webview':
          return 'fab fa-chrome'
        case 'firefox':
          return 'fab fa-firefox'
        case 'safari':
        case 'mobile safari':
          return 'fab fa-safari'
        case 'edge':
          return 'fab fa-edge'
        case 'opera':
          return 'fab fa-opera'
        default:
          return 'fas fa-question'
      }
    }
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

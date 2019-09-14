<template>
  <v-layout
    v-if="data.length === 0"
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
      v-for="(record, index) in data"
      :key="index"
      avatar
    >
      <v-sheet
        width="45"
      >
        <v-badge
          color="red"
          :value="record.isLatest"
        >
          <template
            v-slot:badge
          >
            <span>N</span>
          </template>
          <span>{{ record.rank }}</span>
        </v-badge>
        <v-icon
          v-if="index < 3"
          :color="medalColor[index]"
        >
          fas fa-medal
        </v-icon>
      </v-sheet>
      <v-list-tile-content
        class="pr-1"
      >
        <v-list-tile-title
          :class="{
            'grey--text font-italic': !record.name
          }"
        >
          {{ record.name ? record.name : '(이름 없음)' }}
        </v-list-tile-title>
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
</template>

<script>
export default {
  name: 'RankingList',
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
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      medalColor: [
        'gold-like',
        'silver-like',
        'bronze-like'
      ]
    }
  }
}
</script>

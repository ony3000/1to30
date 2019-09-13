<template>
  <v-layout
    :row="isLandscape"
    :column="!isLandscape"
    fill-height
    align-center
    justify-center
  >
    <v-flex
      v-if="!isLoading"
      :xs4="isLandscape"
      :xs3="!isLandscape"
      class="content-section"
    >
      <v-layout
        :wrap="isLandscape"
        fill-height
        :align-center="isLandscape"
        :align-end="!isLandscape"
        :justify-end="isLandscape"
        :justify-space-between="!isLandscape"
      >
        <v-flex
          :xs12="isLandscape"
          :xs4="!isLandscape"
        >
          <v-layout
            :justify-end="isLandscape"
          >
            <v-flex
              xs12
              class="progress-display"
            >
              <v-card>
                <v-card-title
                  class="py-1"
                >
                  <div>
                    <div
                      class="subheading"
                    >
                      Next
                    </div>
                    <div
                      class="display-1"
                    >
                      {{ nextNumber > lastNumber ? '-' : nextNumber }}
                    </div>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex
          :xs12="isLandscape"
          :xs7="!isLandscape"
        >
          <v-layout
            :justify-end="isLandscape"
          >
            <v-flex
              xs12
              class="progress-display"
            >
              <v-card>
                <v-card-title
                  class="py-1 justify-end text-xs-right"
                >
                  <div>
                    <div
                      class="subheading"
                    >
                      Time
                    </div>
                    <div
                      class="display-1"
                    >
                      {{ (elapsedTime / 1000).toFixed(2) }}
                    </div>
                  </div>
                </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex
      v-if="!isLoading"
      :xs8="isLandscape"
      :xs9="!isLandscape"
      class="content-section"
    >
      <v-layout
        fill-height
        align-center
        justify-center
      >
        <v-sheet
          width="288"
          height="288"
          color="transparent"
          class="game-board"
        >
          <v-layout
            v-if="isFinished || isTimeover"
            fill-height
            align-center
            justify-center
          >
            <div>
              <v-btn
                color="amber-like"
                light
                @click="restartGame"
              >
                <v-icon
                  left
                >
                  fas fa-redo-alt
                </v-icon>
                <span>다시 시작</span>
              </v-btn>
            </div>
          </v-layout>
          <v-layout
            v-else
            wrap
            fill-height
          >
            <v-flex
              v-for="(num, index) in exposedNumbers"
              :key="index"
              xs3
              pa-1
              style="height: 25%;"
            >
              <v-card
                :color="(num === nextNumber && isHintActive) ? 'brown' : 'amber-like'"
                height="100%"
                ripple
                :light="!(num === nextNumber && isHintActive)"
                :dark="num === nextNumber && isHintActive"
                :flat="num === null || isTimeover"
                :disabled="num === null || isTimeover"
                class="number-tile"
                :class="{
                  'is-disappear': (num === false)
                }"
                @click="tapping(num, index)"
              >
                <v-layout
                  fill-height
                  align-center
                  justify-center
                  headline
                >
                  {{ num ? num : '' }}
                </v-layout>
              </v-card>
            </v-flex>
          </v-layout>
        </v-sheet>
      </v-layout>
    </v-flex>
    <v-dialog
      :value="isStandby"
      no-click-animation
      persistent
      width="300"
    >
      <v-card
        v-if="isStandby"
        dark
        color="transparent"
      >
        <v-card-text
          class="display-2 font-weight-bold text-xs-center"
        >
          {{ Math.ceil(countdownTime / 1000) }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import shuffle from 'lodash/shuffle'

const SECOND = 1000
const STANDBY_DURATION = 3 * SECOND
const HINT_DURATION = 2 * SECOND
const TIMEOVER_DURATION = 100 * SECOND
const TIMER_EXPIRE_DURATION = 120 * SECOND

export default {
  name: 'GameContent',
  data () {
    return {
      cardCount: 16,
      lastNumber: 30,
      nextNumber: 1,
      exposedNumbers: [],
      standbyNumbers: [],
      clock: null,
      currentTime: new Date().getTime(),
      standbyStartTime: null,
      lastCorrectTime: null,
      isLoading: true,
      isFinished: false
    }
  },
  computed: {
    gameStartTime () {
      return this.standbyStartTime + STANDBY_DURATION
    },
    countdownTime () {
      return this.isStandby
        ? (STANDBY_DURATION - (this.currentTime - this.standbyStartTime))
        : STANDBY_DURATION
    },
    elapsedTime () {
      return this.isPlaying
        ? Math.min(TIMEOVER_DURATION, this.currentTime - this.gameStartTime)
        : 0
    },
    isStandby () {
      return this.standbyStartTime &&
        (this.currentTime - this.standbyStartTime >= 0) &&
        (this.currentTime - this.standbyStartTime < STANDBY_DURATION)
    },
    isPlaying () {
      return this.gameStartTime &&
        (this.currentTime - this.gameStartTime >= 0)
    },
    isHintActive () {
      return this.isPlaying &&
        (this.currentTime - this.lastCorrectTime >= HINT_DURATION)
    },
    isTimeover () {
      return this.isPlaying &&
        (this.currentTime - this.gameStartTime >= TIMEOVER_DURATION)
    }
  },
  watch: {
    isTimeover () {
      if (this.isTimeover) {
        const timeLimit = TIMEOVER_DURATION / SECOND
        setTimeout(() => {
          alert(`시간 초과! ${timeLimit}초 안에 게임을 완료하지 못하면 자동으로 종료됩니다.`)
        }, 200)
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initialize()
    })
  },
  beforeDestroy () {
    clearInterval(this.clock)
  },
  methods: {
    initialize () {
      this.clock = setInterval(() => {
        this.currentTime = new Date().getTime()
      }, 5)
      setTimeout(() => {
        clearInterval(this.clock)
      }, TIMER_EXPIRE_DURATION)
      const layerCount = Math.ceil(this.lastNumber / this.cardCount)
      const baseNumbers =
        Array(this.cardCount * layerCount)
          .fill(null)
          .map((elem, index) => (index < this.lastNumber ? 1 + index : null))
      const shuffledNumbers = []
      for (let layer = 0; layer < layerCount; layer += 1) {
        const startIndex = this.cardCount * layer
        const endIndex = this.cardCount * (1 + layer)
        shuffledNumbers.push(
          ...shuffle(baseNumbers.slice(startIndex, endIndex))
        )
      }
      this.exposedNumbers = shuffledNumbers.slice(0, this.cardCount)
      this.standbyNumbers = shuffledNumbers.slice(this.cardCount)
      this.isLoading = false
      this.standbyStartTime = new Date().getTime()
      this.lastCorrectTime = this.standbyStartTime + STANDBY_DURATION
    },
    tapping (num, index) {
      if (!this.isTimeover && num === this.nextNumber) {
        this.lastCorrectTime = new Date().getTime()
        this.exposedNumbers[index] = false
        this.nextNumber += 1

        if (num === this.lastNumber) {
          clearInterval(this.clock)
          this.isFinished = true
          if (this.$store.state.isStorageAvailable) {
            const timestamp = new Date().getTime()
            setTimeout(() => {
              const score = this.elapsedTime / 1000
              const name = prompt(`입력하는 이름으로 ${score}초 기록이 저장됩니다.`, '') || ''
              const userAgent = navigator.userAgent
              const newRecord = {
                name,
                score,
                timestamp,
                userAgent
              }
              const storage = window.localStorage
              let ranking = []
              const storedData = storage.getItem('1to30:ranking')
              if (storedData) {
                try {
                  ranking = JSON.parse(storedData)
                } catch (e) {
                  console.warn(e)
                }
              }
              ranking.push(newRecord)
              this.$store.commit('addRecord', newRecord)
              storage.setItem('1to30:ranking', JSON.stringify(ranking))
            }, 200)
          } else {
            alert('로컬 저장소를 사용할 수 없습니다. 기록을 저장할 수 없습니다.')
          }
        } else {
          const standbyNumber = this.standbyNumbers.shift()
          if (standbyNumber) {
            setTimeout(() => {
              this.exposedNumbers[index] = standbyNumber
            }, 200)
          }
        }
      }
    },
    restartGame () {
      clearInterval(this.clock)
      this.nextNumber = 1
      this.standbyStartTime = null
      this.lastCorrectTime = null
      this.isLoading = true
      this.isFinished = false
      this.initialize()
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .v-dialog {
  box-shadow: none;
}

.v-card {
  user-select: none;
}

.number-tile {
  transform-origin: center center;
  transform: scale(1);

  &.is-disappear {
    transition: transform 0.2s ease-out;
    transform: scale(0);
  }
}

@media (orientation: portrait) {
  .content-section {
    width: 100%;
  }

  .game-board {
    margin-bottom: calc(((100vh - 24px * 2) * 9 / 12 - 288px) / 5 + 16px);
  }
}

@media (orientation: portrait) and (max-width: 959px) {
  .game-board {
    margin-bottom: calc(((100vh - 16px * 2) * 9 / 12 - 288px) / 5 + 16px);
  }
}

@media (orientation: landscape) {
  .content-section {
    height: 100%;
  }

  .progress-display {
    max-width: 220px;
  }
}
</style>

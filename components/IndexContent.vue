<template>
  <v-layout
    :row="isLandscape"
    :column="!isLandscape"
    fill-height
    align-center
    justify-center
  >
    <v-flex
      xs6
      class="content-section"
    >
      <v-layout
        fill-height
        align-center
        justify-center
      >
        <v-img
          :src="titleImage"
          alt="'1부터 30까지!' 로고"
          aspect-ratio="1"
          max-width="256"
          class="game-logo"
        />
      </v-layout>
    </v-flex>
    <v-flex
      xs6
      class="content-section"
    >
      <v-layout
        fill-height
        align-center
        :justify-center="!isLandscape"
      >
        <v-flex
          :xs9="isLandscape"
          :offset-xs1="isLandscape"
          :xs10="!isLandscape"
          class="menu-wrapper"
        >
          <v-item-group>
            <v-layout
              v-for="(menu, index) in menus"
              :key="index"
              justify-center
            >
              <v-flex>
                <v-item>
                  <v-btn
                    block
                    :color="(index % 2 === 1 ? 'deep-brown-like' : 'amber-like')"
                    :light="index % 2 === 0"
                    :dark="index % 2 === 1"
                    @click="navigateContent(menu.to)"
                  >
                    <v-icon
                      left
                    >
                      {{ menu.icon }}
                    </v-icon>
                    <span>{{ menu.title }}</span>
                  </v-btn>
                </v-item>
              </v-flex>
            </v-layout>
          </v-item-group>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import titleImage from '~/assets/images/icon-256.png'

export default {
  name: 'IndexContent',
  data () {
    return {
      titleImage,
      menus: [
        {
          icon: 'fas fa-th',
          title: '게임 시작',
          to: '/game'
        },
        {
          icon: 'fas fa-chart-bar',
          title: '기록 확인',
          to: '/ranking'
        }
      ]
    }
  },
  methods: {
    navigateContent (path) {
      this.$store.commit('navigateContent', path)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-item-group > * {
  cursor: auto;
}

@media (orientation: portrait) {
  .content-section {
    width: 100%;
  }

  .game-logo {
    margin-top: calc((50vh - 24px - 256px) / 2);
  }
}

@media (orientation: portrait) and (max-width: 959px) {
  .game-logo {
    margin-top: calc((50vh - 16px - 256px) / 2);
  }
}

@media (orientation: landscape) {
  .content-section {
    height: 100%;
  }

  .game-logo {
    margin-left: calc((50vw - 24px - 256px) / 2);
  }

  .menu-wrapper {
    max-width: 320px;
  }
}

@media (orientation: landscape) and (max-width: 959px) {
  .game-logo {
    margin-left: calc((50vw - 16px - 256px) / 2);
  }
}
</style>

<template>
  <v-layout
    wrap
    fill-height
    align-center
    justify-center
  >
    <v-flex
      xs12
    >
      <v-img
        :src="titleImage"
        alt="'1부터 30까지!' 로고"
        aspect-ratio="1"
        max-width="256"
        class="mx-auto"
      >
        <template
          v-slot:placeholder
        >
          <v-layout
            fill-height
            justify-center
            align-center
            ma-0
          >
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            />
          </v-layout>
        </template>
      </v-img>
    </v-flex>
    <v-flex
      xs10
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
                :color="(index % 2 === 1 ? '#3f240d' : '#ffc039')"
                :dark="index % 2 === 1"
                :to="menu.to"
                nuxt
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
</template>

<script>
import titleImage from '~/assets/images/icon-256.png'

export default {
  name: 'IndexPage',
  data () {
    return {
      titleImage,
      menus: [
        {
          icon: 'fas fa-th',
          title: '게임 시작',
          to: '/play'
        },
        {
          icon: 'fas fa-chart-bar',
          title: '기록 확인'
        },
        {
          icon: 'fas fa-cog',
          title: '설정'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.v-item-group > * {
  cursor: auto;
}
</style>

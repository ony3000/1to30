<template>
  <v-layout
    column
    justify-space-around
  >
    <div>
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
    </div>
    <div>
      <v-item-group>
        <v-layout
          v-for="(menu, index) in menus"
          :key="index"
          justify-center
        >
          <v-flex
            xs9
            sm8
            md7
            lg6
            xl5
          >
            <v-item>
              <v-btn
                block
                :color="(index % 2 === 1 ? '#3f240d' : '#ffc039')"
                :dark="index % 2 === 1"
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
    </div>
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
          title: '게임 시작'
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

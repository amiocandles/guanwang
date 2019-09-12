<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide><img class="w-100" src="../assets/images/1a47fa57c9f8788915c9bd2910934628.jpeg" alt="">
      </swiper-slide>
      <swiper-slide><img class="w-100" src="../assets/images/8d70c307990bb05fa426df958bd079b7.jpeg" alt="">
      </swiper-slide>
      <swiper-slide><img class="w-100" src="../assets/images/3f6710078004275f152afd985c420549.jpeg" alt="">
      </swiper-slide>
      <swiper-slide><img class="w-100" src="../assets/images/4a14df2d8ebcc470a933207fccfc7ed5.jpeg" alt="">
      </swiper-slide>
      <swiper-slide><img class="w-100" src="../assets/images/25275b7ec19dce912c2c96cdcdf0f99a.jpeg" alt="">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!--end of swiper-->
    <div class="nav-icons bg-white mt-3  text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!--end of nav icons-->
    <!--    <m-card icon="menu1" title="新闻资讯">-->
    <!--      <div class="nav jc-between">-->
    <!--        <div class="nav-item active">-->
    <!--          <div class="nav-link">综合</div>-->
    <!--        </div>-->
    <!--        <div class="nav-item">-->
    <!--          <div class="nav-link">公告</div>-->
    <!--        </div>-->
    <!--        <div class="nav-item">-->
    <!--          <div class="nav-link">赛事</div>-->
    <!--        </div>-->

    <!--        <div class="nav-item">-->
    <!--          <div class="nav-link">攻略</div>-->
    <!--        </div>-->

    <!--        <div class="nav-item">-->
    <!--          <div class="nav-link">社区</div>-->
    <!--        </div>-->

    <!--      </div>-->
    <!--      <div class="pt-3">-->
    <!--        <swiper>-->
    <!--          <swiper-slide v-for="m in 5" :key="m">-->
    <!--            <div class="py-2">-->
    <!--              <span class="item-type">[视频]</span>-->
    <!--              <a class="item-href" target="_blank" href="//lol.qq.com/v/v2/detail.shtml?docid=13862131317533405458" onclick="PTTSendClick('Notice','Notice23-1','星之守护者全新动画短片《光与蚀》预告');SendEAS.sendNewsPV('index','//lol.qq.com/v/v2/detail.shtml?docid=13862131317533405458','13862131317533405458')">-->
    <!--                星之守护者全新动画短片《光与蚀》预告-->
    <!--              </a>-->
    <!--              <span class="item-time">09-08</span>-->
    <!--            </div>-->
    <!--            <div class="py-2">-->
    <!--              <span class="item-type">[赛事]</span>-->
    <!--              <a class="item-href" target="_blank" href="//lol.qq.com/news/detail.shtml?docid=15594636022658498239" onclick="PTTSendClick('Notice','Notice23-2','恭喜iG晋级2019全球总决赛');SendEAS.sendNewsPV('index','//lol.qq.com/news/detail.shtml?docid=15594636022658498239','15594636022658498239')">-->
    <!--                恭喜iG晋级2019全球总决赛-->
    <!--              </a>-->
    <!--              <span class="item-time">09-08</span>-->
    <!--            </div>-->
    <!--            <div class="py-2">-->
    <!--              <span class="item-type">[赛事]</span>-->
    <!--              <a class="item-href" target="_blank" href="//lol.qq.com/news/detail.shtml?docid=5053822820297401909" onclick="PTTSendClick('Notice','Notice23-3','JackeyLove五杀卡莎 iG挺进第二轮');SendEAS.sendNewsPV('index','//lol.qq.com/news/detail.shtml?docid=5053822820297401909','5053822820297401909')">-->
    <!--                JackeyLove五杀卡莎 iG挺进第二轮-->
    <!--              </a>-->
    <!--              <span class="item-time">09-07</span>-->
    <!--            </div>-->
    <!--          </swiper-slide>-->
    <!--        </swiper>-->
    <!--      </div>-->
    <!--    </m-card>-->
    <m-list-card icon="menu-1" title="新闻资讯" :categories="newsCats">
      <!--在父组件中不通过循环拿到子组件循环体中某一个变量-->
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info px-2">[{{news.categoryName}}]</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createAt|date}}</span>
        </router-link>
      </template>
    </m-list-card>

    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <!--在父组件中不通过循环拿到子组件循环体中某一个变量-->
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link
            tag="div"
            :to="`heroes/${hero._id}`"
            class="p-2 text-center"
            style="width: 20%"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" alt="" class="w-100"/>
            <p>{{hero.name}}</p>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <m-card icon="menu1" title="精彩视频"></m-card>
    <m-card icon="menu1" title="图文攻略"></m-card>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  export default {
    name: 'home',
    filters:{
      date(val) {
        return dayjs(val).format("MM/DD");
      }
    },
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.pagination-home'
          }
        },
        newsCats:[],
        heroCats:[],
      };
    },
    methods:{
      async fetchNewsCats(){
        const res = await this.$http.get('news/list')
        this.newsCats = res.data
      },
      async fetchHeroCats(){
        const res = await this.$http.get('heroes/list')
        this.heroCats = res.data
      },
    },
    created(){
      this.fetchNewsCats(),
      this.fetchHeroCats()
    }
  }
</script>
<style lang="scss" scoped>
  @import "../assets/scss/variables.scss";

  .pagination-home {

  .swiper-pagination-bullet {
    /*不透明*/
    opacity: 1;
    border-radius: 0.1538rem;
    background: #ffffff;

    &.swiper-pagination-bullet-active {
    background: map-get($colors, 'info');
  }

  }
  }
  .nav-icons {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;

  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;

    &:nth-child(4n) {
    border-right: none;
  }

  }
  }
</style>

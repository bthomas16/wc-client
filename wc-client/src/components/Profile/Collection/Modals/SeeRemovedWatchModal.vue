<template>
    <b-container fluid>
        <b-row align-h="center" no-gutters>
            <b-col cols="auto">

                <b-carousel
                    style="text-shadow: 1px 1px 2px #333;"
                    img-width="1024"
                    img-height="480"
                    background="lightgray"
                    :interval=0
                    :controls="removedWatchToSee.src.images.length > 1 ? true : false"
                    :indicators="removedWatchToSee.src.images.length > 1 ? true : false">

                    <b-carousel-slide
                        v-for="image in removedWatchToSee.src.images" :key="image.order" class="watchImgWrapper">
                        <b-img slot="img" class="watchImg"
                        :src="image.src" thumbnail alt="image slot" fluid>
                        </b-img>
                    </b-carousel-slide>
                </b-carousel> -->
            </b-col>
            <b-col cols="11" class="mt-2 mx-auto">
                <ul class="p-0 mx-auto">
                    <li v-if="removedWatchToSee.typeMoved">Watch removed reason:  <strong>{{MapTypeReason(removedWatchToSee.typeMoved)}}</strong></li>
                    <li v-if="removedWatchToSee.value">Watch Value: <strong>${{removedWatchToSee.value}}</strong></li>
                    <li v-if="removedWatchToSee.receivedBy">New watch recipient: <strong>{{removedWatchToSee.receivedBy}}</strong></li>
                    <li v-if="removedWatchToSee.receivedInReturn">Received in return: <strong>{{removedWatchToSee.receivedInReturn}}</strong></li>
                </ul>
            </b-col>

        </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'removedWatchModal',
  props: ['removedWatchToSee'],
  methods: {
      MapTypeReason(value) {
          let val;
          switch(value) {
              case 'trade_cash':
                val = 'Trade + Cash'
                break;
              case 'trade':
                val = 'Trade'
                break;
              case 'sale':
                val = 'Sale'
                break;
              case 'gifted':
                val = 'Gifted'
                break;
              case 'charity':
                val = 'Charity'
                break;
          }
          return val;
      }
  }
}
</script>

<style scoped>
.watchImgWrapper {
    width: 15rem;
    height: 15rem;
}

.watchImg {
    width: 100%;
    height: auto;
    object-fit: center;
}

.watchImgWrapper {
    width: 15rem;
    height: 15rem;
}

.watchImg {
    width: 100%;
    height: auto;
    object-fit: center;
}

</style>

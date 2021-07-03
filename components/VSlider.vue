<template>
  <div class="slider__wrapper">
    <div class="slider">
      <div class="slider__slides--wrapper">
        <div
          ref="slides"
          class="slider__slides"
          @touchend="changeSlide"
          @touchstart="(e) => (touchXStart = e.touches[0].clientX)"
          @touchmove="(e) => (touchXEnd = e.touches[0].clientX)"
        >
          <template v-for="(slide, index) in getCurrentSlides">
            <NuxtLink
              :id="slide.key"
              :key="index + slide.name"
              tag="div"
              :to="slide.link"
              class="slider__slide"
            >
              <img :src="slide.img" :alt="slide.nam" />
            </NuxtLink>
          </template>
        </div>
      </div>
      <div class="slider__pre-btn" @click="preSlide">
        <img src="~/assets/img/slide_left.png" alt="Предыдущий слайд" />
      </div>
      <div class="slider__next-btn" @click="nextSlide">
        <img src="~/assets/img/slide_right.png" alt="Сдедующий слайд" />
      </div>
      <div class="slider__actions">
        <div
          v-for="(slide, index) in slides"
          :key="slide.name + index"
          class="action"
          :class="activeSlideIndex - 1 === index ? 'active' : ''"
          @click="selectslide(index)"
        >
          {{ slide.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeSlideIndex: 1,
      slideItemWidth: 0,
      touchXEnd: 0,
      touchXStart: 0,
    }
  },
  computed: {
    getCurrentSlides() {
      if (!this.slides.length) {
        return []
      }
      return [
        {
          ...this.slides[this.slides.length - 1],
          key: 'lastSlide',
        },
        ...this.slides,
        {
          ...this.slides[0],
          key: 'firstSlide',
        },
      ]
    },
  },
  mounted() {
    this.setSettingsValue()
    this.$refs.slides.addEventListener('transitionstart', () => {
      if (
        this.$refs.slides.childNodes[this.activeSlideIndex].id === 'lastSlide'
      ) {
        this.$refs.slides.style.transition = 'none'
        this.activeSlideIndex = this.$refs.slides.childNodes.length - 2
        this.$refs.slides.style.transform = `translateX(${
          -this.slideItemWidth * this.activeSlideIndex
        }px)`
      } else if (
        this.$refs.slides.childNodes[this.activeSlideIndex].id === 'firstSlide'
      ) {
        this.$refs.slides.style.transition = 'none'
        this.activeSlideIndex = 1
        this.$refs.slides.style.transform = `translateX(${
          -this.slideItemWidth * this.activeSlideIndex
        }px)`
      }
    })
    window.addEventListener('resize', () => {
      this.setSettingsValue()
    })
  },
  methods: {
    changeSlide() {
      if (this.touchXStart > this.touchXEnd) {
        this.nextSlide()
      } else {
        this.preSlide()
      }
    },
    setSettingsValue() {
      if (!this.$refs.slides) {
        return
      }

      const slidesList = this.$refs.slides
      if (slidesList.childNodes.length) {
        this.slideItemWidth = slidesList.childNodes[0].clientWidth
      }
      this.$refs.slides.style.transition = 'none'
      this.$refs.slides.style.transform = `translateX(${
        -this.slideItemWidth * this.activeSlideIndex
      }px)`
    },
    selectslide(index) {
      this.$refs.slides.style.transition = 'transform 0.4s ease-in-out'
      this.activeSlideIndex = index + 1
      this.$refs.slides.style.transform = `translateX(${
        -this.slideItemWidth * this.activeSlideIndex
      }px)`
    },
    preSlide() {
      this.$refs.slides.style.transition = 'transform 0.4s ease-in-out'
      this.activeSlideIndex--
      this.$refs.slides.style.transform = `translateX(${
        -this.slideItemWidth * this.activeSlideIndex
      }px)`
    },
    nextSlide() {
      this.$refs.slides.style.transition = 'transform 0.4s ease-in-out'
      this.activeSlideIndex++
      this.$refs.slides.style.transform = `translateX(${
        -this.slideItemWidth * this.activeSlideIndex
      }px)`
    },
  },
}
</script>

<style lang="scss" scoped>
.slider {
  width: 100%;
  height: 100%;
  position: relative;

  &__wrapper {
    width: 960px;
    margin: 10px auto;

    @media (max-width: 960px) {
      width: 100%;
    }
  }

  &__slides {
    width: 100%;
    height: 90%;
    display: flex;
    flex-wrap: nowrap;

    &--wrapper {
      overflow: hidden;
    }
  }

  &__slide {
    min-width: 100%;
    height: 100%;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__actions {
    display: flex;
    justify-content: space-between;

    .action {
      flex-grow: 1;
      padding: 20px 15px;
      margin: 4px 2px;
      text-align: center;
      font-size: 16px;
      color: black;
      background-color: white;
      cursor: pointer;

      &.active {
        color: white;
        background-color: black;
      }

      &:hover {
        color: white;
        background-color: black;
      }

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &__pre-btn,
  &__next-btn {
    cursor: pointer;
    position: absolute;

    @media (max-width: 960px) {
      display: none;
    }
  }
  &__pre-btn {
    top: calc(50% - 20px);
    left: -30px;
  }

  &__next-btn {
    top: calc(50% - 20px);
    right: -30px;
  }
}
</style>

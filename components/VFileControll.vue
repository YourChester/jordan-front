<template>
  <div class="filte-controll">
    <img
      v-show="files.length !== 4"
      class="filte-controll__btn"
      src="~/assets/img/img.jpg"
      alt="Добавить фото"
      @click="addFile"
    />
    <input
      ref="input"
      class="filte-controll__input"
      type="file"
      accept="image/*"
      @input="seveFile"
    />
    <div class="filte-controll__list-wrapper">
      <div class="filte-controll__list">
        <div v-for="file in files" :key="file" class="filte-controll__item">
          <img :src="`${url}${file}`" alt="" width="300px" />
          <img
            class="filte-controll__delete"
            src="~/assets/img/close.svg"
            width="12"
            height="12"
            @click="deleteFile(file)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    articul: {
      type: String,
      default: '',
    },
  },
  data: () => {
    return {
      files: [],
      url: '',
    }
  },
  watch: {
    images: {
      deep: true,
      handler(newVal) {
        this.files = newVal
      },
    },
  },
  created() {
    this.url = process.env.IMG_URL
    this.files = this.images
  },
  methods: {
    addFile() {
      if (!this.articul) {
        this.noArticul()
        return
      }
      this.$refs.input.click()
    },
    async seveFile(e) {
      try {
        const formData = new FormData()
        formData.append('images', e.target.files[0])
        const result = await this.$axios.put(
          `/admin/file/${this.articul}`,
          formData
        )
        this.files.push(result.data)
      } catch (error) {
        console.log(error)
      }
    },
    async deleteFile(file) {
      try {
        await this.$axios.delete(`/admin/file/${file}`)
        const index = this.files.indexOf(file)
        this.files.splice(index, 1)
      } catch (error) {
        console.log(error)
      }
    },
    noArticul() {
      alert('Артикул не задан')
    },
  },
}
</script>

<style lang="scss" scoped>
.filte-controll {
  &__btn {
    margin-left: 20px;
    cursor: pointer;
  }

  &__title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  &__input {
    display: none;
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 600;

    img {
      cursor: pointer;
      margin-left: 10px;
    }
  }

  &__item {
    position: relative;
  }

  &__delete {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>

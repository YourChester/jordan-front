<template>
  <div class="card-form__wrapper">
    <div class="card-form">
      <label>
        Номер карты
        <input v-model="localCard.code" type="text" />
      </label>
      <label>
        ФИО клиента
        <input v-model="localCard.name" type="text" />
      </label>
      <label>
        Теолефон
        <input
          v-model="localCard.phone"
          type="text"
          placeholder="380XXXXXXXXX"
        />
      </label>
      <label>
        Дата рождения
        <input v-model="localCard.birthday" type="date" />
      </label>
      <label>
        Скидка
        <input v-model="localCard.discount" type="text" />
      </label>
      <label>
        Комментарий
        <textarea v-model="localCard.comment" cols="30" rows="10"></textarea>
      </label>
    </div>
    <div class="card-form__actions">
      <button :disabled="loadData" @click="saveCard">Сохранить</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      default: () => {},
    },
    code: {
      type: Number,
      default: 0,
    },
  },
  data: () => {
    return {
      localCard: {
        phone: '',
        email: '',
        birthday: '',
        comment: '',
        code: 0,
        name: '',
        discount: 10,
      },
      loadData: false,
    }
  },
  created() {
    if (this.card) {
      this.localCard = {
        ...this.localCard,
        ...this.card,
      }
    }
    if (this.code) {
      this.localCard.code = this.code
    }
  },
  methods: {
    async saveCard() {
      try {
        this.loadData = true
        if (this.localCard._id) {
          await this.$axios.put(`/admin/discount-cards/${this.localCard._id}`, {
            ...this.localCard,
          })
        } else {
          await this.$axios.post(`/admin/discount-cards/`, {
            ...this.localCard,
          })
        }
        this.loadData = false
        alert('Карта успешно создана')
        this.$router.push('/admin-panel/discount-card')
      } catch (e) {
        console.log(e?.message || '')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card-form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    width: 20%;
    display: flex;
    flex-direction: column;
    padding: 5px 0;
  }

  &__actions {
    margin-top: 20px;
  }
}
</style>

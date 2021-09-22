<template>
  <div class="form__wrapper">
    <div class="form">
      <label>
        Название:
        <input v-model="cost.name" type="text" />
      </label>
      <label>
        Сумма:
        <input v-model="cost.sum" type="text" />
      </label>
      <label>
        Дата:
        <input v-model="cost.date" type="date" />
      </label>
      <label>
        Комментарий:
        <textarea v-model="cost.comment" />
      </label>
    </div>
    <button @click="cost._id ? $emit('save', cost) : $emit('add', cost)">
      Сохранить
    </button>
  </div>
</template>

<script>
import { getDateForInput } from '@/assets/utils/date'

export default {
  props: {
    costProps: {
      type: Object,
      default: null,
    },
  },
  data: () => {
    return {
      cost: {
        name: '',
        sum: '',
        date: '',
        comment: '',
      },
    }
  },
  created() {
    if (this.costProps) {
      this.cost = {
        ...this.cost,
        ...this.costProps,
        date: getDateForInput(this.costProps.date),
      }
    } else {
      this.cost.date = getDateForInput(new Date())
    }
  },
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;

  label {
    width: 200px;
    display: flex;
    flex-direction: column;
    padding: 5px 0;
  }

  &__wrapper {
    padding: 20px;

    button {
      margin-top: 20px;
    }
  }
}
</style>

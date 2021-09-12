<template>
  <div class="manager">
    <h1>Менеджеры</h1>
    <div class="manager__list">
      <div
        v-for="(seller, index) in sellers"
        :key="seller._id"
        class="manager__list-item"
      >
        <div>
          {{ index + 1 }}
        </div>
        <div class="inputs">
          <select v-model="seller.role">
            <option v-for="role in roles" :key="role._id" :value="role._id">
              {{ role.name }}
            </option>
          </select>
        </div>
        <div class="inputs">
          <input v-model="seller.login" type="text" name="login" />
        </div>
        <div class="inputs">
          <input v-model="seller.password" type="password" name="password" />
        </div>
        <div class="inputs">
          <button @click="changeSeller(seller)">Изменить</button>
        </div>
        <div class="inputs">
          <button @click="deleteSeller(seller)">Уволить</button>
        </div>
      </div>
    </div>
    <div class="manager__form">
      <div class="inputs">
        <select v-model="newSeller.role">
          <option value="">Выберите роль</option>
          <option v-for="role in roles" :key="role._id" :value="role._id">
            {{ role.name }}
          </option>
        </select>
      </div>
      <div class="inputs">
        <input v-model="newSeller.login" type="text" name="login" />
      </div>
      <div class="inputs">
        <input v-model="newSeller.password" type="password" name="password" />
      </div>
      <div class="inputs">
        <button @click="addSeller">Добавить</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'admin',
  async asyncData({ $axios }) {
    try {
      const {
        data: { sellers },
      } = await $axios.get('/admin/sellers')

      return {
        sellers,
      }
    } catch (e) {
      console.log(e?.message || '')
    }
  },
  data: () => {
    return {
      newSeller: {
        role: '',
        login: '',
        password: '',
        visibility: true,
      },
    }
  },
  computed: {
    ...mapGetters({
      roles: 'codeBooks/roles',
    }),
  },
  methods: {
    async getList() {
      try {
        const {
          data: { sellers },
        } = await this.$axios.get('/admin/sellers')
        this.sellers = sellers
      } catch (e) {
        console.log(e?.message || '')
      }
    },
    async changeSeller(seller) {
      try {
        await this.$axios.put(`/admin/sellers/${seller._id}`, this.seller)
        this.getList()
      } catch (e) {
        console.log(e?.message || '')
      }
    },
    async deleteSeller(seller) {
      try {
        await this.$axios.put(`/admin/sellers/${seller._id}`, {
          visibility: false,
        })
        this.getList()
      } catch (e) {
        console.log(e?.message || '')
      }
    },
    async addSeller() {
      try {
        await this.$axios.post(`/admin/sellers/`, this.newSeller)
        this.getList()
      } catch (e) {
        console.log(e?.message || '')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.manager {
  padding: 20px;

  &__list-item {
    display: flex;
    padding: 5px 0;

    .inputs {
      margin: 0 10px;
    }
  }

  &__form {
    display: flex;
    margin-top: 20px;
    padding: 5px 9px;

    .inputs {
      margin: 0 10px;
    }
  }
}
</style>

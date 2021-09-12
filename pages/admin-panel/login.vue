<template>
  <div class="auth-form__wrapper">
    <div class="auth-form">
      <div class="auth-form__top">
        <img src="~/assets/img/logo.png" alt="logo" />
      </div>
      <div class="auth-form__main">
        <div class="input-group">
          <input
            v-model="form.login"
            type="text"
            name="login"
            placeholder="Login"
          />
        </div>
        <div class="input-group">
          <input
            v-model="form.password"
            type="password"
            name="login"
            placeholder="Пароль"
          />
        </div>
      </div>
      <div class="auth-form__bottom">
        <button @click="getAuth">Войти</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  data: () => {
    return {
      form: {
        login: '',
        password: '',
      },
    }
  },
  methods: {
    async getAuth() {
      try {
        await this.$auth.loginWith('local', { data: this.form })
        // this.$store.dispatch('loginStatus/setTimeout')
        this.$router.push('/admin-panel/products')
      } catch (e) {
        alert(e?.message || '')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.auth-form {
  width: 300px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba($color: #000000, $alpha: 0.2);

  &__wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(210, 210, 210);
  }

  &__top {
    display: flex;
    justify-content: center;
    padding: 10px;
    img {
      width: 70%;
    }
  }

  &__main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;

    .input-group {
      width: 100%;
      margin-bottom: 10px;
      text-align: center;
      input {
        width: 100%;
        box-sizing: border-box;
        border-radius: 5px;
        border: 2px solid #000;
        padding: 5px;
        font-size: 16px;
        font-weight: 600;
        outline: none;

        &:focus,
        &:active {
          border-color: #ff0000;
        }
      }
    }
  }

  &__bottom {
    padding: 0 10px 10px 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      padding: 10px 20px;
      font-size: 16px;
      font-weight: 600;
      color: white;
      border: none;
      border-radius: 10px;
      background-color: #ff0000;
      outline: none;
    }
  }
}
</style>

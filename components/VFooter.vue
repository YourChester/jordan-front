<template>
  <div class="footer__wrapper">
    <div class="footer">
      <div class="footer__info">
        <p class="info__title">Информация</p>
        <div class="info__contect">
          <nuxt-link to="/contact">Контакты</nuxt-link>
        </div>
        <!-- <div class="info__work">Условия работы магазина</div> -->
        <div class="info__pay">
          <nuxt-link to="/pay_delivery"> Оплата и доставка </nuxt-link>
        </div>
        <div class="info__return">
          <nuxt-link to="/return"> Условия возврата </nuxt-link>
        </div>
      </div>
      <div class="footer__copyright">
        2021 &copy; Jordan-brand - магазин спортивной одежды и обуви в Донецке
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.footer {
  max-width: 960px;
  margin: 0 auto;
  color: white;

  @media (max-width: 960px) {
    width: 100%;
    padding: 0 20px;
  }

  &__wrapper {
    padding: 20px 0;
    background-color: #282828;
  }

  &__info {
    .info {
      &__title {
        padding: 10px 0;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 18px;
      }

      &__contect,
      &__work,
      &__pay,
      &__return {
        padding: 5px 0;
        font-size: 16px;
        cursor: pointer;

        a {
          color: white;
          text-decoration: none;

          &:hover {
            color: #5fc9cb;
          }
        }
      }
    }
  }

  &__copyright {
    padding: 10px 0;
    font-size: 12px;
    color: #878484;
  }
}
</style>

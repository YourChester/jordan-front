<template>
  <div class="footer__wrapper">
    <div class="footer">
      <div class="footer__info">
        <p class="info__title">Информация</p>
        <div class="info__contect">Контакты</div>
        <div class="info__work">Условия работы магазина</div>
        <div class="info__pay">Оплата и доставка</div>
        <div class="info__return">Условия возврата</div>
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

        &:hover {
          color: #5fc9cb;
        }
      }
    }
  }

  &__copyright {
    padding: 10px 0;
    font-size: 12px;
  }
}
</style>

<template>
  <div class="contact">
    <h1>Контактная информация</h1>
    <p>
      <b> Адрес магазина: </b>
      <br />
      г. Донецк, пр. Титова, 8-Б (ориентир "Детский Мир").
    </p>
    <p>
      <b> Телефоны: </b>
      <br />
      +38 050 959 55 05
      <br />
      +38 071 361 97 67
    </p>
    <p>
      <b>Время работы:</b>
      <br />
      пн.-пт. 12:00 - 17:00
      <br />
      сб.-вс. 11:00 - 17:00
      <br />
      без выходных.
    </p>
    <img src="/img/map.jpeg" alt="Адрес магазина" width="100%" />
  </div>
</template>

<style lang="scss" scoped>
.contact {
  width: 960px;
  margin: 0 auto;
  padding: 20px 0;

  @media (max-width: 960px) {
    width: 100%;
  }

  p {
    font-size: 14px;
    margin: 14px 0;
  }
}
</style>

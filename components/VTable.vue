<template>
  <table class="v-table">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.key" :class="header.class">
          {{ header.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <template v-for="header in headers">
          <td
            :key="`${index}${header.title}`"
            :class="header.class"
            :style="header.style"
          >
            <slot :name="header.key" :row="item" :header="header">
              {{ item[header.key] }}
            </slot>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'VTable',
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss">
.v-table {
  width: 100%;
  border-collapse: collapse;

  th {
    padding: 8px;
    font-size: 14px;
    text-align: left;
    border-bottom: 1px solid black;
    font-weight: 600;
  }

  tbody > tr {
    transition: 0.2s;
    &:hover {
      background-color: rgba($color: gray, $alpha: 0.1);
      transition: 0.2s;
    }
  }

  td {
    padding: 8px;
    font-size: 14px;
    font-weight: 400;
  }
}
</style>

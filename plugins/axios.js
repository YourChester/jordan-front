export default function (ctx) {
  ctx.$axios.onRequest((config) => {
    if (
      config.url.includes('admin/products') ||
      config.url.includes('admin/solds') ||
      config.url.includes('admin/costs') ||
      config.url.includes('admin/statistic') ||
      config.url.includes('admin/discount-cards') ||
      config.url.includes('admin/categoryies') ||
      config.url.includes('admin/sellers')
    ) {
      // ctx.store.dispatch('loginStatus/updateTimeout')
    }
  })
}

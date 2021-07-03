export default function (ctx) {
  ctx.$axios.onRequest((config) => {
    if (
      !ctx.$auth.strategy.token.status().valid() &&
      config.url.includes('admin')
    ) {
      ctx.redirect(ctx.$auth.options.redirect.login)
    }
  })
}

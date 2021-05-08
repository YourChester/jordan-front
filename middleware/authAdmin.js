export default function (context) {
  const user = context.$auth.$state.user
  if (
    user?.role?.key === 'ADMIN' &&
    context.route.fullPath.includes('/login')
  ) {
    context.redirect(context.$auth.options.redirect.home)
  }
  if (
    user?.role?.key !== 'ADMIN' &&
    !context.route.fullPath.includes('/login')
  ) {
    context.redirect(context.$auth.options.redirect.login)
  }
}

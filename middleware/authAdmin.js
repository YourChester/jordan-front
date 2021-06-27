export default function (context) {
  const user = context.$auth.$state.user
  if (
    user?.role?.key === 'admin' &&
    context.route.fullPath.includes('/login')
  ) {
    context.redirect(context.$auth.options.redirect.home)
  }
  if (
    user?.role?.key !== 'admin' &&
    !context.route.fullPath.includes('/login')
  ) {
    context.redirect(context.$auth.options.redirect.login)
  }
}

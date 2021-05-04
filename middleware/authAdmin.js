export default function (context) {
  const user = context.$auth.$state.user
  if (user?.ruleKey === 'admin' && context.route.fullPath.includes('/login')) {
    context.redirect(context.$auth.options.redirect.home)
  }
  if (user?.ruleKey !== 'admin' && !context.route.fullPath.includes('/login')) {
    context.redirect(context.$auth.options.redirect.login)
  }
}

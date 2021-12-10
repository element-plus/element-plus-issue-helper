export const reproductions = [
  { name: 'Element Plus Playground', domain: 'play.element-plus.org' },
  { name: 'JSFiddle', domain: 'jsfiddle.net' },
  { name: 'CodePen', domain: 'codepen.io' },
  { name: 'CodeSandbox', domain: 'codesandbox.io' },
  { name: 'Docs', domain: 'element-plus.org' },
  { name: 'Docs CN', domain: 'element-plus.gitee.io' },
  { name: 'Github Repo', domain: 'github.com' },
] as const

export const resolveReproductionLink = (text: string) => {
  try {
    const url = new URL(text)
    return reproductions.find((r) => r.domain === url.hostname)
  } catch {
    return null
  }
}

export const removeReproductionPrefix = (text: string) => text.replace(/^!/, '')

export const checkReproductionLink = (text: string) => {
  const reproduction = [
    /https?:\/\/play.element-plus.org\/?$/,
    'https://jsfiddle.net/iamkun/ods20k7t/4',
    'https://codepen.io/iamkun/pen/YzWMaVr',
    'https://codesandbox.io/s/element-plus-spa-ms973',
  ]
  if (
    reproduction.some((rule) =>
      typeof rule === 'string' ? text.startsWith(rule) : rule.test(text)
    )
  )
    return new Error('please do not copy example reproduction link.')

  let url: URL
  try {
    url = new URL(text)
  } catch {
    return new Error(
      'please provide a correct link. (if you insist, please use ! as a prefix)'
    )
  }

  const resolved = resolveReproductionLink(text)
  if (!resolved) {
    return new Error(
      'Currently only reproduction links of Element Plus Playground, JSFiddle, CodePen and CodeSandbox are supported. (if you insist, please use ! as a prefix)'
    )
  }

  if (resolved.name === 'Element Plus Playground') {
    try {
      const parsed = window.atob(url.hash.replace(/^#/, ''))
      JSON.parse(parsed)
    } catch {
      return new Error(
        'Please provide a correct link of Element Plus Playground.'
      )
    }
  }

  return true
}

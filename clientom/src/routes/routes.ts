const routes = {
  auth: {
    in: 'in',
    up: 'up',
    default: 'auth',
  },
  datasets: {
    default: 'datasets',
  },
  oms: {
    default: 'oms',
  },
  pipelines: {
    default: 'pipelines',
  },
  authConfirm: {
    default: 'auth-confirm',
  },

  default: '',
}

const buildRoute = (routeNodes: string[]) => {
  let branch = Object.assign({}, routes)
  const url =
    '/' +
    routeNodes
      .map((v) => {
        if (branch.hasOwnProperty(v)) {
          // @ts-ignore
          branch = branch[v]
        } else {
          throw new Error('Cannot build route')
        }
        let val
        if (branch.hasOwnProperty('default')) {
          val = branch.default
        } else {
          val = branch.toString()
        }
        return val
      })
      .join('/')
  return url
}

export default routes
export { buildRoute }

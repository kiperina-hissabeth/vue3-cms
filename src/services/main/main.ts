import hyRequest from '..'

export function getEntireRoles() {
  return hyRequest.post({
    url: '/role/list',
    data: {
      offset: 0,
      size: 100
    }
  })
}

export function getEntireDepartments() {
  return hyRequest.post({
    url: '/department/list',
    data: {
      offset: 0,
      size: 100
    }
  })
}

export function getEntireMenus() {
  return hyRequest.post({
    url: '/menu/list'
  })
}

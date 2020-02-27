const pub = [
  {
    path: '/pub/down',
    component: () => import('@/views/pub/down/index'),
    meta: {
      title: '资料下载'
    }
  },
  {
    path: '/pub/info',
    component: () => import('@/views/pub/info/index'),
    meta: {
      title: '首页学科竞赛信息'
    }
  },
  {
    path: '/pub/line',
    component: () => import('@/views/pub/line/index'),
    meta: {
      title: '竞赛历程'
    }
  },
  {
    path: '/pub/lunbo',
    component: () => import('@/views/pub/lunbo/index'),
    meta: {
      title: '首页轮播'
    }
  },
  {
    path: '/pub/menu',
    component: () => import('@/views/pub/menu/index'),
    meta: {
      title: '菜单管理'
    }
  },
  {
    path: '/pub/news',
    component: () => import('@/views/pub/news/index'),
    meta: {
      title: '首页新闻'
    }
  },
  {
    path: '/pub/newstwo',
    component: () => import('@/views/pub/newstwo/index'),
    meta: {
      title: '二级新闻'
    }
  },
  {
    path: '/pub/notice',
    component: () => import('@/views/pub/notice/index'),
    meta: {
      title: '二级公告'
    }
  },
  {
    path: '/pub/sign',
    component: () => import('@/views/pub/sign/index'),
    meta: {
      title: '竞赛报名'
    }
  },
  {
    path: '/pub/suc',
    component: () => import('@/views/pub/suc/index'),
    meta: {
      title: '首页成果展示'
    }
  },
  {
    path: '/pub/suctwo',
    component: () => import('@/views/pub/suctwo/index'),
    meta: {
      title: '二级成果展示'
    }
  },
  {
    path: '/pub/team',
    component: () => import('@/views/pub/team/index'),
    meta: {
      title: '团队建设'
    }
  },
  {
    path: '/pub/train',
    component: () => import('@/views/pub/train/index'),
    meta: {
      title: '首页竞赛培训'
    }
  },
  {
    path: '/pub/user',
    component: () => import('@/views/pub/user/index'),
    meta: {
      title: '用户管理'
    }
  }
]
export default pub

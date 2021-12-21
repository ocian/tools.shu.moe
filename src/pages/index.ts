export const pages = [
  { title: 'home', filename: 'home', id: 'home' },
  // { title: 'Editor', filename: 'editor', id: 'editor' },
  { title: '颜色值转换', filename: 'color', id: 'color' },
].map((item) => ({ ...item, link: item.id === 'home' ? '' : item.filename }))

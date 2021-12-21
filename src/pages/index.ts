export const pages = [
  // { title: 'home', filename: 'home', id: 'home' },
  // { title: 'title', filename: 'title', id: 'title' },
  // { title: 'Editor', filename: 'editor', id: 'editor' },
  { title: '颜色值转换', filename: 'color', id: 'color' },
  { title: 'todo', filename: 'todo', id: 'todo' },
].map((item) => ({ ...item, link: item.id === 'home' ? '' : item.filename }))

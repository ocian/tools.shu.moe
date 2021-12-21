import { render } from '../components'

const TodoPage = () => {
  const list = [
    { title: '颜色转换', checked: false },
    { title: 'JSON 格式化', checked: false },
  ]

  return (
    <div className="">
      <p>记录一些这个网站会做的事情</p>
      <ul>
        {list.map((item) => (
          <li key={item.title}>
            <input type="checkbox" checked={item.checked} />
            {' ' + item.title}
          </li>
        ))}
        <input type="checkbox" className="bg-primary" />
      </ul>
    </div>
  )
}

render(TodoPage)

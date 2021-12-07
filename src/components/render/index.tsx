import ReactDOM from 'react-dom'

export function render(App: () => JSX.Element) {
  ReactDOM.render(<App />, document.querySelector('#root'), () => {
    console.log('render callback')
  })
}

export default function renderComponent({ el, component, props, appContext }) {
  let vnode = createVNode(component, props)
  vnode.appContext = { ...appContext } // must spread new object here
  render(vnode, el)

  return () => {
    // destroy component
    render(null, el)
    vnode = undefined
  }
}

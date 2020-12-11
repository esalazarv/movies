const layout = (el, binding, vnode, oldVnode) => {
  if (
    vnode.context &&
    vnode.context.$store.state.application.layout !== binding.value
  ) {
    console.log(`[Layout]: ${binding.value}`);
    vnode.context.$store.commit("application/setLayout", binding.value);
  }
};

export default layout;

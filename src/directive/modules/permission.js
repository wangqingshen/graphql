import vue from 'vue';
vue.directive('isSuper', {
  inserted: function (el, binding, vnode) {
    let {
      arg
    } = binding;
    console.log(vnode);
    const isSuper = 0;
    if ((isSuper === 1 && !arg) || (isSuper !== 1 && arg)) {
      el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none');
    }
  }
});
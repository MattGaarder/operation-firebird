// src/boot/prism.js
import { boot } from 'quasar/wrappers';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';

// make Prism available on window and in Vue instances
window.Prism = Prism;


export default boot(({ app }) => {
  app.config.globalProperties.$prism = Prism

  app.directive('prism', {
    // whenever the element is mounted or updated, highlight it
    beforeMount(el) {
      Prism.highlightAllUnder(el)
    },
    updated(el) {
      Prism.highlightAllUnder(el)
    }
  })
})
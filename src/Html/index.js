const node = (type = '', attributes = [], events = [], children = []) => {
  return {
    type,
    attributes,
    events,
    children
  }
}

function renderTree(tree, parent) {
  tree.map(v => {
    let el = createElement(v)
    setAttributes(v, el)
    setEvents(v, el)
    renderElement(parent, el)

    if (v.children.length > 0) {
      renderTree(v.children, el)
    }
  })
}

function createElement(node) {
  return document.createElement(node.type)
}

function setAttributes(node, element) {
  node.attributes.map(a => {
    for (let prop in a) {
      switch (prop) {
        case 'text':
          setText(element, a[prop])
          break
        default:
          setAttribute(prop, element, a[prop])
          break
      }
    }
  })
}

function setAttribute(attr, el, val) {
  el.setAttribute(attr, val)
}

function setEvents(node, element) {
  node.events.map(event => {
    for (let prop in event) {
      switch (prop) {
        case 'onChange':
          element.addEventListener('keydown', () => event[prop](), false)
          break
        case 'onClick':
          element.addEventListener('click', () => event[prop](), false)
          break
        default:
          break
      }
    }
  })
}

function setText(element, text) {
  element.innerText = text
}

function renderElement(parent, element) {
  parent.appendChild(element)
}

function render(view) {
  renderTree(view(), document.body)
}

function toExport() {
  let elements = [
    'a',
    'article',
    'aside',
    'blockquote',
    'br',
    'button',
    'canvas',
    'caption',
    'code',
    'div',
    'em',
    'embed',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hr',
    'iframe',
    'img',
    'input',
    'label',
    'li',
    'link',
    'main',
    'nav',
    'ol',
    'option',
    'p',
    'picture',
    'section',
    'select',
    'span',
    'strong',
    'td',
    'textarea',
    'th',
    'thead',
    'title',
    'tr',
    'ul'
  ]

  let toExport = {}

  elements.map((element) => {
    toExport[element] = (attributes, events, children) => {
      return node(element, attributes, events, children)
    }
  })

  toExport['render'] = render

  return toExport
}

module.exports = toExport()
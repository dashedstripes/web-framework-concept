const input = (attributes, events) => {
  let element = document.createElement('input')

  for (let prop in attributes) {
    element.setAttribute(prop, attributes[prop])
  }

  if (attributes.type === 'input') {
    element.addEventListener('input', (e) => {
      events.onChange(element.value)
    })
  }

  if (attributes.type === 'checkbox') {
    element.addEventListener('change', () => {
      events.onChange(element.checked)
    })
  }

  document.body.appendChild(element)

  return element
}

let state = {
  input: ''
}

const setInput = (payload) => {
  return {
    type: 'SET_INPUT',
    payload
  }
}

const toggleCheckbox = (isChecked) => {
  return {
    type: 'TOGGLE_CHECKBOX',
    isChecked
  }
}

const dispatch = (action) => {
  state = update(state, action)
  console.log(action)
  console.log(state)
}

const update = (state, action) => {
  switch (action.type) {
    case 'SET_INPUT':
      return { ...state, input: action.payload }
    default:
      return state
  }
}

input({ type: 'input', value: state.input }, { onChange: (val) => dispatch(setInput(val)) })
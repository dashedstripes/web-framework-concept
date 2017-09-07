function InputClass() {

  this.value = ''

  this.element = document.createElement('input')

  this.element.addEventListener('input', (e) => {
    this.value = this.element.value
    this.onChange(this.value)
  })

  document.body.appendChild(this.element)

}

const input = (events) => {
  let input = new InputClass()

  input.onChange = events.onChange
  return input.element
}

const doSomething = (val) => {
  console.log(val)
}

input({ onChange: (val) => doSomething(val) })


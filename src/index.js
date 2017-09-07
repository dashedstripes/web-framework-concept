function Input() {

  this.value = ''

  this.element = document.createElement('input')

  this.element.addEventListener('input', (e) => {
    this.value = this.element.value
  })

}

let input = new Input()

document.body.appendChild(input.element)
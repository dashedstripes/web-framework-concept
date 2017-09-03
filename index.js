let state = {}

const model = Object.freeze(
  {
    input: '',
    todos: []
  }
)

const msg = Object.freeze(
  {
    ADD_TODO: 0,
    SET_INPUT: 1
  }
)

const setInput = (payload) => ({
  type: msg.SET_INPUT,
  payload
})

const addTodo = (payload) => ({
  type: msg.ADD_TODO,
  payload
})

const update = (model, action) => {
  switch (action.type) {
    case msg.SET_INPUT:
      return { ...model, input: action.payload }
    default:
      return model
  }
}

const dispatch = (action) => {
  state = update(model, action)
}

// HTML Rendering

const Todo = ({ text }) => (
  li([{ text: text }], [], [])
)

const TodoList = () => {
  ul([{ class: 'todo-list' }], [], state.todos.map((todo) => (
    Todo(todo)
  )))
}

const NewTodo = () => (
  input([{ type: 'text' }], [{ onChange: dispatch(setInput(this.value)) }], []), // 'this' refers to the input DOM node
  button([{ text: 'Add Todo' }], [{ onClick: dispatch(addTodo({ id: Date.now(), text: state.input })) }], [])
)

const render = () => (
  TodoList(),
  NewTodo()
)
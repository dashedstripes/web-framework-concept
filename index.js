// State object
let state = {}

// Initial Model
const model = Object.freeze(
  {
    input: '',
    todos: []
  }
)

// Messages
const msg = Object.freeze(
  {
    ADD_TODO: 0,
    SET_INPUT: 1
  }
)

// Action creators
const setInput = (payload) => ({
  type: msg.SET_INPUT,
  payload
})

const addTodo = (payload) => ({
  type: msg.ADD_TODO,
  payload
})

// Update the state
const update = (state, action) => {
  switch (action.type) {
    case msg.SET_INPUT:
      return { ...state, input: action.payload }
    case msg.ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] }
    default:
      return state
  }
}

// Dispatch an action and set the state
const dispatch = (action) => {
  state = update(state, action)
}

// Render the HTML
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

// Start the app
state = model
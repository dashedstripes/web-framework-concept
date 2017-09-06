import { div, h2, ul, li, input, button, render } from './Html'

// State object
let state = {}

// Initial Model
const model = Object.freeze(
  {
    input: '',
    todos: [
      {
        id: 1,
        text: 'Order a tesla'
      },
      {
        id: 2,
        text: 'Build a web framework'
      }
    ]
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
  console.log(action)
  state = update(state, action)
  console.log(state)
}

// Render the HTML
const Todo = ({ text }) => (
  li([{ text: text }], [], [])
)

const TodoList = () => (
  ul([{ class: 'todo-list' }], [], state.todos.map((todo) => (
    Todo(todo)
  )))
)

const NewTodo = () => (
  div([], [], [
    input([{ type: 'text', value: state.input }], [], []),
    button([{ text: 'Add Todo' }], [], [])
  ])
)

const App = () => ([
  h2([{ text: 'Todo List' }], [], []),
  TodoList(),
  NewTodo()
])

// Start the app
state = model

render(App)
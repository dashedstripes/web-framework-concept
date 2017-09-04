# Web Framework Concept

This is a design experiment to construct the simplest stateless, reactive Javascript framework possible. The `index.js` file defines a simple Todo app using the proposed architecture.

## Design considerations

I want this framework to only use pure vanilla Javascript, I'm taking a lot of inspiration from Redux and the Elm language/architecture. The structure of this project is fairly straight forward:

1. Define an empty model.

```javascript
const model = Object.freeze(
  {
    input: '',
    todos: []
  }
)
```

2. Create an Enum containing the messages the app will invoke.

```javascript
const msg = Object.freeze(
  {
    ADD_TODO: 0,
    SET_INPUT: 1
  }
)
```

3. Define action creators.

```javascript
const setInput = (payload) => ({
  type: msg.SET_INPUT,
  payload
})

const addTodo = (payload) => ({
  type: msg.ADD_TODO,
  payload
})
```

4. Update the model when an action is dispatched.

```javascript
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
```

5. Render the DOM.

The syntax for HTML rendering is simple:

```javascript
elementName(Array Object attributes, Array Object events, Array Object children)
```

For example, a button element with the class 'my-button', the text "Submit", and an onClick event will be this:

```javascript
button([{ class: 'my-button' text: 'Submit' }], [{ onClick: dispatch(handlClick())}], [])
```

The following renders our Todo app:

```javascript
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
```
/**
 * App's State
 * As the features grow, we need a more
 * flexible data structure for the
 * app's state. Objects are great!
 */
const state = {
  hideCompleted: false,
  formIsValid: false,
  todos: [
    {
      text: 'buy milk',
      completed: true,
    },
    {
      text: 'clean kitchen',
      completed: false,
    },
    {
      text: 'learn js',
      completed: false,
    },
  ],
}


/**
 * =====================================
 * Handle State Rendering
 * =====================================
 * 
 * This portion of the app has the single
 * responsibility to sync the App's State
 * with the final HTML.
 *
 * You can act on existing nodes by adding
 * or removing classes, changing the inner
 * text or value of UI components.
 *
 * A normal (but not optimal) approach is
 * "destroy/create" so to avoid complex
 * DOM updates.
 *
 * But in the end, it is up to you.
 * Thing is, you don't have to worry with
 * the App's logic here, you just have to
 * be sure that the final HTML reflects the
 * data in "state".
 */

const render = () => {
  resetDOMList()
  renderDOMList()
  renderDOMFormStatus()
  renderDOMHelperMessage()
}

/**
 * A "data -> DOM" rendering approach makes
 * it very easy to apply dynamic filters
 * based on the app's state.
 *
 * This is a great example of a new feature
 * that we could implement WITHOUT changing
 * the main rendering logic :-)
 */
const getVisibleTodos = () =>
  state.todos
    .filter(item => state.hideCompleted
      ? !item.completed
      : true
    )

const resetDOMList = () =>
  document
    .querySelectorAll('#todos ul *')
    .forEach($ => $.remove())

const renderDOMList = () =>
  getVisibleTodos()
    .forEach(renderDOMListItem)
    
const renderDOMListItem = (item) => {
  /**
   * NOTE: item is now an object!
   * - item.text
   * - item.completed
   */
 
  const li = document.createElement('li')
  
  // NOTE: the items's text is not a 
  // property of the object
  const txt = document
    .createTextNode(item.text)
  
  li.appendChild(txt)
  
  // NOTE: you can play easily with 
  // conditional classes applied to the
  // list items
  if (item.completed) {
    li.className = 'is-done'
  }
  
  // NOTE: setting an item as completed is
  // now trivial. Just change the data an
  // trigger a new re-render!
  li.addEventListener('click', () => {
    item.completed = !item.completed
    render()
  })
  
  document
     .querySelector('#todos ul')
     .appendChild(li)
}

const getHelperMessage = () =>
  getVisibleTodos().length
    ? null
    : 'Create your first task!'

const renderDOMHelperMessage = () =>
  document
    .querySelector('#todos pre')
    .innerHTML = getHelperMessage()

const getFormClassName = () =>
  state.formIsValid
    ? 'is-valid'
    : ''

const renderDOMFormStatus = () =>
  document
    .querySelector('#todos form')
    .className = getFormClassName()
      



/**
 * =====================================
 * Handle New Item
 * =====================================
 */

const handleSubmit = (e) => {
  e.preventDefault()
  e.stopPropagation()
  
  // reference the text input from the form
  const textEl = e.target[0]
  
  // NOTE: a simple return can do wonders
  // in order to avoid to nest your code
  // too much.
  //
  // This technicque has a name:
  // return first
  if (!textEl.value) return
  
  // Update App's State
  //
  // NOTE: the new todo item now has to
  // respect the app's data structure and
  // implement some default values
  state.todos.push({
    completed: false,
    text: textEl.value,
  })
  
  // Trigger re-rendering
  render()
  
  // reset input
  textEl.value = ''
  textEl.focus()
}

document
  .querySelector('#todos form')
  .addEventListener('submit', handleSubmit)



/**
 * =====================================
 * Handle Form Validation
 * =====================================
 *
 * Ternary operator (inline if) comes in
 * handy for quick decisions like a 
 * class name!
 */
const handleForm = (e) => {
  // Update App's State
  const len = e.target.value.length
  state.formIsValid = len > 0
  
  // Trigger re-rendering
  render()
}

document
  .querySelector('#todos [type="text"]')
  .addEventListener('keyup', handleForm)



/**
 * =====================================
 * Handle Filter UI
 * =====================================
 */

const handleHide = (e) => {
  // Update App's State
  state.hideCompleted = e
    .target
    .checked
  
  // Trigger re-rendering
  render()
 }

document
  .querySelector('[type="checkbox"]')
  .addEventListener('click', handleHide)



/**
 "start the app"
 */
render()

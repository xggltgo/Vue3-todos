const TODO_KEY = 'todoList'; //存放在localStorage中的属性名

/**
 * 获取所有的待办事项
 * @returns 返回待办事项数组
 */
export function fetchTodoList() {
  const todoList = localStorage.getItem(TODO_KEY);
  if (todoList) {
    return JSON.parse(todoList);
  } else {
    return [];
  }
}


/**
 * 保存所有的待办事项到localStorage
 * @param {Array} todoList 所有的待办事项
 */
export function saveTodoList(todoList) {
  localStorage.setItem(TODO_KEY, JSON.stringify(todoList));
}

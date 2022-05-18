import { ref, computed } from 'vue';

export function useEditTodo(todoListRef) {
  const editingTodoRef = ref(null); //当前编辑的todo

  let original;
  //双击编辑
  const editTodo = (todo, inputDom) => {
    original = todo.content;
    editingTodoRef.value = todo;
    setTimeout(() => {
      inputDom.focus();
    }, 0);
  };

  //退出编辑
  const exitTodo = (todo) => {
    editingTodoRef.value = null;
    if (!todo) {
      return;
    }
    const value = todo.content.trim();
    !value && todoListRef.value.splice(todoListRef.value.indexOf(todo), 1);
  };

  //取消编辑
  const cancelEditTodo = (todo) => {
    todo.content = original;
    editingTodoRef.value = null;
  };

  const doneAllTodoRef = computed({
    get() {
      return todoListRef.value.filter((item) => !item.isCompleted).length === 0;
    },
    set(value) {
      todoListRef.value.forEach((item) => (item.isCompleted = value));
    },
  });

  return {
    editingTodoRef,
    editTodo,
    exitTodo,
    cancelEditTodo,
    doneAllTodoRef,
  };
}

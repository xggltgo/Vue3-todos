export function useDeleteTodo(todoListRef) {
  const deleteTodo = (todo) => {
    console.log(todoListRef.value.indexOf(todo));
    todoListRef.value.splice(todoListRef.value.indexOf(todo), 1);
  };

  const deleteAll = () => {
    todoListRef.value = todoListRef.value.filter((item) => !item.isCompleted);
  };

  return {
    deleteTodo,
    deleteAll,
  };
}

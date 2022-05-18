import { ref, watchEffect } from 'vue';
import { fetchTodoList, saveTodoList } from '../utils/todoListStorage';

//处理待办事项列表的获取和保存
export function useTodoList() {
  const todoListRef = ref(fetchTodoList()); //待办事项列表变为响应式
  watchEffect(() => {
    saveTodoList(todoListRef.value); //监控待办事项列表的变化，依赖数据改变，会自动运行函数
  });
  return {
    todoListRef,
  };
}

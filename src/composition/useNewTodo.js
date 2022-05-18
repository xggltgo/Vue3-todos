import { ref } from 'vue';
import { getOnlyId } from '../utils/getOnlyId';
//添加一个待办事项
export function useNewTodo(todoListRef) {
  const todoRef = ref(''); //提供一个响应式数据 供input双向绑定

  //添加一个待办事项
  const addTodo = () => {
    const value = todoRef.value && todoRef.value.trim();
    if (!value) {
      return;
    }
    //构建一个代办事项
    const todoItem = {
      id: getOnlyId(),
      content: value,
      isCompleted: false,
    };
    //加入到待办事项列表中
    todoListRef.value.push(todoItem);
    todoRef.value = '';
  };

  return {
    todoRef,
    addTodo,
  };
}

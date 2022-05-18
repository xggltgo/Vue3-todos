import { ref, onMounted, onUnmounted, computed } from 'vue';

//筛选模式数组
const filterModeArr = ['all', 'active', 'completed'];

//筛选工具函数
function filteredTodoList(allTodoList, mode = 'all') {
  if (mode === 'all') {
    return allTodoList;
  } else if (mode === 'active') {
    return allTodoList.filter((item) => !item.isCompleted);
  } else if (mode === 'completed') {
    return allTodoList.filter((item) => item.isCompleted);
  } else {
    throw new Error('Incorrect mode');
  }
}

//筛选待办事项列表 hash-->筛选方式-->列表
export function useFilterTodoList(todoListRef) {
  const filterModeRef = ref('all'); //筛选方式

  const handleHashChange = () => {
    const hash = location.hash.replace(/#\/?/, '');
    if (filterModeArr.includes(hash)) {
      filterModeRef.value = hash;
    } else {
      location.hash = '';
      filterModeRef.value = 'all';
    }
  };

  //组件挂载完成的生命周期函数
  onMounted(() => {
    window.addEventListener('hashchange', handleHashChange);
  });

  //组件销毁过后的生命周期函数
  onUnmounted(() => {
    window.removeEventListener('hashchange', handleHashChange);
  });

  //模式筛选后的数组
  const filteredTodoListRef = computed(() => {
    return filteredTodoList(todoListRef.value, filterModeRef.value);
  });

  //未完成的数组
  const activeTodoListRef = computed(() => {
    return filteredTodoList(todoListRef.value, 'active');
  });

  //已完成的数组
  const completedTodoListRef = computed(() => {
    return filteredTodoList(todoListRef.value, 'completed');
  });

  return {
    filterModeRef,
    filteredTodoListRef,
    activeTodoListRef,
    completedTodoListRef,
  };
}

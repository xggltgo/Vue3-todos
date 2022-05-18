<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="todoRef"
          @keyup.enter="addTodo"
        />
      </header>
      <section class="main" v-show="todoListRef.length">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          v-model="doneAllTodoRef"
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            :class="{
              completed: item.isCompleted,
              editing: editingTodoRef === item,
            }"
            v-for="(item, index) in filteredTodoListRef"
            :key="item.id"
          >
            <div class="view">
              <input
                class="toggle"
                type="checkbox"
                v-model="item.isCompleted"
              />
              <label @dblclick="editTodo(item, $refs.self[index])">{{
                item.content
              }}</label>
              <button class="destroy" @click="deleteTodo(item)"></button>
            </div>
            <input
              class="edit"
              type="text"
              v-model="item.content"
              ref="self"
              @blur="exitTodo(item)"
              @keyup.enter="exitTodo(undefined)"
              @keyup.escape="cancelEditTodo(item)"
            />
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todoListRef.length">
        <span class="todo-count">
          <strong>{{ activeTodoListRef.length }}</strong>
          <span>item{{ activeTodoListRef.length === 1 ? '' : 's' }} left</span>
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: filterModeRef === 'all' }"
              >All</a
            >
          </li>
          <li>
            <a href="#/active" :class="{ selected: filterModeRef === 'active' }"
              >Active</a
            >
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: filterModeRef === 'completed' }"
              >Completed</a
            >
          </li>
        </ul>
        <button
          class="clear-completed"
          @click="deleteAll"
          v-show="completedTodoListRef.length"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import { useTodoList } from './composition/useTodoList';
import { useNewTodo } from './composition/useNewTodo';
import { useFilterTodoList } from './composition/useFilterTodoList';
import { useDeleteTodo } from './composition/useDeleteTodo';
import { useEditTodo } from './composition/useEditTodo';
export default {
  setup() {
    const { todoListRef } = useTodoList();
    return {
      todoListRef,
      ...useNewTodo(todoListRef),
      ...useFilterTodoList(todoListRef),
      ...useDeleteTodo(todoListRef),
      ...useEditTodo(todoListRef),
    };
  },
};
</script>

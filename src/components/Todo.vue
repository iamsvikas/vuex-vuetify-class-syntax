<template>
  <div class="home">
    <v-text-field
      v-if="!updateTodo"
      v-model="newTaskTitle"
      @keydown.enter="addTask"
      class="pa-3"
      outlined
      label="Add Task"
      prepend-inner-icon="mdi-plus"
      hide-details
      clearable
    ></v-text-field>
    <v-text-field
      v-else
      v-model="editTodo.title"
      @keydown.enter="updateEditedTodo"
      class="pa-3"
      outlined
      label="Update Task"
      prepend-inner-icon="mdi-apple-keyboard-shift"
      hide-details
      clearable
    ></v-text-field>
    <v-list class="pt-0" flat>
      <div v-for="task in tasks" :key="task.id">
        <v-list-item
          @click="doneTask(task.id)"
          :class="{ 'green accent-1': task.done }"
        >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox :input-value="task.done" color="primary"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title
                :class="{ 'text-decoration-line-through': task.done }"
              >
                {{ task.title }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn @click.stop="updateTask(task.id)" icon>
                <v-icon color="blue accent-2">mdi-file-edit-outline</v-icon>
              </v-btn>
              <v-btn @click.stop="deleteTask(task.id)" icon>
                <v-icon color="red accent-3">mdi-delete-sweep</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Todo extends Vue {
  newTaskTitle = "";
  updateTodo = false;
  editTodo = {
    id: null,
    title: "",
    done: false,
  };
  tasks = [
    {
      id: 1,
      title: "Learn VueJs",
      done: false,
    },
    {
      id: 2,
      title: "Learn Vuex",
      done: false,
    },
    {
      id: 3,
      title: "Learn Vuetify",
      done: false,
    },
    {
      id: 4,
      title: "Learn Vue Router",
      done: false,
    },
    {
      id: 5,
      title: "Learn TypeScript",
      done: false,
    },
    {
      id: 6,
      title: "Learn JavaScript",
      done: false,
    },
  ];
  addTask() {
    let newTask = {
      id: Date.now(),
      title: this.newTaskTitle,
      done: false,
    };
    if (this.newTaskTitle !== "") {
      this.tasks.push(newTask);
      this.newTaskTitle = "";
    }
  }
  doneTask(id: number): void {
    let task = this.tasks.filter((task) => task.id === id)[0];
    task.done = !task.done;
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
  updateTask(id: number) {
    this.updateTodo = true;
    this.editTodo.title = this.tasks.filter((task) => task.id === id)[0].title;
    this.editTodo.id = id;
    this.editTodo.done = this.tasks.filter((task) => task.id === id)[0].done;
  }
  updateEditedTodo() {
    let updatedtodo = {
      title: this.editTodo.title,
      id: this.editTodo.id,
      done: this.editTodo.done,
    };
    console.log(updatedtodo);
    if (this.editTodo.title !== "") {
      this.tasks.map((item) => {
        if (item.id === updatedtodo.id) {
          item.title = updatedtodo.title;
          item.done = updatedtodo.done;
        }
      });
      this.editTodo.title = "";
      this.updateTodo = !this.updateTodo;
    }
  }
}
</script>

<style scoped></style>

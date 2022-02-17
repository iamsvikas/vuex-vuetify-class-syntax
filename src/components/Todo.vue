<template>
  <div class="home">
    <v-text-field
      v-if="!$store.state.updateTodo"
      v-model="$store.state.newTodo"
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
      v-model="$store.state.editTodo.title"
      @keydown.enter="updateEditedTodo"
      class="pa-3"
      outlined
      label="Update Task"
      prepend-inner-icon="mdi-apple-keyboard-shift"
      hide-details
      clearable
    ></v-text-field>
    <v-list class="pt-0" flat>
      <div v-for="task in $store.state.tasks" :key="task.id">
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
              <v-btn
                @click.stop="editTask(task.title, task.id, task.done)"
                icon
              >
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
  addTask(): void {
    let newTask = {
      id: Date.now(),
      title: this.$store.state.newTodo,
      done: false,
    };
    if (this.$store.state.newTodo !== "") {
      this.$store.dispatch("addTaskAction", newTask);
      this.$store.state.newTodo = "";
    }
  }
  doneTask(id: number): void {
    // this.$store.dispatch("statusToggler", )
    let task = this.$store.state.tasks.filter((task) => task.id === id)[0];
    task.done = !task.done;
  }

  deleteTask(id: number): void {
    this.$store.dispatch("deleteTaskAction", id);
  }

  editTask(title: string, id: number, status: boolean): void {
    console.log(title, id);
    this.$store.state.updateTodo = !this.$store.state.updateTodo;
    this.$store.state.editTodo.title = title;
    this.$store.state.editTodo.id = id;
    this.$store.state.editTodo.done = status;
  }

  updateEditedTodo(): void {
    let updatedtodo = {
      title: this.$store.state.editTodo.title,
      id: this.$store.state.editTodo.id,
      done: this.$store.state.editTodo.done,
    };
    if (this.$store.state.editTodo.title !== "") {
      this.$store.state.tasks.map((item) => {
        if (item.id === updatedtodo.id) {
          item.title = updatedtodo.title;
          item.done = updatedtodo.done;
        }
      });
      this.$store.dispatch("updateTaskAction", updatedtodo);
      this.$store.state.editTodo.title = "";
      this.$store.state.updateTodo = !this.$store.state.updateTodo;
    }
  }
}
</script>

<style scoped></style>

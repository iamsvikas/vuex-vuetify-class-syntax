import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [
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
    ],
  },
  mutations: {
    addTaskMutate(state, taskItem) {
      state.tasks.push(taskItem);
    },
    deleteTaskMutate(state, id) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    updateTaskMutate(state, data) {
      console.log(data);
      if (data.title !== "") {
        state.tasks.map((item) => {
          if (item.id === data.id) {
            item.title = data.title;
            item.done = data.done;
          }
        });
      }
    },
  },
  actions: {
    addTaskAction({ commit }, taskItem) {
      commit("addTaskMutate", taskItem);
    },
    deleteTaskAction({ commit }, id) {
      commit("deleteTaskMutate", id);
    },
    updateTaskAction({ commit }, item) {
      console.log(item);
      commit("updateTaskMutate", item);
    },
  },
  modules: {},
});

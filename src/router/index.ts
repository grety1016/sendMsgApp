import { onLogin } from "@/api/userLogin";
import { createRouter, createWebHistory } from "vue-router";
import { useLoginStore } from "@/stores";
// import { User } from "@/types/types"; 

const LoginView = () => import("@/views/Login/LoginView.vue");
const FlowForm = () => import("@/views/FlowForm/FlowForm.vue");

const routes = [
  {
    path: "/login",
    alias: "/",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/flowform",
    name: "FlowForm",
    component: FlowForm,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  sensitive: false,
  strict: false,
});

router.beforeEach((to, from, next) => {
  const loginStore = useLoginStore();

  if (to.path !== "/login") {
    if (loginStore.loginUser.token.length < 8) {
      next({ name: "Login" });
    } else {
      onLogin(loginStore.loginUser)
        .then((res) => {
          if (res.data.code === 0) {
            if (to.path == "/") {
              next({ name: "FlowForm" });
            } else {
              next();
            }
          } else {
            loginStore.loginUser.token = "";
            next({ name: "Login" });
          }
        })
        .catch((err) => {
          console.error(err);
          next({ name: "Login" });
        });
    }
  } else {
    if (loginStore.loginUser.token.length < 8) {
      next();
    } else {
      onLogin(loginStore.loginUser)
        .then((res) => {
          if (res.data.code === 0) {
            next({ name: "FlowForm" });
          } else {
            loginStore.loginUser.token = "";
            next({ name: "Login" });
          }
        })
        .catch((err) => {
          console.error(err);
          next({ name: "Login" });
        });
    }
  }
});

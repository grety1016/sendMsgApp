import { onLogin } from "@/api/userLogin";
import { createRouter, createWebHistory } from "vue-router"; 
import { useLoginStore } from "@/stores"; 
import { User } from "@/types/types"; 

const LoginView = () => import("@/views/Login/LoginView.vue");
const FlowForm = () => import("@/views/FlowForm/FlowForm.vue");

const routes = [
  {
    path: "/login",
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

  console.log(to.path);
  if (to.path !== "/login") {
    if (loginStore.loginUser.token.length < 8) {
      // console.log(3);
      next({ name: "Login" });
    } else {
      // console.log(2);
      onLogin(loginStore.loginUser)
        .then((res) => {
          if (res.data.code === 0) {
            // console.log(to.path);
            if (to.path == "/") {
              next({ name: "FlowForm" });
            } else {
              next();
            }
          } else {
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
      // console.log(1);
      next();
    } else {
      onLogin(loginStore.loginUser)
        .then((res) => {
          // console.log(4);
          if (res.data.code === 0) {
            next({ name: "FlowForm" });
          } else {
            // console.log(5);
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

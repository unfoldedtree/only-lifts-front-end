import { createStore } from 'vuex'
import {User} from "@/models/user";

export const userStore = createStore({
    state () {
        return {
            sessionUser: new User({}),
        }
    },
    mutations: {
        setSessionUser(state: any, user: User) {
            state.sessionUser = new User(user);
        },
    }
})
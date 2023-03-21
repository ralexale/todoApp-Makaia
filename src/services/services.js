import axios from "axios";

const URL_TASKS = "https://back-todo-makaia-production.up.railway.app/tasks";

export const getTask = async () => {
    try {
        const { data } = await axios.get(URL_TASKS);
        return data;
    } catch (error) {
        console.log(error);
    }
};

import { useEffect, useState } from "react";
import { Title, TodoInput, TodoList } from "./components";
import { BsMoonStarsFill, BsSun } from "react-icons/bs";
import axios from "axios";

function App() {
    const [theme, setTheme] = useState(null);
    const [todos, setTodos] = useState([]);
    const [activeFilter, setActiveFilter] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState([]);
    const URL_TASKS =
        "https://back-todo-makaia-production.up.railway.app/tasks";
    const addTodo = (title) => {
        const newTodo = {
            title,
            completed: false,
        };

        axios
            .post(`${URL_TASKS}`, newTodo)
            .then((response) => {
                const todoList = [...todos, response.data];
                setTodos(todoList);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSetComplete = (id) => {
        const updatedTodo = todos.find((todo) => todo.id === id);
        const updatedList = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });

        axios
            .patch(`${URL_TASKS}/${id}`, updatedTodo)
            .then(() => {
                setTodos(updatedList);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleClearComplete = () => {
        const completedTodos = todos.filter((todo) => todo.completed);
        const completedIds = completedTodos.map((todo) => todo.id);

        axios
            .delete(`${URL_TASKS}/${completedIds.join(",")}`)
            .then(() => {
                const updatedList = todos.filter((todo) => !todo.completed);
                setTodos(updatedList);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDelete = (id) => {
        axios
            .delete(`${URL_TASKS}/${id}`)
            .then(() => {
                const updatedList = todos.filter((todo) => todo.id !== id);
                setTodos(updatedList);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const showAllTodos = () => {
        setActiveFilter("all");
    };

    const showActiveTodos = () => {
        setActiveFilter("active");
    };

    const showCompletedTodos = () => {
        setActiveFilter("completed");
    };

    useEffect(() => {
        axios
            .get(`${URL_TASKS}`)
            .then((response) => {
                setTodos(response.data);
                setFilteredTodos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (activeFilter === "all") {
            setFilteredTodos(todos);
        } else if (activeFilter === "active") {
            const activeTodos = todos.filter(
                (todo) => todo.completed === false
            );
            setFilteredTodos(activeTodos);
        } else if (activeFilter === "completed") {
            const completedTodos = todos.filter(
                (todo) => todo.completed === true
            );
            setFilteredTodos(completedTodos);
        }
    }, [activeFilter, todos]);

    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    const handleThemeSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <div className="  bg-white dark:bg-[#181824] min-h-screen font-inter h-full text-gray-100 flex items-center justify-center py-20 px-5">
            <section className="w-screen bg-hero-mobile-light  dark:bg-hero-mobile-dark absolute top-0 z-10 h-[200px] bg-cover bg-no-repeat lg:bg-hero-light dark:lg:bg-hero-dark lg:h-[300px] ">
                {""}
            </section>
            <div className="container flex flex-col max-w-xl z-20 mb-52 lg:mb-0">
                <section>
                    <button
                        type="button"
                        onClick={handleThemeSwitch}
                        className="absolute top-[10%] right-[20%] bg-gray-600 dark:bg-white  rounded-md px-3 py-2 text-gray-700 dark:text-gray-600 
                    "
                    >
                        {theme === "dark" ? (
                            <BsSun className="text" />
                        ) : (
                            <BsMoonStarsFill className="text-white" />
                        )}
                    </button>
                    <Title />
                </section>

                <TodoInput addTodo={addTodo} />
                <TodoList
                    activeFilter={activeFilter}
                    todos={filteredTodos}
                    showAllTodos={showAllTodos}
                    showActiveTodos={showActiveTodos}
                    showCompletedTodos={showCompletedTodos}
                    handleSetComplete={handleSetComplete}
                    handleDelete={handleDelete}
                    handleClearComplete={handleClearComplete}
                />
            </div>
        </div>
    );
}

export default App;

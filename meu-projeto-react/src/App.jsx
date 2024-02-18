import { useState } from 'react'
import "./App.css"
import Todo from './components/Todo';
import Todoform from './components/Todoform';
import Search from './components/Search';
import Filter from './components/filter';

function App() {
    const [todos, setTodos] = useState([ 
        {
            id: 1,
            text: "criar funcionalidade x no sistema",
            category: "Trabalho",
            isCompleted: false,
        },
        {
            id: 2,
            text: "Estudar React",
            category: "estudo",
            isCompleted: false,
        },
        {
            id: 3,
            text: "criar funcionalidade x no sistema",
            category: "Trabalho",
            isCompleted: false,
        },
        {
            id: 4,
            text: "criar funcionalidade x no sistema",
            category: "Trabalho",
            isCompleted: false,
        }
    ]);

    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("asc")


    const addTodo = (text, category) => {

        const newTodo = [
            ...todos,
            {
                id: Math.floor(Math.random() * 10000),
                text,
                category,
                isCompleted: false
            },
        ];
        setTodos(newTodo)
    };

    const [search, setSearch] = useState("");

    const removeTodo = (id) => {
        const newTodos = [...todos]
        const filterTodos = newTodos.filter((todo) =>
            todo.id !== id ? todo : null
        );
        setTodos(filterTodos);

    };

    const completeTodo = (id) => {
        const newTodos = [...todos]
        newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo);
        setTodos(newTodos)
    };

    return (
        <div className="app">
            <h1>Lista de tarefas</h1>
            <Search search={search} setSearch={setSearch} />
            <Filter
                filter={filter}
                setFilter={setFilter}
                setSort={setSort}
            />
            <div className="todo-list">
                {todos
                    .filter((todo) =>
                        filter === "all"
                            ? true
                            : filter === "completed"
                                ? todo.isCompleted
                                : !todo.isCompleted
                    )
                    .filter((todo) =>
                        todo.text.toLowerCase().includes(search.toLowerCase())
                    )
                    .sort((a, b) => sort === "asc"
                        ? a.text.localeCompare(b.text)
                        : b.text.localeCompare(a.text)
                    )
                    .map((todo) => (
                        <Todo
                            key={todo.id}
                            todo={todo}
                            removeTodo={removeTodo}
                            completeTodo={completeTodo}
                        />
                    ))}
            </div >
            <Todoform addTodo={addTodo} />
        </div >

    );
}

export default App;

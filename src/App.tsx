import { useEffect, useState } from "react";
import "./App.css";
import Todo from "./Todo";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [input, setInput] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodo = localStorage.getItem("todos");
    return savedTodo ? JSON.parse(savedTodo) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);

    setInput("");
  };
  const completeTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const clearTodo = () => {
    setTodos([]);
  };
  return (
    <>
      <div className=" bg-yellow-600 p-2 min-h-screen flex justify-center items-center">
        <div className="max-w-[500px] w-[90%] p-5 bg-amber-400 rounded-md shadow-md -mt-32">
          <h1 className="font-serif text-center text-2xl italic text-gray-800">
            Todos for the day
          </h1>
          <div className="flex justify-center gap-2 my-6">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Write a Todo"
              className="flex-[3] p-2 outline-none border-2 border-gray-600 rounded-sm focus:border-white"
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={addTodo}
              className="flex-[1] bg-gray-700 rounded-sm cursor-pointer text-sm hover:bg-emerald-800 text-white"
            >
              Add Todo
            </button>
          </div>
          <div>
            <h2 className="font-serif italic text-center text-xl text-gray-800">
              Todo List
            </h2>
            {todos.length > 0 ? (
              <>
                {todos.map((todo) => {
                  return (
                    <Todo
                      key={todo.id}
                      todo={todo}
                      completeTodo={completeTodo}
                      deleteTodo={deleteTodo}
                    />
                  );
                })}
              </>
            ) : (
              <h1 className="text-center text-lg text-gray-600">
                You have completed your Todos
              </h1>
            )}
          </div>
          {todos.length > 0 ? <button
            className="block mx-auto bg-rose-900 rounded-sm cursor-pointer text-md hover:bg-red-700 text-gray-300 px-1 mt-2" 
            onClick={clearTodo}
          >
            Clear Todo
          </button> : ""}
        </div>
      </div>
    </>
  );
}

export default App;

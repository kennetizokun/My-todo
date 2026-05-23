import { FaCheckCircle, FaTrash } from "react-icons/fa";

type TodoProp = {
    todo: {
        id: number,
        text: string,
        completed: boolean
    }
completeTodo: (id: number) => void;
deleteTodo: (id: number) => void;
}

function Todo ({todo, completeTodo, deleteTodo}: TodoProp,) {
    return (
        <>
        <div className="bg-teal-900 rounded-md p-2 flex justify-between my-2 text-white">
              <p className={`${todo.completed === true ? "line-through" : ""}`}>{todo.text}</p>
              <div className="flex gap-4 items-center hover:cursor-pointer">
                <FaCheckCircle className="hover:text-green-400" onClick={() => completeTodo(todo.id)}/>
                <FaTrash className="hover:text-red-500" onClick={() => deleteTodo(todo.id)}/>
              </div>
            </div>
        </>
    )
}

export default Todo
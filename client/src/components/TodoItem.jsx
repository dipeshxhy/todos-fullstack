import { useContext, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { RiEdit2Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { TodoContext } from '../context/TodoContext';
import Modal from './Modal';
// show formatted date , time
export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

const TodoItem = ({ todo }) => {
  const { title, description, completed } = todo;
  console.log(todo._id, todo.title);
  const [value, setValue] = useState({
    title: todo.title,
    description: todo.description,
  });

  const { onDeleteTodo, onUpdateTodo } = useContext(TodoContext);
  function handleChange(name) {
    return (e) => {
      setValue({ ...value, [name]: e.target.value });
    };
  }
  const handleDelete = async (id) => {
    try {
      const res = await onDeleteTodo(id);
      toast(res.message || 'Task deleted successfully', { type: 'success' });
    } catch (error) {
      toast(error.message || 'Failed to delete task', { type: 'error' });
    }
  };
  const editTodo = async (data) => {
    console.log('clicked');
    console.log(todo._id, todo.title);

    try {
      let updatedTodo = data;
      if (!data) {
        updatedTodo = {
          ...todo,
          title: value.title,
          description: value.description,
        };
      }
      const res = await onUpdateTodo(updatedTodo._id, updatedTodo);

      toast(res.message || 'Task updated successfully', { type: 'success' });
    } catch (error) {
      console.log(error, 'edit error');
      toast(error.message || 'Failed to update task', { type: 'error' });
    } finally {
      document.getElementById(`edit_modal_${todo._id}`).close();
    }
  };

  return (
    <div>
      <div className="card bg-gradient-to-r from-base-100 to-base-300 text-neutral-content w-96">
        <div className="card-body items-center text-center">
          <div className="flex justify-evenly w-full">
            <h2 className="card-title font-bold text-secondary">{title}</h2>
            <badge className={`badge ${completed ? 'badge-success' : 'badge-warning'}`}>
              {completed ? 'Completed' : 'Pending'}
            </badge>
          </div>
          <br />
          <p>{description}</p>
          {/* showing date */}

          <div className="card-actions justify-end items-center">
            <time className="badge badge-neutral text-sm text-gray-400">
              {formatDateTime(todo.completedAt || todo.updatedAt || todo.createdAt)}
            </time>
            {/*  */}
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById(`edit_modal_${todo._id}`).showModal()}
            >
              <RiEdit2Fill />
            </button>
            <button className="btn btn-error" onClick={() => handleDelete(todo._id)}>
              <MdDelete />
            </button>
            {/* check to make completed */}
            <button
              className={`btn ${completed ? 'btn-success' : 'btn-warning'}`}
              onClick={() =>
                editTodo({
                  ...todo,
                  completed: !completed,
                  completedAt: !completed ? new Date() : null,
                })
              }
            >
              {completed ? 'Mark as Pending' : 'Mark as Completed'}
            </button>
          </div>
          <Modal id={`edit_modal_${todo._id}`} title="Edit Task">
            <form method="dialog" className="modal-box space-y-4">
              <input
                className="input"
                type="text"
                name="title"
                placeholder="Task title"
                value={value.title}
                onChange={handleChange('title')}
                required
              />
              <textarea
                className="textarea"
                name="description"
                placeholder="Task description"
                value={value.description}
                onChange={handleChange('description')}
              ></textarea>
              <div className="modal-action flex justify-between">
                <button
                  className="btn btn-error"
                  onClick={() => document.getElementById(`edit_modal_${todo._id}`).close()}
                >
                  close
                </button>
                <button className="btn btn-success " type="submit" onClick={editTodo}>
                  Update Task
                </button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default TodoItem;

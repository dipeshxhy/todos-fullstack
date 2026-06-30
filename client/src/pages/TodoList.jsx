import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../components/Modal';
import TodoItem from '../components/TodoItem';
import { authContext } from '../context/AuthContext';
import { TodoContext } from '../context/TodoContext';
import { createTodo } from '../services/todoServices';

import { FaFrownOpen } from 'react-icons/fa';

const TodoList = () => {
  const { user, loading } = useContext(authContext);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [value, setValue] = useState({
    title: '',
    description: '',
  });
  const { todos, setTodos } = useContext(TodoContext);
  const handleChange = (name) => (e) => {
    setValue({ ...value, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title: value.title,
        description: value.description,
        completed: false,
        createdBy: user._id,
      };
      console.log(data, 'todo data');
      // validate the input
      if (!value.title || value.title.length < 3) {
        throw new Error('Title must be at least 3 characters long');
      }
      if (!value.description || value.description.length < 5) {
        throw new Error('Description must be at least 5 characters long');
      }
      const res = await createTodo(data);
      setTodos([...todos, res.data]);
      toast(res.message || 'Task created successfully', { type: 'success' });
      document.getElementById('my_modal_1').close();
    } catch (error) {
      console.log(error);
      toast(error.message, { type: 'error' });
    } finally {
      setValue({
        title: '',
        description: '',
      });
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedFilter === 'completed'
        ? todo.completed
        : selectedFilter === 'pending'
          ? !todo.completed
          : true;

    return matchesSearch && matchesStatus;
  });

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const renderTodos = filteredTodos.map((todo) => <TodoItem key={todo._id} todo={todo} />);
  return (
    <div className="">
      <div className="flex justify-between mt-10 items-center bg-neutral shadow-lg p-4 text-neutral-content">
        <h2 className="text-3xl font-bold ">Your Tasks</h2>
        <input
          className="input w-2/3 py-6  "
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex gap-4 items-center">
          <button
            className="btn btn-accent"
            onClick={() => document.getElementById('my_modal_1').showModal()}
          >
            Add Task
          </button>
          {/* dropdown */}

          <select className="select" value={selectedFilter} onChange={handleFilterChange}>
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
      <Modal id="my_modal_1" title="Add Task">
        <form method="dialog" className="modal-box space-y-4" onSubmit={handleSubmit}>
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
              onClick={() => document.getElementById('my_modal_1').close()}
            >
              close
            </button>
            <button className="btn btn-success " type="submit">
              Add Task
            </button>
          </div>
        </form>
      </Modal>

      <div className="divider divider-base-300"></div>
      <div className="px-2">
        {
          <p className="badge text-lg text-center mx-auto p-3">
            <span className="font-bold text-warning">{filteredTodos.length}</span>{' '}
            {selectedFilter === 'completed'
              ? 'completed'
              : selectedFilter === 'pending'
                ? 'pending'
                : ''}{' '}
            tasks found.
          </p>
        }
      </div>
      <div className="mt-20 flex flex-wrap gap-4 justify-center">
        {filteredTodos.length > 0 ? (
          renderTodos
        ) : (
          <p className="text-4xl text-center">
            <FaFrownOpen size={'2em'} className="inline mr-2 text-warning" />
            No tasks found.
          </p>
        )}
      </div>
    </div>
  );
};

export default TodoList;

import React from 'react';
import { createRef } from 'react';
import ClockTime from './components/ClockTime';
import CryptoPrice from './components/CryptoPrice';
import Pagination from './components/Pagination';
import PopupTaskAded from './components/PopupTaskAded';

const Todolist = (props) => {
  const [newTaskTitle, setNewTaskTitle] = React.useState('');
  const addTaskHere = () => {
    props.addTaskV2(newTaskTitle);
    setNewTaskTitle('');
  };

  const onNewTitleChangeHandler = (e) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e) => {
    console.log(e.code);

    if (e.key === 'Enter') {
      props.addTaskV2(newTaskTitle);
      setNewTaskTitle('');
    }
  };

  const onAllClickFilter = () => {
    console.log(props.classFilterToggle, 'alll tasksclaass');
    props.changeFilter('all');
    // props.setClassFilterToggle((props.classFilterToggle[0] = +1));
    console.log(props.classFilterToggle, 'alll tasksclaass___2');
    props.setPaginationPage(1);
  };
  const onActiveClickFilter = () => {
    props.changeFilter('active');
    props.setPaginationPage(1);
  };

  const onCompletedFilter = () => {
    props.changeFilter('completed');
    props.setPaginationPage(1);
  };

  return (
    <div className="container">
      <div className="App">
        <CryptoPrice />
        <div className="todo_add">
          <ClockTime />
          <h3>TO-DO-LIST</h3>
          <div className="input-add">
            <input
              className="input_add"
              placeholder="Введите ваше напоминание"
              type="text"
              name="name"
              value={newTaskTitle}
              onChange={onNewTitleChangeHandler}
              onKeyDown={onKeyPressHandler}
              // onInput={props.onInputt}
              // defaultValue="Task - "
              // ref={props.inputTextRef}
            />
            <button className="btn_add" onClick={addTaskHere}>
              ADD
            </button>
          </div>
          <div className="todo_filter">
            <button
              className={props.filterr === 'all' ? 'btn_added' : 'btn_add'}
              onClick={onAllClickFilter}>
              all
            </button>
            <button
              className={props.filterr === 'active' ? 'btn_added' : 'btn_add'}
              onClick={onActiveClickFilter}>
              active
            </button>
            <button
              className={props.filterr === 'completed' ? 'btn_added' : 'btn_add'}
              onClick={onCompletedFilter}>
              completed
            </button>
          </div>
        </div>

        <div className="todo_tasks">
          {props.tasks.map((item) => {
            console.log(item.mode, '_todolist_item.mode');
            if (item.mode === 'edit') {
              const editT = () => {
                props.editTask(item, props.btnLocker);
              };
              const removeT = () => {
                props.removeTasks(item.id);
              };
              const onKeyPressHandlerEdit = (e) => {
                if (e.key === 'Enter') {
                  console.log('KEEEYYYY');
                  editT();
                }
              };

              return (
                <div className="todo_tasks_item">
                  <input
                    className="input_add"
                    type="text"
                    defaultValue={item.text}
                    ref={props.inputEditTextRef}
                    onKeyDown={onKeyPressHandlerEdit}
                  />
                  <div className="wrapper_btn">
                    <button className="btn_added" onClick={editT}>
                      Save text
                    </button>
                    <button className="btn_added btn_del" onClick={removeT}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            } else {
              ////////////////////////////////////////////////////////////////////////////////////////////

              const toggleT = () => {
                props.toggleTask(item);
              };
              const editTT = () => {
                props.editTask(item, props.btnLocker);
              };
              const removeTT = () => {
                props.removeTasks(item.id);
              };
              return (
                <div className="todo_tasks_item">
                  <input
                    className="checker"
                    type="checkbox"
                    checked={item.isDone}
                    onClick={toggleT}
                  />

                  <span className={`todo_tasks_text ${item.isDone ? 'todo_task_complete' : ''}`}>
                    {` ${item.isDone ? `task ${item.id} COMPLETED` : ` ${item.text}`}`}
                  </span>
                  <div className="wrapper_btn">
                    <button className="btn_add" onClick={editTT}>
                      Fix text
                    </button>
                    <button className=" btn_add btn_del" onClick={removeTT}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <Pagination
          paginationPage={props.paginationPage}
          setPaginationPage={props.setPaginationPage}
          //tasks={props.tasks}
          pagCount={props.pagCount}
        />
      </div>
      <PopupTaskAded
        popupClass={props.popupClass}
        setPopupClass={props.setPopupClass}
        popupText={props.popupText}
      />
    </div>
  );
};

export default Todolist;

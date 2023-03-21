import React, { useEffect } from 'react';
import { createRef } from 'react';
import ClockTime from './components/ClockTime';
import CryptoPrice from './components/CryptoPrice';
import Pagination from './components/Pagination';
import PopupTaskAded from './components/PopupTaskAded';
import Skeleton from './components/Skeleton';
import { useSelector, useDispatch } from 'react-redux';
import { setPopups } from './redux/slices/popupSlice';
import { setFilterActive, setFilterCompleted, setFilterAll } from './redux/slices/filterSlice';
import { useLocation } from 'react-router-dom';

import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

const Todolist = (props) => {
  const filter = useSelector((state) => state.reduxtest.filter);
  const theme = useSelector((state) => state.reduxtheme.theme);
  const dispatch = useDispatch();

  const location = useLocation();
  console.log(location.pathname);

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
    dispatch(setFilterAll());
    props.setPopup('Filter all');
    //  console.log(props.classFilterToggle, 'alll tasksclaass');
    //  props.changeFilter('all');
    // props.setClassFilterToggle((props.classFilterToggle[0] = +1));

    props.setPaginationPage(1);
  };
  const onActiveClickFilter = () => {
    dispatch(setFilterActive());
    props.setPopup('Filter active');
    //props.changeFilter('active');
    props.setPaginationPage(1);
  };

  const onCompletedFilter = () => {
    dispatch(setFilterCompleted());
    props.setPopup('Filter completed');
    //props.changeFilter('completed');
    props.setPaginationPage(1);
  };
  //filter-active

  useEffect(() => {
    if (location.pathname == '/filter-active') {
      console.log('LOLWORTWTAggwehe');
      onActiveClickFilter();
    } else if (location.pathname == '/filter-completed') {
      onCompletedFilter();
    }
  }, []);

  return (
    <>
      <div className={theme ? 'container active' : 'container'}>
        <div className="App">
          <CryptoPrice />
          <div className={theme ? 'todo_add active' : 'todo_add'}>
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
              <NavLink to="filter-all">
                <button
                  className={filter === 'all' ? 'btn_added' : 'btn_add'}
                  onClick={onAllClickFilter}>
                  all
                </button>
              </NavLink>
              <NavLink to="filter-active">
                <button
                  className={filter === 'active' ? 'btn_added' : 'btn_add'}
                  onClick={onActiveClickFilter}>
                  active
                </button>
              </NavLink>
              <NavLink to="filter-completed">
                <button
                  className={filter === 'completed' ? 'btn_added' : 'btn_add'}
                  onClick={onCompletedFilter}>
                  completed
                </button>
              </NavLink>
            </div>
          </div>

          <div className={theme ? 'todo_tasks active' : 'todo_tasks'}>
            {props.isLoading
              ? [...new Array(10)].map((_, index) => {
                  return <Skeleton key={index} />;
                })
              : props.tasks.map((item) => {
                  if (!props.tasks) {
                    console.log('lllllllllllllll');
                    return <Skeleton />;
                  }
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
                      <div key={item.text + item.id} className="todo_tasks_item">
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
                      <div key={item.text + item.id} className="todo_tasks_item">
                        <input
                          className="checker"
                          type="checkbox"
                          checked={item.isDone}
                          onClick={toggleT}
                        />

                        <span
                          className={`todo_tasks_text ${item.isDone ? 'todo_task_complete' : ''}`}>
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
        <PopupTaskAded popupClass={props.popupClass} setPopupClass={props.setPopupClass} />
      </div>
    </>
  );
};

export default Todolist;

import logo from './logo.svg';
import React, { useEffect } from 'react';
import './App.css';
import Todolist from './Todolist';

import { useState, createRef } from 'react';
import tasksDbj from './tasksDbj.json';
import axios from 'axios';

function App() {
  const [data, setData] = React.useState([]);

  let tasksDb = [
    { id: 1, text: 'Take money', isDone: true, mode: 'add' },
    { id: 2, text: 'Read book', isDone: false, mode: 'add' },
    { id: 3, text: 'make sport break', isDone: true, mode: 'add' },
    { id: 4, text: 'Cocking great lunch', isDone: false, mode: 'add' },
    { id: 5, text: 'show the action for kids', isDone: true, mode: 'add' },
  ];
  const [tasks, setTasks] = React.useState([]);
  const [filter, setFilter] = React.useState('all');
  const [paginationPage, setPaginationPage] = React.useState(1);

  const [pagCount, setPagCount] = React.useState(3);

  function atest() {
    axios.put('https://63427c853f83935a7843d23c.mockapi.io/todo/8', {
      text: '________2_________new___________________new',
    });
    // .then((res) => {
    //   setTasks(res.data);
    // });
  }

  useEffect(() => {
    let urlForCountFilterPagination = '';
    if (filter === 'all') {
      urlForCountFilterPagination = 'https://63427c853f83935a7843d23c.mockapi.io/todo';
    } else if (filter === 'active') {
      urlForCountFilterPagination = 'https://63427c853f83935a7843d23c.mockapi.io/todo?isDone=false';
    } else if (filter === 'completed') {
      urlForCountFilterPagination = 'https://63427c853f83935a7843d23c.mockapi.io/todo?isDone=true';
    }

    axios.get(urlForCountFilterPagination).then((res) => {
      //  setData(res.data);
      setPagCount(res.data.length);
    });

    if (filter === 'all') {
      axios
        .get(`https://63427c853f83935a7843d23c.mockapi.io/todo?&page=${paginationPage}&limit=10`)
        .then((res) => {
          setTasks(res.data);
        });
    } else if (filter === 'active') {
      axios
        .get(
          `https://63427c853f83935a7843d23c.mockapi.io/todo?isDone=false?&page=${paginationPage}&limit=10`,
        )
        .then((res) => {
          setTasks(res.data);
        });
    } else if (filter === 'completed') {
      axios
        .get(
          `https://63427c853f83935a7843d23c.mockapi.io/todo?isDone=true?&page=${paginationPage}&limit=10`,
        )
        .then((res) => {
          setTasks(res.data);
        });
    }
    //atest()
  }, [paginationPage, filter]);

  // const testingF = () => {
  //   const onFetch = async () => {
  //     const req = await fetch('./data.json');
  //     return req;
  //   };

  //   const onMap = () => {
  //     onFetch()
  //       .then((data) => data.json())
  //       .then((json) => console.log(json))
  //       .then((json) => setData(json));
  //     console.log('add state', data);
  //   };
  //   // onMap();

  //   return onMap();
  //   //return console.log('123', onMap());
  //   // return <div className="App">{onMap()}</div>;
  // };

  function removeTasksOLLLLLDDDDDD(id) {
    let filtredTasks = tasks.filter((item) => item.id !== id);
    setTasks(filtredTasks);
    console.log(filtredTasks);
  }

  function removeTasks(id) {
    let filtredTasks = tasks.filter((item) => item.id !== id);
    setTasks(filtredTasks);
    console.log(filtredTasks);

    axios.delete(`https://63427c853f83935a7843d23c.mockapi.io/todo/${id}`);
    // setTasks((prev) => [...prev, obj]);
  }

  function toggleTask(item, cls) {
    let layerToggle = !item.isDone;
    setTasks((item.isDone = !item.isDone));

    axios.put(`https://63427c853f83935a7843d23c.mockapi.io/todo/${item.id}`, {
      isDone: layerToggle,
    });

    console.log(item.isDone, '___toggle_task');
    return setTasks([...tasks]);
  }

  let inputTextRef = React.createRef();
  let inputEditTextRef = React.createRef();

  const onInputt = () => {
    let messaga = inputTextRef.current.value;
    console.log(messaga);
  };

  const [btnLocker, setBtnLocker] = React.useState(0);
  function editTask(item, btnLocker) {
    if ((item.mode === 'add') & (btnLocker === 0)) {
      //   console.log('ADD___was', btnLocker);
      setBtnLocker((btnLocker += 1));
      // console.log('ADD___ NOW', btnLocker);

      setTasks((item.mode = 'edit'));
      //   console.log('Item.mode_ADD = ', item.mode);
    } else if ((item.mode === 'edit') & (btnLocker === 1)) {
      const newText = inputEditTextRef.current.value;

      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id != item.id) {
          console.log('...not item.id ', tasks[i].id);
        } else {
          console.log(`Item_id- ${item.id} find I-moc its__`, i);
          setTasks((tasks[i].text = newText));

          break;
        }
      }
      axios.put(`https://63427c853f83935a7843d23c.mockapi.io/todo/${item.id}`, {
        text: newText,
      });
      //  setTasks((tasks[fId].text = newText)); /// v1

      //   console.log('EDIT___was', btnLocker);
      setBtnLocker((btnLocker = 0));
      // console.log('EDIT___NOW', btnLocker);

      //  setTasks((item.text = newText));
      setTasks((item.mode = 'add'));
      console.log('Item.mode_EDIT = ', item.mode);
    }

    return setTasks([...tasks]);
  }

  // function addTask() {
  //   const newText = inputTextRef.current.value;
  //   const obj = {
  //     id: tasks[tasks.length - 1].id + 1,
  //     text: `${newText} ${tasks[tasks.length - 1].id + 1}`,
  //     isDone: false,
  //     mode: 'add',
  //   };
  //   setTasks([...tasks, obj]);
  //   inputTextRef.current.value = '';
  // }

  function addTaskV2(title) {
    const newText = title;
    const obj = {
      id: Number(tasks[tasks.length - 1].id) + 1,
      // text: `${newText} ${tasks[tasks.length - 1].id + 1}`,
      text: `${newText} `,
      isDone: false,
      mode: 'add',
    };

    console.log('ADD___ID', obj.id);

    axios.post('https://63427c853f83935a7843d23c.mockapi.io/todo', obj);

    setTasks((prev) => [...prev, obj]);
  }

  function changeFilter(value) {
    setFilter(value);
  }

  let tasksForTodolist = tasks;
  if (filter === 'completed') {
    tasksForTodolist = tasks.filter((t) => t.isDone === true);
  }
  if (filter === 'active') {
    tasksForTodolist = tasks.filter((t) => t.isDone === false);
  }

  return (
    <>
      <Todolist
        tasks={tasksForTodolist}
        removeTasks={removeTasks}
        toggleTask={toggleTask}
        //  onInputt={onInputt}
        inputTextRef={inputTextRef}
        editTask={editTask}
        inputEditTextRef={inputEditTextRef}
        btnLocker={btnLocker}
        //  checkTask={checkTask}
        addTaskV2={addTaskV2}
        changeFilter={changeFilter}
        /////////////////////////////////
        filterr={filter}
        paginationPage={paginationPage}
        setPaginationPage={setPaginationPage}
        pagCount={pagCount}
      />
    </>
  );
}

export default App;

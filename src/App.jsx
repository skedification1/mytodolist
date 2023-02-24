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

  function atest() {
    axios
      .post('https://63427c853f83935a7843d23c.mockapi.io/todo', {
        id: 5,
        text: 'show the action_________-111add for kids',
        isDone: true,
        mode: 'add',
      })
      .then((res) => {
        setTasks(res.data);
      });
  }

  useEffect(() => {
    axios.get('https://63427c853f83935a7843d23c.mockapi.io/todo').then((res) => {
      //  setData(res.data);
      setTasks(res.data);
    });

    console.log(tasks, 'its data Effect_1');
  }, []);
  console.log(tasks, 'its data Effect2');

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
    setTasks((item.isDone = !item.isDone));

    console.log(item.isDone, '_______toggle task');
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
      // console.log('ADD___', btnLocker);
      setBtnLocker((btnLocker += 1));
      // console.log('ADD___', btnLocker);

      setTasks((item.mode = 'edit'));
    } else if ((item.mode === 'edit') & (btnLocker === 1)) {
      const newText = inputEditTextRef.current.value;
      setTasks((tasks[item.id - 1].text = newText));

      // console.log('EDIT___', btnLocker);
      setBtnLocker((btnLocker = 0));
      // console.log('EDIT___', btnLocker);

      //  setTasks((item.text = newText));
      setTasks((item.mode = 'add'));
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
      id: tasks[tasks.length - 1].id + 1,
      // text: `${newText} ${tasks[tasks.length - 1].id + 1}`,
      text: `${newText} `,
      isDone: false,
      mode: 'add',
    };

    axios.post('https://63427c853f83935a7843d23c.mockapi.io/todo', obj);
    setTasks((prev) => [...prev, obj]);

    //////////v1.2
    // let newTasks = [...tasks, obj];
    // setTasks(newTasks);
  }

  return (
    <>
      <Todolist
        tasks={tasks}
        removeTasks={removeTasks}
        //  addTask={addTask}
        toggleTask={toggleTask}
        //  onInputt={onInputt}
        inputTextRef={inputTextRef}
        editTask={editTask}
        inputEditTextRef={inputEditTextRef}
        btnLocker={btnLocker}
        //  checkTask={checkTask}
        addTaskV2={addTaskV2}
      />
    </>
  );
}

export default App;

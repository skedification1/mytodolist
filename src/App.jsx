import React, { useEffect } from 'react';
import './App.scss';
import Todolist from './Todolist';
import CryptoPrice from './components/CryptoPrice';
import { useSelector, useDispatch } from 'react-redux';
import { setPopups } from './redux/slices/popupSlice';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
  Routes,
  NavLink,
} from 'react-router-dom';

import tasksDbj from './tasksDbj.json';

// let tasksDb = [
//   { id: 1, text: 'Take money', isDone: true, mode: 'add' },
//   { id: 2, text: 'Read book', isDone: false, mode: 'add' },
//   { id: 3, text: 'make sport break', isDone: true, mode: 'add' },
//   { id: 4, text: 'Cocking great lunch', isDone: false, mode: 'add' },
//   { id: 5, text: 'show the action for kids', isDone: true, mode: 'add' },
// ];

function App() {
  const filter = useSelector((state) => state.reduxtest.filter);
  const dispatch = useDispatch();

  const [tasks, setTasks] = React.useState([]);
  const [paginationPage, setPaginationPage] = React.useState(1);
  const [pagCount, setPagCount] = React.useState(3);
  const [popupClass, setPopupClass] = React.useState('init');
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    setIsLoading(true);
    let urlForCountFilterPagination = '';
    if (filter === 'all') {
      urlForCountFilterPagination = 'https://63427c853f83935a7843d23c.mockapi.io/todo';
    } else if (filter === 'active') {
      urlForCountFilterPagination = 'https://63427c853f83935a7843d23c.mockapi.io/todo?isDone=false';
    } else if (filter === 'completed') {
      urlForCountFilterPagination = 'https://63427c853f83935a7843d23c.mockapi.io/todo?isDone=true';
    }

    axios.get(urlForCountFilterPagination).then((res) => {
      setPagCount(res.data.length);
    });

    if (filter === 'all') {
      axios
        .get(`https://63427c853f83935a7843d23c.mockapi.io/todo?&page=${paginationPage}&limit=10`)
        .then((res) => {
          setTasks(res.data);
          setIsLoading(false);
        });
    } else if (filter === 'active') {
      axios
        .get(
          `https://63427c853f83935a7843d23c.mockapi.io/todo?isDone=false?&page=${paginationPage}&limit=10`,
        )
        .then((res) => {
          setTasks(res.data);
          setIsLoading(false);
        });
    } else if (filter === 'completed') {
      axios
        .get(
          `https://63427c853f83935a7843d23c.mockapi.io/todo?isDone=true?&page=${paginationPage}&limit=10`,
        )
        .then((res) => {
          setTasks(res.data);
          setIsLoading(false);
        });
    }
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

  // function removeTasksOLLLLLDDDDDD(id) {
  //   let filtredTasks = tasks.filter((item) => item.id !== id);
  //   setTasks(filtredTasks);
  //   console.log(filtredTasks);
  // }

  function setPopup(poputText) {
    dispatch(setPopups(poputText));
    if (popupClass !== 'popup_active') {
      setPopupClass('popup_active');
    } else if (popupClass === 'popup_active') setPopupClass('restart');
  }

  function removeTasks(id) {
    let filtredTasks = tasks.filter((item) => item.id !== id);
    setTasks(filtredTasks);
    console.log(filtredTasks);

    axios.delete(`https://63427c853f83935a7843d23c.mockapi.io/todo/${id}`);
    // setTasks((prev) => [...prev, obj]);
    setPopup('Task Deleted');
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

  // const onInputt = () => {
  //   let messaga = inputTextRef.current.value;
  //   console.log(messaga);
  // };

  const [btnLocker, setBtnLocker] = React.useState(0);
  function editTask(item, btnLocker) {
    if ((item.mode === 'add') & (btnLocker === 0)) {
      setBtnLocker((btnLocker += 1));

      setTasks((item.mode = 'edit'));
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

      setBtnLocker((btnLocker = 0));

      setTasks((item.mode = 'add'));
      console.log('Item.mode_EDIT = ', item.mode);
      setPopup('Task Saved');
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
    setPopup('Task Aded');
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
      <BrowserRouter>
        <Routes>
          <Route path="/crypto" element={<CryptoPrice />} />
          <Route path="filter-dadasdasd" element={<Todolist />} />
          <Route
            path="/*"
            element={
              <>
                <Todolist
                  isLoading={isLoading}
                  tasks={tasksForTodolist}
                  removeTasks={removeTasks}
                  toggleTask={toggleTask}
                  inputTextRef={inputTextRef}
                  editTask={editTask}
                  inputEditTextRef={inputEditTextRef}
                  btnLocker={btnLocker}
                  addTaskV2={addTaskV2}
                  setPopup={setPopup}
                  /////////////////////////////////pagination
                  paginationPage={paginationPage}
                  setPaginationPage={setPaginationPage}
                  pagCount={pagCount}
                  ////////popup
                  popupClass={popupClass}
                  setPopupClass={setPopupClass}
                />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

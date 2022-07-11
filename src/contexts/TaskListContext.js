import { collection, addDoc, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase'
import uuid from 'uuid'

export const TaskListContext = createContext()

const TaskListContextProvider = props => {
  const [tasks, settasks] = useState([])
  const [editid, seteditid] = useState()
  useEffect(async () => {
    getData()
  }, [])

  const getData = () => {
    getDocs(collection(db, "tasks")).then(i => {
      let tasksData = []
      i.forEach((n) => tasksData.push({ title: n.data().title, id: n.id }));
      settasks(tasksData)
    });
  }

  const [editItem, setEditItem] = useState(null)

  // Add tasks
  const addTask = async title => {
    editid(null)
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        title
      });
      console.log("Document written with ID: ", docRef.id);
      getData()
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // Remove tasks
  const removeTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    getData()
  }

  // Clear tasks
  const clearList = () => {
    tasks.forEach(async i => await deleteDoc(doc(db, "tasks", i.id)));
    getData()

  }

  // Find task
  const findItem = id => {
    seteditid(tasks.find(task => task.id === id))
  }

  // Edit task
  const editTask = async (title, id) => {
    await setDoc(doc(db, "tasks", id), {
      title
    });
    getData()

  }

  return (
    <TaskListContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        clearList,
        findItem,
        editTask,
        editid
      }}
    >
      {props.children}
    </TaskListContext.Provider>
  )
}

export default TaskListContextProvider

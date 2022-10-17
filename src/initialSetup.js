import makeTask from "./task";
import masterList from "./masterList";
import { renderMain, renderAddTaskModal, renderSideBar } from './render';
import DOM from "./DOMCache";

const today = new Date();
today.setHours(0, 0, 0, 0);

const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(today.getDate() + 2);

const laterDay = new Date(today);
laterDay.setDate(today.getDate() + 8);

const sampleTask1 =  makeTask(today, 'Refactor tic-tac-toe program', 'normal');
const sampleTask2 =  makeTask(today, 'Buy milk', 'high');
const sampleTask3 =  makeTask(tomorrow, 'Buy birthday card', 'normal');
const sampleTask4 =  makeTask(tomorrow, 'Call mom', 'high');
const sampleTask5 =  makeTask(tomorrow, 'Do Ruby beginner tutorial', 'normal');
const sampleTask6 =  makeTask(yesterday, 'Vacuum', 'high');
const sampleTask7 =  makeTask(laterDay, 'Paint the shed', 'high');

masterList.data.push(sampleTask1);
masterList.data.push(sampleTask2);
masterList.data.push(sampleTask3);
masterList.data.push(sampleTask4);
masterList.data.push(sampleTask5);
masterList.data.push(sampleTask6);
masterList.data.push(sampleTask7);

masterList.editTask(sampleTask1, 'project', 'Coding');
masterList.editTask(sampleTask2, 'project', 'Shopping');
masterList.editTask(sampleTask3, 'project', 'Shopping');
masterList.editTask(sampleTask5, 'project', 'Coding');
masterList.editTask(sampleTask6, 'project', 'Housework');
masterList.editTask(sampleTask7, 'project', 'Housework');

masterList.sortByDate();
console.log(masterList.data)
renderMain(masterList, 'today', null);
renderAddTaskModal(DOM.body, masterList.getListOfProjects());
renderSideBar(masterList.getListOfProjects());

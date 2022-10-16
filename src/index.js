import makeTask from "./task";

const today = new Date();
  today.setHours(0, 0, 0, 0);
const sampleTask = makeTask(today, 'Refactor tic-tac-toe program', 'normal');

console.log(sampleTask);

console.log(sampleTask.isCompleted);
sampleTask.isCompleted = true;
console.log(sampleTask.isCompleted);

// Constructor to make task objects
const makeTask = function (date, content, priority, project = null) {
  let isCompleted = false;
  const id = Math.floor(Math.random() * 100000000);
  let taskDate = new Date(date);
  taskDate.setHours(0, 0, 0, 0);
  return {
    date: taskDate,
    content,
    isCompleted,
    priority,
    project,
    id,
  };
};

export default makeTask;

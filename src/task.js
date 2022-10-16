// Constructor to make task objects
const makeTask = function (date, content, priority, project = null) {
  let isCompleted = false;
  const id = Math.floor(Math.random() * 100000000);
  return {
    date: new Date(date),
    content,
    isCompleted,
    priority,
    project,
    id,
  };
};

export default makeTask;

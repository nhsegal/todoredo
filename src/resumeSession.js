import masterList from './masterList';
import { renderMain, renderAddTaskModal, renderSideBar } from './render';
import DOM from './DOMCache';
import { addInitialEventListeners, 
  addMainEventListeners,  
  addSideTimeEventListeners,  
  addSideProjectEventListeners  
} from './addELs.js';
import currentSettings from './currentSettings';
import makeTask from './task';

function myFunction(dataFromServer) {
  const parsedJSON = JSON.parse(dataFromServer);
  for (let i = 0; i < parsedJSON.length; i++) {
    const t = makeTask(parsedJSON[i].date, parsedJSON[i].content, parsedJSON[i].priority);
    t.project = parsedJSON[i].project;
    t.completed = parsedJSON[i].completed;
    masterList.data.push(t);
  }
}

export default function resume() {
  const oldJSON = localStorage.getItem('oldData');
  myFunction(oldJSON);
  renderMain(masterList, currentSettings.viewBy, currentSettings.whichProject);
  renderSideBar(masterList.getListOfProjects());
  renderAddTaskModal(DOM.body, masterList.getListOfProjects());
    
  addInitialEventListeners();
  addMainEventListeners();
  addSideTimeEventListeners();
  addSideProjectEventListeners();
}

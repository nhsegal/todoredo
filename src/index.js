import initialSetup from "./initialSetup";
import masterList from './masterList';
import resumeSession from './resumeSession';

if (!localStorage.getItem('oldData')) {
  initialSetup();
  localStorage.setItem('instance', masterList);
  localStorage.setItem('oldData', JSON.stringify(masterList.data));
  localStorage.setItem('oldDisplayList', JSON.stringify(masterList.displayedList));
} else {
  resumeSession();
}

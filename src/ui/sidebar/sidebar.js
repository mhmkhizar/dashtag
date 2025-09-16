import * as ProjectList from "./project-list";
import * as ProjectDialog from "../dialogs/project-dialog";

const openProjectDialog = document.querySelector(`#open-project-dialog`);

export function init() {
  ProjectList.init();
  openProjectDialog.addEventListener(`click`, ProjectDialog.openDialog);
  ProjectDialog.init();
}

import "./styles.css";
import { defaultProject } from "./project";
import { ProjectModal, SidebarList } from "./dom";

const userProjects = [defaultProject];

SidebarList.render(userProjects);
ProjectModal.init();

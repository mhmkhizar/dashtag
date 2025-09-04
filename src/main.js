import "./main.css";
import * as Sidebar from "./components/sidebar";
import * as ProjectModal from "./components/project-modal";
import * as ProjectService from "./services/project-service";

ProjectService.init();
Sidebar.init();
ProjectModal.init();

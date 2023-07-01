import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Tasks from "./pages/Tasks";
import Kanban from "./pages/Personal/Kanban";
import Calendar from "./pages/Personal/Calendar";
import GroupList from "./pages/Group/GroupList";
import GroupTask from "./pages/Group/GroupTask";
import AppContextProvider from "./context/AppContext";

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <Switch>
          <Route path="/sign-in" exact component={SignIn} />
          <Main>
            <Route exact path="/personal/tasks" component={Tasks} />
            <Route exact path="/personal/kanban" component={Kanban} />
            <Route exact path="/personal/calendar" component={Calendar} />
            <Route exact path="/group/list" component={GroupList} />
            <Route exact path="/group/task" component={GroupTask} />
            <Route exact path="/dashboard" component={Home} />
            <Redirect from="*" to="/personal/tasks" />
          </Main>
        </Switch>
      </div>
    </AppContextProvider>
  );
}

export default App;

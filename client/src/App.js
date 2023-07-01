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
import NewAppContextProvider from "./context/NewAppContext";
import HoKhau from "./components/hokhau/HoKhau";

function App() {
  return (
    <NewAppContextProvider>
      <div className="App">
        <Switch>
          <Route path="/dang-nhap" exact component={SignIn} />
          <Main>
            <Route path="/ho-khau" exact component={HoKhau} />
            <Redirect from="*" to="/ho-khau" />
          </Main>
        </Switch>
      </div>
    </NewAppContextProvider>
  );
}

export default App;

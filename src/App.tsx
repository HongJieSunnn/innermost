import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./redux/stores";
import userManager, { loadUserFromStorage } from "./services/authServices";
import AuthProvider from "./utils/components/AuthProvider";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { IdentityPage } from "./pages/innermost.identity/IdentityPage";
import SigninOidc from "./pages/innermost.identity/SignInOidc";
import { WelcomePage } from "./pages/WelcomePage";
import { SignIn } from "./components/innermost.identity/SignIn";
import { ThemeProvider } from "@material-ui/styles";
import {AppBar, Box, Container, CssBaseline, Grid, Stack} from "@mui/material";
import { HomeAppBar } from "./components/innermost.appbar/HomeAppBar";
import './App.css'//To use Ant Design Dark Css
import LogLifePage from "./pages/innermost.loglife/LogLifePage";
import NotFoundPage from "./pages/NotFoundPage";
import { ConfigProvider, message } from "antd";
import MusicHubPage from "./pages/innermost.musichub/MusicHubPage";
import TagSPage from "./pages/innermost.tag/TagSPage";
import { start } from "./services/signalRServices";
import MeetPage from "./pages/innermost.meet/MeetPage";
import zhCN from 'antd/lib/locale/zh_CN';

function App() {
  useEffect(()=>{
    loadUserFromStorage(store);
  },[]);
  message.config({
    top:70
  })
  return (
    <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <AuthProvider userManager={userManager} store={store}>
        <Grid component="main" sx={{
        }}>
            <Router>
              <Switch>
                <Route exact path='/' component={WelcomePage}/>
                <Route path="/signin-oidc" component={SigninOidc}/>
                <Route path='/auth' component={IdentityPage}/>
                <Route path='/loglife' component={LogLifePage}/>
                <Route path='/musichub' component={MusicHubPage}/>
                <Route path='/meet' component={MeetPage}/>
                <Route path='/tag' component={TagSPage}/>
                <Route component={NotFoundPage}/>
              </Switch>
            </Router>
        </Grid>
      </AuthProvider>
    </Provider>
    </ConfigProvider>
  );
}

export default App;

import {BrowserRouter, Route, Switch, Link, HashRouter} from "react-router-dom";
import LoginPage from "../features/login/LoginPage";
import AdminPage from "../features/admin/adminPage";
import Logout from "../features/logout/Logout";
import HomePage from "../features/home/homePage";
import PrivateRoute from "./PrivateRoute";
import UserPage from "../features/user/userPage";
import AdminCreate from "../features/admin/adminCreate";
import AdminUpdate from "../features/admin/adminUpdate";
import CategoryPage from "../features/category/categoryPage";
import CategoryConfig from "../features/category/categoryConfig";
import CategoryUpdate from "../features/category/categoryUpdate";
import CategoryCreate from "../features/category/categoryCreate";
import ArticlePage from "../features/article/articlePage";
import ArticleViolation from "../features/article/articleViolation";
import XLTheme from "./xLTheme";
import CategoryConfigCreate from "../features/category/categoryConfigCreate";
import ReportMessage from "../features/article/ReportMessage";
import ReportMessageCreate from "../features/article/ReportMessageCreate";
import ReportMessageUpdate from "../features/article/ReportMessageUpdate";
import MessagePage from "../features/message/messagePage";
import MessageCreate from "../features/message/messageCreate";
import MessageUpdate from "../features/message/messageUpdate";
import CarouselPage from "../features/carousel/carouselPage";
import CarouselCreate from "../features/carousel/carouselCreate";
import CarouselUpdate from "../features/carousel/carouselUpdate";
import ArticleCreate from "../features/article/articleCreate";

const Main = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={Logout} />
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute exact path="/admin" component={AdminPage} />
            <PrivateRoute exact path="/users" component={UserPage} />
            <PrivateRoute exact path="/admin/create" component={AdminCreate} />
            <PrivateRoute exact path="/admin/update" component={AdminUpdate} />
            <PrivateRoute exact path="/category" component={CategoryPage} />
            <PrivateRoute exact path="/category/update" component={CategoryUpdate} />
            <PrivateRoute exact path="/category/create" component={CategoryCreate} />
            <PrivateRoute exact path="/category/config" component={CategoryConfig}/>
            <PrivateRoute exact path="/category/config/create" component={CategoryConfigCreate} />
            <PrivateRoute exact path="/article" component={ArticlePage} />
            <PrivateRoute exact path="/article/violation" component={ArticleViolation} />
            <PrivateRoute exact path="/article/create" component={ArticleCreate} />
            <PrivateRoute exact path="/report/message" component={ReportMessage} />
            <PrivateRoute exact path="/report/message/create" component={ReportMessageCreate} />
            <PrivateRoute exact path="/report/message/update" component={ReportMessageUpdate} />
            <PrivateRoute exact path="/system/message" component={MessagePage} />
            <PrivateRoute exact path="/system/message/create" component={MessageCreate}/>
            <PrivateRoute exact path="/system/message/update" component={MessageUpdate}/>
            <PrivateRoute exact path="/carousel/all" component={CarouselPage} />
            <PrivateRoute exact path="/carousel/create" component={CarouselCreate} />
            <PrivateRoute exact path="/carousel/update" component={CarouselUpdate} />

        </Switch>
    </BrowserRouter>
)




export default Main;
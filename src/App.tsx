import React, {Component} from 'react';
import './style/App.css';

import Main from "./components/main";
import ThemeComme from "./components/xLTheme";
class App extends Component{
    constructor(props:any) {
        super(props);
    }

    render(){
        return (
            <div className="App">
                <Main />
            </div>
        );
    }

}

export default App;

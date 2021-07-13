import './App.less';
import { BrowserRouter as Router,Redirect,Route,Switch } from 'react-router-dom'
import Admin from './views/admin/index'
import Login from '../src/views/login'
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/Admin" component={Admin} />
            <Route path="/login" component={Login} />
          <Redirect to="/login" />
        </Switch>
       </Router>
    </div>
  )
}
export default App;

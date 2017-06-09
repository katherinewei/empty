import "./index.html";
import "./index.less";
import dva from "dva";
import { history } from './config'

// 1. Initialize
const app = dva({
    history: history,
});

// 2. Plugins
//app.use({});

// 3. Model
//app.model(require('./models/example'));
app.model(require('./models/user.js'));
const models = require.context('./models', true, /^\.\/.*\.js$/)

models.keys().filter(key => key !== './validator.js' && key !== './user.js')
    .map(key => app.model(models(key)))




// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

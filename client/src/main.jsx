import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Theme from './globalStyles/Theme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Theme>
				<Router>
					<App />
				</Router>
			</Theme>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

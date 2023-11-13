import React, { Component } from 'react';
import Gyeonggi from './gyeonggi.js';

class App extends Component {
	render() {
		return (
		<div>
			<h1>Hello!</h1>
			<Gyeonggi></Gyeonggi>
		</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));

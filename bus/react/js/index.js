import Gyeonggi from './gyeonggi';

class App extends React.Component {
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

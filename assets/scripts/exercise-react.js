function formatName(user) {
	return user.firstName + ' ' + user.lastName;
}

const user = {
	firstName: 'Harper',
	lastName: 'Perez'
};

const element = (
	<h1>
		Hello, {formatName(user)}!
	</h1>
);

function getGreeting(user) {
	if (user) {
		return <h1>Hello, {formatName(user)}!</h1>;
	}
	return <h1>Hello, Stranger.</h1>;
}

/**
 * This two JSXs are valid expression.
 * If a tag is empty, you may close it immediately with />, like XML.
 */
const divElement1 = <div tabIndex="0"></div>;
const divElement2 = <div tabIndex="0" />;

// You may also use curly braces.
const divElement3 = <div name={user.firstName} />;

/**
 * Since JSX is closer to JavaScript than HTML,
 * React DOM uses camelCase property naming convention instead of HTML attribute names.
 *
 * For example, "class" becomes "className" in JSX, and "tabindex" becomes "tabIndex".
 */
const divElement4 = <div className="foo" tabIndex="0">TEST</div>;

/*
var startTime = new Date().getTime();

function tick() {
	ReactDOM.render(
		<Clock elapsed={new Date().getTime() - startTime} />,
		document.getElementById('root-2')
	);
}

setInterval(tick, 100);
*/

/**
 * This function is a valid React component because
 *   it accepts a single "props" object argument with data and returns a React element.
 *
 * We call such components "functional" because they are literally JavaScript functions.
 *
 * Always start component names with a capital letter.
 */
function Welcome(props) {
	return <h1>Hello, {props.name}</h1>;
}

/**
 * You can also use an ES6 class to define a component.
 *
 * Components must return a single root element.
 * This is why we added a <div> to contain all the <Welcome /> elements.
 */
class App extends React.Component {
	render() {
		return (
			<div>
				<Welcome name="Sara" />
				<Welcome name="Cahal" />
				<Welcome name="Edite" />
			</div>
		);
	}
}

const componentElement = <Welcome name="Sara" />;

function Avatar(props) {
	return (
		<img className="Avatar"
			src={props.user.avatarUrl}
			alt={props.user.name}
		/>
	);
}

function UserInfo(props) {
	return (
		<div className="UserInfo">
			<Avatar user={props.user} />
			<div className="UserInfo-name">
				{props.user.name}
			</div>
		</div>
	);
}

function Comment(props) {
	return (
		<div className="Comment">
			<UserInfo user={props.author} />
			<div className="Comment-text">
				{props.text}
			</div>
			<div className="Comment-date">
				{formatDate(props.date)}
			</div>
		</div>
	);
}

/*
ReactDOM.render(
	<App />,
	document.getElementById('root')
);
*/

//----------------------------------------------------------------//

class Clock extends React.Component {
	render() {
		var elapsed = Math.round(this.props.elapsed / 100)
		var seconds = elapsed / 10 + (elapsed % 10 ? "" : ".0")
		var message = seconds + " seconds."

		return (
			<div>{message}</div>
		);
	}
}

var startTime = new Date().getTime();

function tick() {
	ReactDOM.render(
		<Clock elapsed={new Date().getTime() - startTime} />,
		document.getElementById('root-2')
	);
}

var gameTimer;
//var x = setInterval(tick, 50);


import React from 'react'
import '../styles/index.scss'
import Reactimg from '../assets/images/pasted-image-0-2.png'

const App = () => {
	return (
		<>
			<h1>Hello world!</h1>
			<p>from React.js</p>
            <img src= { Reactimg } />
		</>
	)
}

export default App
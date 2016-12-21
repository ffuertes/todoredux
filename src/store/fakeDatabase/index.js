import v4 from 'node-uuid';

const fakeDatabase = {
	todos: [
		{
			id: v4(),
			text: 'Hello World',
			completed: false
		},
		{
			id: v4(),
			text: 'Fake Data 1',
			completed: false
		},
		{
			id: v4(),
			text: 'This doent exists',
			completed: false
		},
		{
			id: v4(),
			text: 'This is fake',
			completed: true
		},
	]
}

const delay = (ms) => 
	new Promise( resolve => setTimeout( resolve, ms ));

export const fetchTodos = (filter) =>
	delay(500).then( () => {
		if ( Math.random() > 0.5 ) {
			throw new Error('Ouch!!')
		}

		switch (filter) {
		    case 'all':
		      return fakeDatabase.todos;
		    case 'completed':
		      return fakeDatabase.todos.filter(t => t.completed);
		    case 'active':
		      return fakeDatabase.todos.filter(t => !t.completed);
		    default:
		      throw new Error(`Unknow filter: ${filter}.`);
		}
	});

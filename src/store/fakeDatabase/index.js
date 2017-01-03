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
		//This is just to simulate errors
		/*if ( Math.random() > 0.5 ) {
			throw new Error('Ouch!!')
		}*/

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

export const addTodo = (text) => 
	delay(500).then( () => {
		const todo = {
			id: v4(),
			text: text,
			completed: false
		};
		fakeDatabase.todos.push(todo);
		return todo;
	});

export const toggleTodo = (id) =>
	delay(500).then(() => {
		const todo = fakeDatabase.todos.find(t => t.id === id);
		todo.completed = !todo.completed;
		return todo;
	})

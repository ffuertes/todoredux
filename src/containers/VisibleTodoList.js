import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../store/actions';
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../store/reducers/';
import TodoList from '../components/TodoList';
import FetchError from '../components/FetchError';

class VisibleTodoList extends Component {
  componentDidMount() {
     this.fetchData() 
  }
  
  componentDidUpdate(prevProps) {
    if ( this.props.filter !== prevProps.filter ) {
     this.fetchData() 
    } 
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    const { toggleTodo, todos, errorMessage, isFetching } = this.props;
    if ( isFetching && !todos.length ) {
      return <div>Loading...</div>;
    }
    if( errorMessage && !todos.length ) {
      return (<FetchError 
          message={ errorMessage } 
          onRetry={ ()=> this.fetchData() } />
        )
    }

    return ( <TodoList todos={todos} onTodoClick={toggleTodo} />)
  }
}

//fetchTodos('all').then( todos => console.log(todos) );

const mapStateToProps = ( state, { params } ) => {
  const filter = params.filter || 'all';
  
  return {
    isFetching: getIsFetching( state, filter ),
    errorMessage: getErrorMessage( state, filter ),
    todos: getVisibleTodos( state, filter ),
    filter,
  }
}

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList
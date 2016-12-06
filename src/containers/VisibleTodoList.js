import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../store/actions';
import { getVisibleTodos } from '../store/reducers';
import TodoList from '../components/TodoList';

class VisibleTodoList extends Component {
  render() {
    const { toggleTodo, ...rest } = this.props;
    return ( <TodoList { ...rest } onTodoClick={toggleTodo} />)
  }
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
    return fetchTodos(filter);
  }
}

//fetchTodos('all').then( todos => console.log(todos) );

const mapStateToProps = ( state, { params } ) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos( state, filter ),
    filter,
  }
}

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList));

export default VisibleTodoList
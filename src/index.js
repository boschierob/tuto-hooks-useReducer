
import React, {Fragment,useReducer, useRef } from 'react';
import ReactDOM from 'react-dom';

function ShoppingList(){
  const [items,dispatch] = useReducer((state,action)=> {
  switch (action.type){
    case 'add' :
      return[
        ...state,
        {
          id:state.length,
          name:action.name}
      ];
    case 'clear':
      return []
    case 'remove':
      return state.filter((x,index)=> index != action.index)
    default:
      return state;
    }
  } ,[]);
  const inputRef = useRef();

  function handleSubmit(e){
    e.preventDefault();
    dispatch({
      type:'add',
      name:inputRef.current.value
    });
    inputRef.current.value='';
  }

  return (
    <>
    <form onSubmit={handleSubmit} > 
    <input ref={inputRef}/>
    </form>
    <button onClick={
      ()=>dispatch({type:'clear'})
    }>
      Clear
    </button>
    <ul>
      {items.map((item, index)=>(
        <li key={item.id}>
          {item.name}
          <button onClick={
            ()=>dispatch({type:'remove', index})
          }>
            X
          </button>
        </li>
      ))}
    </ul> 
    </>
  );
}

ReactDOM.render(<ShoppingList/>,document.querySelector('#root'))
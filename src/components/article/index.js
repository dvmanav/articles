import React from 'react';

class Article extends React.Component{
  constructor(props){
    super(props);
    this.state={
      id: props.id,
      title: props.title,
      body: props.body,
      person_id: props.person_id,
      created_at: props.created_at,
      updated_at: props.updated_at
    };
  }

  render(){
    const {id, title, body, person_id, created_at, updated_at } = this.state;
    return(
      <div style={{ 'borderStyle': 'dotted', 'borderWidth': '2px'}}>
        <h1>{title}</h1>
        <h2><i>( Author ID: {person_id} )</i></h2>
        <p>{body}</p>
        ----------------------
        <p><i>Article ID: {id}</i></p>
        <p><i>Created: {created_at}</i></p>
        <p><i>Updated: {updated_at}</i></p>
      </div>
    );
  }
}
export default Article;

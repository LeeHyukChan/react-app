import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Header(props)
{

  return <header><h1>
    <a href="/react">{props.title}</a></h1>{props.body}</header>
}
function Nav(props)
{
  const topic=[];
  const title=null;
  const body=null;

  for(let i = 0 ; i<props.topic.length; i++)
  {      
    topic.push(<li key ={props.topic[i].id}><a onClick={function (event){
      event.preventDefault();
      props.onChangeMode(Number(props.topic[i].id));
    }} id = {props.topic[i].id} href={"/read/"+props.topic[i].id}>{props.topic[i].title}</a></li>)
  }
  return <nav>
    <ol>
    {topic}
    </ol>
  </nav>
}

function Article(props)
{

  return <article><h2>{props.title}</h2>
  {props.body}</article>

}
function Create(props){
  return <div>
    <h2>CREAT</h2>
    make Your text
    <form onSubmit={function (event){
      event.preventDefault();
      const title=event.target.title.value;
      const body =event.target.body.value;
      props.onCreate(title,body);

    }}>
      <p><input type="text" name="title" placeholder='title'></input></p>
      <p><textarea type="text" name="body" placeholder='body'></textarea></p>
      <p><input type="submit" value= "create"></input></p>
    </form>
  </div>
}
function Update(props){
  const [title,setTitle]=useState(props.title)
  const [body,setBody]=useState(props.body)
  return <div>
    <h2>Update</h2>
    make Your text
    <form onSubmit={function (event){
      event.preventDefault();
      const title=event.target.title.value;
      const body =event.target.body.value;
      props.onUpdate(title,body);

    }}>
      <p><input type="text" name="title" placeholder='title' value={title} onChange={event=>
    {
      setTitle(event.target.value);
    }}></input></p>
      <p><textarea type="text" name="body" placeholder='body' value={body} onChange={event=>
    {
      setBody(event.target.value);
    }}></textarea></p>
      <p><input type="submit" value= "update"></input></p>
    </form>
  </div>
}

function App() {
  const [topic,setTopic]=useState([
  {title:"HTML", id:1, body:"html is"},
  {title:"CSS", id:2, body:"CSS is"  },
  {title:"JAVASCRIPT", id:3, body:"JAVASCRIPT is"}]);

  const [mode,setMode]=useState("welcome")
  const [id,setId]=useState(null)
  const [nextId,setNextid]=useState(4)

  let content;
  let contextControl=null;
  let title=null;
  let body=null
  
  if(mode==="welcome")
  {
    content=<Article title="welcome" body="nice to meey you"></Article>
  }
  else if(mode==="read")
  {
    for(let i=0;i<topic.length;i++)
    {
      if(id === topic[i].id)
      {
        content=<Article title={topic[i].title} body={topic[i].body}></Article>
      }
    }
    contextControl=<article><a href="/update/" onClick={function(event){  
      event.preventDefault();
      setMode("update");

    }}>Update</a></article>


  }
  else if(mode==="create")
  {
    content=<Create onCreate={function(title,body)
    {
      const newtopic={id:nextId, title:title, body:body};
      const newtopics=[...topic]
      newtopics.push(newtopic)
      setTopic(newtopics)
      setMode("read")
      setId(nextId);
      setNextid(nextId+1);
    }}></Create>
  }
  else if(mode==="update")
  {
    for(let i = 0; i<topic.length;i++)
    {
    if(topic[i].id===id)
    {
      title=topic[i].title
      body=topic[i].body
    }
    }
    content=<Update title={title} body={body} onUpdate={function(title,body)
    {
     
      const newtopic={id:id, title:title, body:body};
      const newtopics=[...topic]
      for(let i = 0; i<newtopics.length;i++)
      if(id===topic[i].id)
      {
        newtopics[i]=newtopic
        break
      }
      setTopic(newtopics)
      setMode("read")
    }}></Update>
  }


  return <div><Header title="REACT" body="welcome"></Header>
  <Nav topic={topic} onChangeMode={function(id)
  {
    setMode("read");
    setId(id);
  }

  }></Nav>
  {content}
  <a href="/create/" onClick={function(event){
    event.preventDefault();
    setMode("create");
  }}>Create</a>
  {contextControl}
  </div>


}
export default App;

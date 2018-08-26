import React, {Component} from 'react';



///jsx se traduce mediante babel
class App extends Component{
  constructor(){
      super(); // hereda todo
      this.state={
          title: '',
          descripcion: '',
          tasks:[],
          _id: ''
      };
      this.handleChange= this.handleChange.bind(this);
      this.addTask= this.addTask.bind(this);
  }
   addTask(e){
      if(this.state._id){
      fetch('/api/tasks/' + this.state._id,{
          method: 'PUT',
          body: JSON.stringify(this.state),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
       })
       .then(res=> res.json())
       .then(data=> {
        console.log(data)
        M.toast({html: 'Tarea Modificada'});
        this.setState({title:'', descripcion:'', _id:''});
        this.fecthtask();
       })
      }else{
      // console.log(this.state);
      fetch('/api/tasks',{
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then (res => res.json())
    .then(data=> {
      console.log(data)
      M.toast({html: 'Tarea Guardad'});
      this.setState({title:'', descripcion:''});
      this.fecthtask();
    })
    .catch(err => console.error(err));
      }

      e.preventDefault(); // evita que se refreseque el navegador luego del submit
   }

   componentDidMount(){
       console.log('el componente fue montado');
       this.fecthtask();
   }

fecthtask(e){  // trae las tareas de la base
    fetch('/api/tasks')
    .then(res => res.json())
    .then(data => {
        this.setState({tasks: data})
        console.log(this.state.tasks);
    });
}

deleteTask(id){
if ( confirm('Estas seguro de querer elimnar')){
fetch('/api/tasks/' + id, {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    })
    .then( res => res.json())
    .then(data=> {
       // console.log(data)
        M.toast({html: 'Tarea Borrada'});
        this.fecthtask();
      })
   
    }    
}
editTask(id){
    fetch('/api/tasks/' + id)
    .then( res => res.json())
    .then(data =>{
        console.log(data)
        this.setState({
            title: data.title,
            descripcion: data.descripcion,
            _id: data._id
        })
    }) 
}
   handleChange(e){ // esta se llama por el evento onChange de los input o textarea
      console.log(e.target.name);
      const {name, value} = e.target; // con esta linea, ya se indica que solo queremos quedarnos con name y value, e.target contiene todo el objeto( input o textarea)
      this.setState({ //esta funcion sirve para setear el valor, automaticamente setea el valor de la proiedad, segun nombre/valor
          [name]:value
      });
   }

    render(){
        return (
            <div>
              <nav className='light-blue darken-4'>
              <div className='container'> 
                  <a className='brand-logo' href="/">MERN</a>
              </div>
              </nav>
              <div className="container">
              <div className="row">
              <div className="col s5">
                 <div className="card">
                 <div className="card/content">
                    <form onSubmit={this.addTask}>
                    <div className="row">
                       <div className="input-field col s12">
                       <input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Titulo de la Tarea"/>     
                       </div>
                    </div>
                    <div className="row">
                       <div className="input-field col s12">
                       <textarea name="descripcion" value={this.state.descripcion} onChange={this.handleChange} placeholder="descripcion de la tarea" className="materialize-textarea"></textarea>  
                       </div>
                    </div>
                    <button type="submit" className="btn light-blue darken-4"> 
                    Enviar
                    </button>
                    </form>
                  </div>
                    
                 </div>
              </div>
              <div className="col s7">
              <table> 
                  <thead>
                      <tr>
                   <th > TItulo </th>
                   <th > Descripcion </th>
                   </tr>
                   </thead>
                   <tbody>
                       {
                           this.state.tasks.map(task=> {
                            return(
                            <tr key={task._id}>
                            <td> {task.title}</td>
                            <td> {task.descripcion} </td>
                            <td>
                                <button className="btn light-blue darken-4 " onClick={() => this.deleteTask(task._id)}> 
                                    <i className="material-icons"> delete</i> 
                                </button>
                                <button className="btn light-blue darken-4 " onClick={() => this.editTask(task._id)} style={{margin: '5px'}}> 
                                <i className="material-icons"> edit</i> 
                                    </button>
                                 </td>
                            </tr>
                           )
                           })
                       }
                  </tbody>

              </table>

            </div>
             </div>
                    
              </div> 
            </div>
        )
    }
}

export default App;

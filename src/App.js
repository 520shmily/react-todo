import React, { Component } from 'react';
import './App.css';
import './reset.css'

 // 封装点击添加project按钮组件内容
 function Button(props) {
  return (
    <button className="btn-add" onClick={props.onClick}>+</button>
  );
}

// 封装创建project组件
    class CreatePro extends Component {
      constructor(props) {
        super(props);
        this.state = {
          title: '',
          content: '',
        };

        this.handleAddTitle = this.handleAddTitle.bind(this);
        this.handleAddContent = this.handleAddContent.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
      }

      // 添加新title
      handleAddTitle(event) {
        this.setState({
          title: event.target.value,
        });
      }

      // 添加新project
      handleAddContent(event) {
        this.setState({
          content: event.target.value,
        });
      }

      // 返回存有新创建的project内容的对象
      handleAdd = () => {
        let object = {title: this.state.title, content: this.state.content}
        this.props.onAddNewproject(object);
      }
       
      render() {
        return (
          <div className="msg">
            <p className="create-title">title</p>
            <input type="text"  onChange={this.handleAddTitle} />
            <p className="create-pro">Project</p>
            <input type="text" onChange={this.handleAddContent} />
            <div className="tool" onClick={() => this.props.onClick()}>
              <button 
                className="btn-up btn-tool" 
                onClick={this.handleAdd}
              >
                创建
              </button>
              <button className="btn-off btn-tool">关闭</button>
            </div>
          </div>
        );
      }
    }

 // 封装Button组件和创建project组件内容的组件
 class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state =　{
      isAdding: false,
    };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOffClick = this.handleOffClick.bind(this);

  }

  // 显示创建新project 
  handleOnClick() {
    this.setState({
      isAdding: true,
    });
  }

  // 隐藏创建新project 
  handleOffClick() {
    this.setState({
      isAdding: false,
    })
  }  

  render() {
    const list = this.props.todoList;
    console.log(list);
    return (
      <div className="add">
      {
        this.state.isAdding ? 
        <div >    
          <CreatePro 
            onClick={() => this.handleOffClick()} 
            onAddNewproject={this.props.onAddNewproject}
          />
        </div> :
        <div >
          <Button onClick={() => this.handleOnClick()}/>  
        </div>
      }
        <p className="status">已完成的项目数：{list.filter(item => item.isFinished).length}</p>
        <p className="status">未完成的项目数：{list.filter(item => !item.isFinished).length}</p>
      </div>
    );
  }
}


//封装是否完成project按钮切换的组件内容
class IsFinishpro extends Component {
  render() {
    return (
      <div >
        {
          this.props.isFinished ?
          <div className="finish" id="change">已完成</div> :
          <div className="finish" onClick={() => this.props.isFinishClick(this.props.index)}>点击完成</div>
        }
      </div>
    );
  }
}


//封装修改project组件内容
class RevisePro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      content: this.props.pro,
    };

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  // 处理修改title事件
  handleChangeTitle(event) {
    this.setState({
      title: event.target.value,
    });
  }

  // 处理修改project事件
  handleChangeContent(event) {
    this.setState({
      content: event.target.value,
    });
  }

  handleCloseClick = () => {
    let object = {title: this.state.title, content: this.state.content};
    let index = this.props.index;
    this.props.onClose(index, object);
  }

  render() {
    return (
      <div className="msg my-msg">
        <p className="create-title">title</p>
        <input type="text" value={this.state.title}  onChange={this.handleChangeTitle}/>
        <p className="create-pro">Project</p>
        <input type="text" value={this.state.content} onChange={this.handleChangeContent}/>
        <div className="tool my-tool"  >
          <button className="btn-close btn-tool" onClick={this.handleCloseClick}>Close X</button>
        </div>
        <IsFinishpro 
         isFinished={this.props.isFinished}
         isFinishClick={() => this.props.isFinishClick(this.props.index)}  
       />
      </div>
    );
  }
}


// 封装project组件内容
class ShowProject extends Component {
  
  render() {
    let Element = (
      <div className="addpro">
        <p className="title">{this.props.title}</p>
        <p className="content">{this.props.pro}</p>
        <div className="btn-group">
          <button className="del" onClick={() => this.props.handleDel(this.props.index)}></button>
          <button className="revise" onClick={() => this.props.onRevise(this.props.index)}></button>
        </div>
        <IsFinishpro 
          isFinished={this.props.isFinished}
          isFinishClick={() => this.props.isFinishClick(this.props.index)}
        />
      </div>
    );
    if(this.props.isRevise) {
      Element = (
        <div>
          <RevisePro  
            title={this.props.title} 
            pro={this.props.pro}
            isFinished={this.props.isFinished}
            isFinishClick={() => this.props.isFinishClick(this.props.index)}
            onClose={this.props.onClose}
            index={this.props.index}
            onChangeproject={this.props.onChangeproject}
          />
       </div>
      );
    }

    return Element;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [
        {
          key: 0,
          isFinished: false,
          isRevise: false,
          title: 'Todo A',
          content: 'project A',
        },
        {
          key: 1,
          isFinished: false,
          isRevise: false,
          title: 'Todo B',
          content: 'project B',
        },
        {
          key: 2,
          isFinished: false,
          isRevise: false,
          title: 'Todo C',
          content: 'project C',
        },
      ],
      finish: 0,
      unfinish: 3,
    };

    this.handleIsFinish = this.handleIsFinish.bind(this);
    this.handleDelClick = this.handleDelClick.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReviseClick = this.handleReviseClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  // 处理是否点击完成事件并修改对于完成数
  handleIsFinish(index) {
    let todoList = this.state.todoList;
    let unfinish = this.state.unfinish;
    let finish = this.state.finish;
    unfinish = unfinish - 1;
    finish = finish + 1;
    todoList.forEach((item) => {
      if(index === item.key) {
        item.isFinished = true;
      }
    });


    this.setState({
      todoList: todoList,
      unfinish: unfinish,
      finish: finish,
    });

  }

  //处理删除事件
  handleDelClick(index) {
    let todoList = this.state.todoList;
    let unfinish = this.state.unfinish;
    let finish = this.state.finish;
  
    todoList.forEach((item, i) => {
      if(index === item.key) {
        todoList.splice(i, 1);
        if (item.isFinished) {
          finish = finish - 1;
        } else {
          unfinish = unfinish - 1;
        }
      }
    });

    this.setState({
      todoList: todoList,
      unfinish: unfinish,
      finish: finish,
    });
  }

  // 处理修改事件
  handleReviseClick(index) {
    let todoList = this.state.todoList;
  
    todoList.forEach((item) => {
      if(index === item.key) {
        item.isRevise = true;
      }
    });

    this.setState({
      todoList: todoList,
    });
  }

  // 处理关闭按钮事件
  handleCloseClick = (index, object) => {
    let todoList = this.state.todoList;
  
    todoList.forEach((item) => {
      if(index === item.key) {
        item.title = object.title;
        item.content = object.content;
        item.isRevise = false;
      }
    });

    this.setState({
      todoList: todoList,
    });
  }

  // 处理添加新project事件
  handleAdd = (object) => {
    let todoList = this.state.todoList;
    const keyArray = todoList.map(item => item.key);
    let newobj = {key: Math.max.apply(null, keyArray) + 1, isFinished: false, isRevise: false, title: object.title, content: object.content};
    let unfinish = this.state.unfinish;
    unfinish = unfinish + 1;
    todoList.push(newobj);
    this.setState({
      todoList: todoList,
      unfinish: unfinish,
    });
  }

  // 处理修改project事件
  handleChange = (object) => {

  }

  render() {
    let listItem = [];
    this.state.todoList.forEach((item) => {
      listItem.push(
        <ShowProject 
          key={item.key}
          title={item.title} 
          pro={item.content} 
          index={item.key}
          isFinished={item.isFinished}
          isFinishClick={() => this.handleIsFinish(item.key)}
          handleDel={() => this.handleDelClick(item.key)}
          isRevise={item.isRevise}
          onChangeproject={this.handleChange}
          onClose={this.handleCloseClick}
          onRevise={() => this.handleReviseClick(item.key)}
        />
      );
      return listItem;
    });
    return (
      <div className="App">
        <AddProject 
          {...this.state}
          // finish={this.state.finish} 
          // unfinish={this.state.unfinish}
          onAddNewproject={this.handleAdd}
        />
        {listItem}
      </div>
    );
  }
}

export default App;

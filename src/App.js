import React, { Component } from 'react';

class ExtMounts extends Component {

  constructor(props){
    super(props);
    this.getExtMounts = this.getExtMounts.bind(this);
    this.onChange = this.onChange.bind(this);
    this.searchExtMounts = this.searchExtMounts.bind(this);
    this.state={
        isLoaded:false,
        mounts:[],
        itemName:"",
        searched:false,
        searchResults:[]
    }
  }

  componentDidMount(){
    this.getExtMounts();
  }

  getExtMounts(){
    fetch("https://eu.api.battle.net/wow/character/shadowsong/Exterminans?fields=mounts&locale=pl_PL&apikey=h9mdedydp4z5jnhhnz7myttrazr455vc")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            mounts: result.mounts.collected
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  searchExtMounts(itemName){
    this.setState({
        searchResults: this.state.mounts.filter(mount => mount.name.includes(itemName)),
        searched: true
    })
  }

  onChange(event){
    let itemName = event.target.value;
    this.searchExtMounts(itemName)
    console.log(itemName);
  }



  render() {
    return (
      <div className="ExtMounts">
        <form>
            <label>
            Mount:
            <input type="text" name="mount" onChange={this.onChange}/>
            </label>
        </form>
        <div>
            {this.state.searchResults.length > 0 ?
             (<MountList mounts={this.state.searchResults}/>)
             :
             this.state.searched && (<NoMount/>)
            }
        </div>
      </div>
    );
  }
}

const MountList = (props) => {
    return(
        <div>
            <h1>Niestety, Ext ma pasujące mounty:</h1>
            <ul>
                {props.mounts.map((mount,i) => {
                    return (<MountEntry mount={mount}/>)
                })}
            </ul>
        </div>
    )
}

const MountEntry = (props) => {
    return(
        <li>
            <a href={"https://www.wowhead.com/item="+props.mount.itemId}>{props.mount.name}</a>
        </li>
    )
}

const NoMount = () => {
    return(
        <div>
            <h1>Brawo, Ext nie ma takiego mounta</h1>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/uKaKd5ZiIuk?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
    )
}

export default ExtMounts;

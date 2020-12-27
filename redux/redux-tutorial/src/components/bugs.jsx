import React, { Component } from "react";
import StoreContext from "../contexts/storeContext";
import { loadBugs } from "../store/bugs";
class Bugs extends Component {
  state = {
    bugs: [],
  };
  componentDidMount() {
    console.log(this.context);
    const store = this.context;
    this.unsubscribe = store.subscribe(() => {
      const bugsInStore = store.getState().entities.bugs.list;
      if (this.state.bugs !== bugsInStore) this.setState({ bugs: bugsInStore });
    });
    store.dispatch(loadBugs());
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
      <div>
        <h2>Bugs</h2>
        <ul>
          {this.state.bugs.map((bug) => (
            <li>{bug.description}</li>
          ))}
        </ul>
      </div>
    );
  }
}
Bugs.contextType = StoreContext;
export default Bugs;

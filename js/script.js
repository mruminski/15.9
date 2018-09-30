class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      users: []
    };
  }

  onChnageHandle(event) {
    this.setState({searchText: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    const {searchText} = this.state;
    const url = `https://api.github.com/search/users?q=${searchText}`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => this.setState({users: responseJson.items}));
  }

  render() {
    return (
      <div>
        <form className='form' onSubmit={event => this.onSubmit(event)}>
          <label className='form__label' htmlFor='searchText'>Search by user name</label>
          <input
            className='form__input'
            type='text'
            id='searchText'
            onChange={event => this.onChnageHandle(event)}
            value={this.state.searchText}/>
        </form>
        <UsersList users={this.state.users}/>
      </div>
    )
  }
}

class UsersList extends React.Component {
  get users() {
    return this.props.users.map(user => <User key={user.id} user={user}/>);
  }

  render() {
    return (
      <div>
        {this.users}
      </div>
    );
  }
}

class User extends React.Component {
  render() {
    return (
      <div className='user'>
        <img className='user__avatar' src={this.props.user.avatar_url}/>
        <p><a className='user__link' href={this.props.user.html_url} target='_blank'>{this.props.user.login}</a></p>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
// PageContainer has 3 children
// SearchBox gets user requests, pipes them back to PageContainer
// Sidebar displays info for current user
// Timeline displays most recent commits for user

// Data flow:
// 

var SearchBox = React.createClass({
    getInitialState: function() {
        return { 
            error: false,
            user: {
                avatar_url: "https://avatars.githubusercontent.com/u/8053315?v=3",
                html_url: "https://github.com/rgscherf",
                login: "rgscherf",
                name: "Rob Scherf",
                public_repos: 14
            } 
        };
    },
    keyDown: function(e) {
        if (e.key === 'Enter') {
            var s = e.target.value;
            this.loadCommentsFromServer(s);
        }
    },
    loadCommentsFromServer: function(query) {
        // var u = 'http://localhost:5000/index.php/twit/' + query;
        var u = 'https://phptwit.herokuapp.com/index.php/twit/' + query;
        console.log(u);
        $.ajax( u, {
            type: 'POST',
            dataType: 'json',
            cache: false,
            success: function(data) {
                console.log(data);
                this.setState({user: data, error: false});
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({error: true});
            }.bind(this)
        });
    },
    render: function() {
        var err = this.state.error ? "Could not find that github user!" : "";
        return (
            <div>
                <div className="searchBox shadow">
                    <div className="titleBox">
                        <div id="logo">
                            Twit
                        </div>
                        <div id="definition">
                            <i>V.  to taunt or ridicule <br/>with reference to anything embarrassing</i>
                        </div>
                    </div>
                    <div className="searchContainer">
                        <input type="text" 
                               placeholder="Find a github user to twit" 
                               className="mainSearch" 
                               onKeyDown={this.keyDown}/>
                        <div className="searchError">
                            {err}
                        </div>
                    </div>
                </div>
                <ContentContainer user={this.state.user}/>
            </div>
        );
    }

});

var ContentContainer = React.createClass({
    render: function() {
        return (
            <div className="contentContainer">
                <Sidebar user={this.props.user}/>
                <Timeline />
            </div>
        );
    }
});

var Sidebar = React.createClass({
    render: function() {
        return (
            <div className="sideBar shadow">
                <img src={this.props.user.avatar_url}></img>
                <div>
                    <span id="userName">{this.props.user.name}</span>
                </div>
                <div>
                    <span id="userUrl">
                        <a href={this.props.user.html_url}>{this.props.user.login}</a> - {this.props.user.public_repos} public repos
                    </span>
                </div>
            </div>
        );
    }
});

var Timeline = React.createClass({
    render: function() {
        return (
            <div className="timeline">
                <p>This is your pilot speaking, from the timeline view...</p>
            </div>
        );
    }
});

ReactDOM.render(
    <SearchBox />, 
    document.getElementById("app")
);
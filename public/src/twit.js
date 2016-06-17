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
              "avatar_url": "https://avatars.githubusercontent.com/u/8053315?v=3",
              "html_url": "https://github.com/rgscherf",
              "login": "rgscherf",
              "name": "Rob Scherf",
              "public_repos": 14,
              "commits": {
                "0": {
                  "created_at": "2016-06-17T01:11:48Z",
                  "repo_name": "rgscherf/twit",
                  "repo_url": "https://api.github.com/repos/rgscherf/twit",
                  "commit_message": "error pane for bad search",
                  "commit_url": "https://api.github.com/repos/rgscherf/twit/commits/587881af3f175267b39bbe9066156a3a535600f3"
                },
                "1": {
                  "created_at": "2016-06-17T00:41:59Z",
                  "repo_name": "rgscherf/twit",
                  "repo_url": "https://api.github.com/repos/rgscherf/twit",
                  "commit_message": "sidebar link coloring",
                  "commit_url": "https://api.github.com/repos/rgscherf/twit/commits/e3a41aa294088e7b26341aa53f3a6d0e780063c8"
                },
                "2": {
                  "created_at": "2016-06-17T00:31:21Z",
                  "repo_name": "rgscherf/twit",
                  "repo_url": "https://api.github.com/repos/rgscherf/twit",
                  "commit_message": "correct ajax target for user req",
                  "commit_url": "https://api.github.com/repos/rgscherf/twit/commits/acf6d7ed2d07cc4cace5ed0cc8947c99acd3cc66"
                },
                "3": {
                  "created_at": "2016-06-17T00:26:33Z",
                  "repo_name": "rgscherf/twit",
                  "repo_url": "https://api.github.com/repos/rgscherf/twit",
                  "commit_message": "layout for sidebar",
                  "commit_url": "https://api.github.com/repos/rgscherf/twit/commits/d91ffe7588073d2215e75f3c3bc036dbf936d0bd"
                },
                "4": {
                  "created_at": "2016-06-16T17:02:07Z",
                  "repo_name": "rgscherf/twit",
                  "repo_url": "https://api.github.com/repos/rgscherf/twit",
                  "commit_message": "ajax'in",
                  "commit_url": "https://api.github.com/repos/rgscherf/twit/commits/67efa4fd55f9c2beddf4029ac104c08b55b49ea1"
                },
                "5": {
                  "created_at": "2016-06-16T02:37:53Z",
                  "repo_name": "rgscherf/twit",
                  "repo_url": "https://api.github.com/repos/rgscherf/twit",
                  "commit_message": "ui mocks",
                  "commit_url": "https://api.github.com/repos/rgscherf/twit/commits/1c7413011c6f27f6cb9adc3c8153f6fbfd159809"
                },
                "7": {
                  "created_at": "2016-06-15T16:57:12Z",
                  "repo_name": "rgscherf/twit",
                  "repo_url": "https://api.github.com/repos/rgscherf/twit",
                  "commit_message": "static assets paths",
                  "commit_url": "https://api.github.com/repos/rgscherf/twit/commits/606dd6dc3ddf65920d2d7200e7caaf62f6831db3"
                },
                "8": {
                  "created_at": "2016-06-14T17:02:12Z",
                  "repo_name": "rgscherf/twit",
                  "repo_url": "https://api.github.com/repos/rgscherf/twit",
                  "commit_message": "config links",
                  "commit_url": "https://api.github.com/repos/rgscherf/twit/commits/0203e0aa9efa57e9c77a05ffb4f89f00ddec1bac"
                },
                "9": {
                  "created_at": "2016-06-14T16:54:47Z",
                  "repo_name": "rgscherf/twit",
                  "repo_url": "https://api.github.com/repos/rgscherf/twit",
                  "commit_message": "readme",
                  "commit_url": "https://api.github.com/repos/rgscherf/twit/commits/c92aa2ce148934a599984f121f38733d5249411b"
                },
                "10": {
                  "created_at": "2016-06-14T16:39:13Z",
                  "repo_name": "rgscherf/twit",
                  "repo_url": "https://api.github.com/repos/rgscherf/twit",
                  "commit_message": "static assets in place",
                  "commit_url": "https://api.github.com/repos/rgscherf/twit/commits/11a39481866e2dc5ee984bcab2f020cfb4de8a2c"
                },
                "11": {
                  "created_at": "2016-06-14T16:13:18Z",
                  "repo_name": "rgscherf/twit",
                  "repo_url": "https://api.github.com/repos/rgscherf/twit",
                  "commit_message": "initial commit",
                  "commit_url": "https://api.github.com/repos/rgscherf/twit/commits/03ef2ed49215eee96afbebd8b0b7bfda7995f820"
                },
                "17": {
                  "created_at": "2016-06-05T19:59:46Z",
                  "repo_name": "rgscherf/i-am-a-horse-in-the-land-of-booleans",
                  "repo_url": "https://api.github.com/repos/rgscherf/i-am-a-horse-in-the-land-of-booleans",
                  "commit_message": "final",
                  "commit_url": "https://api.github.com/repos/rgscherf/i-am-a-horse-in-the-land-of-booleans/commits/0c70a78b24a9351541991eaceff1fa9ce01972c1"
                },
                "22": {
                  "created_at": "2016-06-05T19:29:35Z",
                  "repo_name": "rgscherf/training-day",
                  "repo_url": "https://api.github.com/repos/rgscherf/training-day",
                  "commit_message": "done",
                  "commit_url": "https://api.github.com/repos/rgscherf/training-day/commits/b9f5e67530ec25178427c2e58f088165db8e2e60"
                },
                "25": {
                  "created_at": "2016-05-29T20:15:21Z",
                  "repo_name": "rgscherf/spiritlord",
                  "repo_url": "https://api.github.com/repos/rgscherf/spiritlord",
                  "commit_message": "rat attack",
                  "commit_url": "https://api.github.com/repos/rgscherf/spiritlord/commits/5d2eb0391ec6fa27a4d177805f74d272dc781698"
                },
                "26": {
                  "created_at": "2016-05-28T18:33:16Z",
                  "repo_name": "rgscherf/spiritlord",
                  "repo_url": "https://api.github.com/repos/rgscherf/spiritlord",
                  "commit_message": "figuring out mermaid secondary",
                  "commit_url": "https://api.github.com/repos/rgscherf/spiritlord/commits/9b82c03418855e174818bca8ce01e66b7e2482e5"
                },
                "29": {
                  "created_at": "2016-05-28T03:33:40Z",
                  "repo_name": "rgscherf/gainful2",
                  "repo_url": "https://api.github.com/repos/rgscherf/gainful2",
                  "commit_message": "compile new wording",
                  "commit_url": "https://api.github.com/repos/rgscherf/gainful2/commits/0c1c0b57f8aa7e609053e2caa4b9de82cde9e7e5"
                }
              }
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
                console.log(xhr);
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
                               placeholder="Find github user to twit" 
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
                <Timeline commits={this.props.user.commits}/>
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
        var a = $.map(this.props.commits, function(e) {return e;});
        console.log(a);
        var c = $.map(a, function(elem) {
            return(
                <div className="twitCard shadow">
                    <div className="twitCardHeadline">
                        Commit to <a href={elem.repo_url}>{elem.repo_name}</a> at <a href={elem.commit_url}>{elem.created_at}</a>
                    </div>
                    <div className="twitCardBody">
                        {elem.commit_message}
                    </div>
                </div>
            );
        });
        console.log(c);
        return (
            <div className="timeline">
                {c}
            </div>
        );
    }
});

ReactDOM.render(
    <SearchBox />, 
    document.getElementById("app")
);
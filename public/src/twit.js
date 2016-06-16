// PageContainer has 3 children
// SearchBox gets user requests, pipes them back to PageContainer
// Sidebar displays info for current user
// Timeline displays most recent commits for user

// Data flow:
// 

var SearchBox = React.createClass({
    getInitialState: function() {
        return {search: ""};
    },
    keyDown: function(e) {
        if (e.key === 'Enter') {
            var s = e.target.value;
            this.setState({search: s});
        }
    },
    render: function() {
        return (
            <div>
                <div className="searchBox">
                    <div className="logo">Twit</div>
                    <input type="text" 
                           placeholder="Find a github user name" 
                           className="mainSearch" 
                           onKeyDown={this.keyDown}/>
                </div>
                <ContentContainer />
            </div>
        );
    }

});

var ContentContainer = React.createClass({
    render: function() {
        return (
            <div className="contentContainer">
                <Sidebar />
                <Timeline />
            </div>
        );
    }
});

var Sidebar = React.createClass({
    render: function() {
        return (
            <div className="sideBar">
                <p>Hello, I am here in the Sidebar this evening.</p>
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
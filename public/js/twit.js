// PageContainer has 3 children
// SearchBox gets user requests, pipes them back to PageContainer
// Sidebar displays info for current user
// Timeline displays most recent commits for user

// Data flow:
//

var SearchBox = React.createClass({
    displayName: 'SearchBox',

    getInitialState: function () {
        return { searchQuery: "" };
    },
    keyDown: function (e) {
        if (e.key === 'Enter') {
            var s = e.target.value;
            this.setState({ searchQuery: s });
            this.loadCommentsFromServer(s);
        }
    },
    loadCommentsFromServer: function (query) {
        var u = 'http://localhost:5000/index.php/twit/' + query;
        console.log(u);
        $.ajax(u, {
            type: 'POST',
            dataType: 'json',
            cache: false,
            success: function (data) {
                console.log("success!");
                console.log(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.log("fail");
                console.error(xhr, status);
            }.bind(this)
        });
    },
    render: function () {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'searchBox' },
                React.createElement(
                    'div',
                    { className: 'logo' },
                    'Twit'
                ),
                React.createElement('input', { type: 'text',
                    placeholder: 'Find a github user name',
                    className: 'mainSearch',
                    onKeyDown: this.keyDown })
            ),
            React.createElement(ContentContainer, null)
        );
    }

});

var ContentContainer = React.createClass({
    displayName: 'ContentContainer',

    render: function () {
        return React.createElement(
            'div',
            { className: 'contentContainer' },
            React.createElement(Sidebar, null),
            React.createElement(Timeline, null)
        );
    }
});

var Sidebar = React.createClass({
    displayName: 'Sidebar',

    render: function () {
        return React.createElement(
            'div',
            { className: 'sideBar' },
            React.createElement(
                'p',
                null,
                'Hello, I am here in the Sidebar this evening.'
            )
        );
    }

});

var Timeline = React.createClass({
    displayName: 'Timeline',

    render: function () {
        return React.createElement(
            'div',
            { className: 'timeline' },
            React.createElement(
                'p',
                null,
                'This is your pilot speaking, from the timeline view...'
            )
        );
    }
});

ReactDOM.render(React.createElement(SearchBox, null), document.getElementById("app"));
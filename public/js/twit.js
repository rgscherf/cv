var SearchBox = React.createClass({
    displayName: "SearchBox",

    render: function () {
        return React.createElement(
            "div",
            { className: "searchBox" },
            React.createElement("input", { type: "text", placeholder: "Search here!", className: "mainSearch" })
        );
    }

});

ReactDOM.render(React.createElement(SearchBox, null), document.getElementById("app"));
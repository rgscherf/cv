var SearchBox = React.createClass({
    render: function() {
        return (
            <div className="searchBox">
                <input type="text" placeholder="Search here!" className="mainSearch" />
            </div>
        );
    }

});

ReactDOM.render(
    <SearchBox />, 
    document.getElementById("app")
);
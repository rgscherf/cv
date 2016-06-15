var CommentBox = React.createClass({
    displayName: 'CommentBox',

    getInitialState: function () {
        return { data: [] };
    },
    loadCommentsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    handleCommentSubmit: function (comment) {
        var comments = this.state.data;
        comment.id = Date.now();
        var newComments = comments.concat([comment]);
        this.setState({ data: newComments });
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({ data: comments });
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return React.createElement(
            'div',
            { className: 'commentBox' },
            React.createElement(
                'h1',
                null,
                'Comments:'
            ),
            React.createElement(CommentList, { data: this.state.data }),
            React.createElement(CommentForm, { onCommentSubmit: this.handleCommentSubmit })
        );
    }
});

var CommentList = React.createClass({
    displayName: 'CommentList',

    render: function () {
        var commentNodes = this.props.data.map(function (comment) {
            return React.createElement(
                Comment,
                { author: comment.author,
                    id: comment.id },
                comment.text
            );
        });
        return React.createElement(
            'div',
            { className: 'commentList' },
            commentNodes
        );
    }
});

var CommentForm = React.createClass({
    displayName: 'CommentForm',

    getInitialState: function () {
        return { author: "", text: "" };
    },
    changeAuthorState: function (e) {
        this.setState({ author: e.target.value });
    },
    changeCommentState: function (e) {
        this.setState({ text: e.target.value });
    },
    submit: function (e) {
        e.preventDefault();
        var author = this.state.author;
        var text = this.state.text;
        if (!author || !text) {
            return;
        }

        this.props.onCommentSubmit({ author: author, text: text });
        this.setState({ author: "", text: "" });
    },
    render: function () {
        return React.createElement(
            'form',
            { className: 'commentForm', onSubmit: this.submit },
            React.createElement('input', { type: 'text',
                placeholder: 'Your name',
                value: this.state.author,
                onChange: this.changeAuthorState }),
            React.createElement('input', { type: 'text',
                placeholder: 'Your text',
                value: this.state.text,
                onChange: this.changeCommentState }),
            React.createElement('input', { type: 'submit', value: 'Post' })
        );
    }
});

var Comment = React.createClass({
    displayName: 'Comment',

    render: function () {
        return React.createElement(
            'div',
            { className: 'comment' },
            React.createElement(
                'h2',
                { className: 'commentAuthor' },
                this.props.author
            ),
            this.props.children
        );
    }
});

ReactDOM.render(React.createElement(CommentBox, { url: '/api/comments', pollInterval: 2000 }), document.getElementById('app'));
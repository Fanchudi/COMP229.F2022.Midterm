// create a reference to the model
let TodoModel = require('../models/todo');

// Gets all todo from the Database and renders the page to list them all.
module.exports.todoList = function (req, res, next) {

    TodoModel.find((err, todoList) => {
        //console.log(todoList);
        if (err) {
            return console.error(err);
        } else {
            res.render('todo/list', {
                title: 'To-Do List',
                TodoList: todoList,
                userName: req.user ? req.user.username : ''
            })
        }
    });
}


// Gets a todo by id and renders the details page.
module.exports.details = (req, res, next) => {

    let id = req.params.id;

    TodoModel.findById(id, (err, todoToShow) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //show the edit view
            res.render('todo/details', {
                title: 'To-Do Details',
                todo: todoToShow
            })
        }
    });
}

// Gets a todo by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    TodoModel.findById(id, (err, todoToShow) => {
        if (err) {
            res.end(err);
        } else {
            res.render('todo/add_edit', {
                title: 'Edit To-Do',
                todo: todoToShow
            })
        }
    });

}

// Processes the data submitted from the Edit form to update a todo
module.exports.processEditPage = async (req, res, next) => {
    let id = req.params.id
    await TodoModel.updateOne({
        _id: id
    }, {
        $set: req.body
    })
    res.redirect('/todo/list')
}

// Deletes a todo based on its id.
module.exports.performDelete = (req, res, next) => {
    let id = req.params.id
    TodoModel.findById(id, async (err, todoToShow) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            await TodoModel.remove({
                _id: id
            })
            res.redirect('/todo/list')
        }
    });
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {

    res.render('todo/add_edit', {
        title: 'Add a new To-Do',
        todo: {
            _id: null,
            task: null,
            description: null,
            complete: '',
        }
    })
}

// Processes the data submitted from the Add form to create a new todo
module.exports.processAddPage = (req, res, next) => {
    let newTodo = new TodoModel(req.body);
    newTodo.save()
    res.redirect('/todo/list')
}
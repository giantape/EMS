module.exports = (app) => {
    const user = require('../../controllers/userController.js');

    // Create a new Note
    app.post('/user', user.create);

    // All User
    app.get('/user', user.findAll);

    // FindById
    app.get('/user/:id', user.findById);

    // Update
    app.put('/user/:id', user.update);

    // Delete
    app.delete('/user/:id', user.delete);
}
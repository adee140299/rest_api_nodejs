# rest_api_nodejs
Create a New Book
URL: http://localhost:3000/api/books
Method: POST
Data Params: JSON object containing name, img, and summary of the book.

Get All Books
URL: http://localhost:3000/api/books
Method: GET

Get a Single Book by ID
URL: http://localhost:3000/api/books/:id
Method: GET
URL Params: id (required) - The ID of the book to retrieve.


Update a Book by ID
URL: http://localhost:3000/api/books/:id
Method: PUT
URL Params: id (required) - The ID of the book to update.
Data Params: JSON object containing fields to update.

Delete a Book by ID
URL: http://localhost:3000/api/books/:id
Method: DELETE
URL Params: id (required) - The ID of the book to delete.

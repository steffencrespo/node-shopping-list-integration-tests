const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

describe('', function(){

	before(function(){
		return runServer();
	});

	after(function(){
		return closeServer();
	});

	it('should retrieve recipes', function(){
		return chai.request(app)
				.get('/recipes')
				.then(function(res) {
					res.should.have.status(200);
					res.should.be.json;
					res.body.length.should.be.above(0);
				});
		
	});

	it('should create new recipes', function(){
		const recipeToAdd = {'name': 'boiled white rice', 'ingredients': ['1 cup white rice', '2 cups water', 'pinch of salt']};
		return chai.request(app)
			.post('/recipes')
			.send(recipeToAdd)
			.then(function(res) {
				res.should.have.status(201);
				res.body.should.include.keys('name', 'ingredients');
			});
	});

	xit('should not create new recipe when the request is missing parameters', function(){
		return chai.request(app)
			.post('/recipes')
			.send({'name': 'boiled white rice'})
			.then(function(res) {
				res.should.have.status(400);
				res.body.should.have.message('Missing ingredients in request body');
			});
		
	});

	it('should change an existing recipe', function(){
		const updateRecipe = {
			name: 'newRecipe',
			ingredients: []
		}
		return chai.request(app)
			.get('/recipes')
			.then(function(res){
				updateRecipe.id = res.body[0].id;
				return chai.request(app)
					.put(`/recipes/${updateRecipe.id}`)
					.send(updateRecipe)
			})
			.then(function(res){
				res.should.have.status(201);
				res.should.be.a('object');
				res.body.should.deep.equal(updateRecipe);
			});
		
	});	

	it('should delete an existing recipe', function(){

		
	});

});
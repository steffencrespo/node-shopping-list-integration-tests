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
		
	});

	it('should not create new recipe when the request is missing parameters', function(){

		
	});

	it('should change an existing recipe', function(){

		
	});	

	it('should delete an existing recipe', function(){

		
	});

});
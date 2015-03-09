describe("Thread runner", function(){

	var threadRunner;

	beforeEach(function(){
		threadRunner = createThreadRunner();
	});





	it( "should be an object", function(){
		expect( threadRunner ).toEqual( jasmine.any( Object ) );
	});



	it( "should contain an empty list of threads", function(){
		expect( threadRunner.__threads ).toEqual( jasmine.any( Object ) );
	});



	it( "should be able to add new threads", function(){
		var thread = {};

		threadRunner.addThread( "thread", thread );

		expect( threadRunner.__threads.thread ).toBe( thread );
	});



	it("should be able to remove threads", function(){
		var thread = {};

		threadRunner.addThread( "thread", thread );
		threadRunner.removeThread( "thread", thread );

		expect( threadRunner.__threads.thread ).toBeUndefined();
	});





	describe("should add new threads with", function () {

		var thread;



		describe( "a valid fps", function(){

			it("when created by default", function(){
				thread = {};
				threadRunner.addThread( "thread", thread );

				expect( threadRunner.__threads.thread.fps ).toEqual( jasmine.any( Number ) );
			});



			it("when created in a valid way", function(){
				thread = { fps: 20 };
				threadRunner.addThread( "thread", thread );

				expect( threadRunner.__threads.thread.fps ).toBe( 20 );
			});



			it("when created in an invalid way", function(){
				thread = { fps: false };
				threadRunner.addThread( "thread", thread );

				expect( threadRunner.__threads.thread.fps ).toEqual( jasmine.any( Number ) );
			});

		});



		describe( "a valid active state", function(){

			it("when created by default", function(){
				thread = {};
				threadRunner.addThread( "thread", thread );

				expect( threadRunner.__threads.thread.active ).toEqual( jasmine.any( Boolean ) );
			});



			it("when created in a valid way", function(){
				thread = { active: true };
				threadRunner.addThread( "thread", thread );

				expect( threadRunner.__threads.thread.active ).toBe( true );
			});



			it("when created in an invalid way", function(){
				thread = { active: 'hello' };
				threadRunner.addThread( "thread", thread );

				expect( threadRunner.__threads.thread.active ).toEqual( jasmine.any( Boolean ) );
			});

		});





		describe( "a valid active, empty task list", function(){

			it("when created by default", function(){
				thread = {};
				threadRunner.addThread( "thread", thread );

				expect( threadRunner.__threads.thread.tasks ).toEqual( jasmine.any( Array ) );
				expect( threadRunner.__threads.thread.tasks.length ).toBe( 0 );
			});



			it("when created in an invalid way", function(){
				thread = { tasks: [ function () {} ] };
				threadRunner.addThread( "thread", thread );

				expect( threadRunner.__threads.thread.tasks ).toEqual( jasmine.any( Array ) );
				expect( threadRunner.__threads.thread.tasks.length ).toBe( 0 );
			});

		});

	});



});
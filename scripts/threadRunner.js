/**
 *	@typedef thread
 *	@type {Object}
 *
 *	@property {number}		fps			- The number of times this threads' tasks run every second
 *	@property {boolean}		active		- Whether or not this thread should currently be running its tasks
 *	@property {array}		tasks		- An array of functions, or 'tasks', this thread will run every 'tick'
 */

/**
 *	Returns a threadRunner object. This is used for running 'simulations', or 'multi-run-functions' a certain number of times per second in a way which setTimeout cannot guarantee.
 *	@function
 *	@name createThreadRunner
 *	@returns {threadRunner} threadRunner
 */
function createThreadRunner () {

	/**
	 *	@namespace threadRunner
	 */
	var threadRunner = {};
	var threads = {};

	threadRunner.addThread		= addThread;
	threadRunner.removeThread	= removeThread;

	/**
	 *	@name __threads
	 *	@type {Array.thread}
	 *	@memberof threadRunner
	 */
	threadRunner.__threads		= threads;

	return threadRunner;



	//	FUNCTIONS	//	FUNCTIONS	//


	/**
	 *	@method threadRunner.addThread
	 *	@memberof threadRunner
	 */
	function addThread ( newThreadID, newThread ) {

		newThread = newThread || {};

		newThread.tasks		= [];
		newThread.fps		= typeof newThread.fps === 'number' ?
			newThread.fps :
			60;
		newThread.active	= typeof newThread.active === 'boolean' ?
			newThread.active :
			false;

		threads[ newThreadID ] = newThread;
	}



	/**
	 *	@method removeThread
	 *	@memberof threadRunner
	 */
	function removeThread ( threadID ) {

		if ( !!threads[ threadID ] ) {
			delete threads[ threadID ];
		} else {
			console.warn( 'a thread with an ID of "' + threadID + '" does not exist.' );
		}

	}

};
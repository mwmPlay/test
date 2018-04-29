(function() {
	var app = new Vue({
		el: '#app',
		data: {
			outputs: []
		},
		methods: {
			log: function(thing) {
				this.outputs.push(thing);
			}
		}
	});
	
	function resolveAfter2Seconds() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve('resolved');
			}, 2000);
		});
	}
	
	async function asyncCall() {
		app.log('before await');
		var result = await resolveAfter2Seconds();
		app.log('after await');
		app.log(result);
		return 'something else';
	}
	
	async function asyncCall2() {
		app.log('before await2');
		return resolveAfter2Seconds();
	}
	
	async function asyncCall3() {
		app.log('before await3');
		return '3';
	}
	
	app.log('before call');
	var result = asyncCall();
	app.log('called');
	console.log(result);
	result.then(x => {
		app.log(x);
	});
	
	app.log('before call2');
	var result2 = asyncCall2();
	app.log('called2');
	console.log(result2);
	result2.then(x => {
		app.log(x + '2');
	});
	
	app.log('before call3');
	var result3 = asyncCall3();
	result3.then(x => {
		app.log(x);
	});
	app.log('called3');
	app.log('called3.1');
	app.log('called3.2');
	app.log('called3.3');
	app.log('called3.4');
	app.log('called3.5');
	app.log('called3.6');
	app.log('called3.7');
	app.log('called3.8');
	app.log('called3.9');
	console.log(result3);
	
	// are async functions running alongside eachother? or one after the other? appears to be alongside
	function returnSoon(msg) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(msg);
			}, 500);
		});
	}
	async function writeTenThings1() {
		for (var i=1;i<11;i++) {
			var result = await returnSoon('1: ' + i);
			app.log(result);
		}
	}
	async function writeTenThings2() {
		for (var i=1;i<11;i++) {
			var result = await returnSoon('2: ' + i);
			app.log(result);
		}
	}
	writeTenThings1();
	writeTenThings2();
	app.log('Started writing 10 things times 2');
	
	// TODO: nog iets met Promise.all en consorten
})();
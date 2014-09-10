Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function(){
	this.route('scoreboard', {path: '/'});
	this.route('fullBoard', {
		path: '/:id',
		onRun: function() {
			Session.set('chosen', this.params.id);
			// console.log(this.params.id);
		},
		// data: {
		// 	uri: _.compact(window.location.pathname.split("/"))
		// }
	});
});
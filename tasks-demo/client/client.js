Meteor.subscribe('tasks');


Template.taskList.helpers({
	
	tasks: function(){ 
		return Tasks.find({}, { sort: {createdAt: 1} });
	}
	
});


Template.taskItem.events({
	
	'change input[type=checkbox]': function(){
		Tasks.update({
			_id: this._id
		},{
			$set: {
				completed: !this.completed
			}
		});
	},
	
	'click button[data-action=remove]': function(){
		if(confirm('Are you sure?')){
			Tasks.remove(this._id)
		}
	}
	
});


Template.taskForm.events({
	
	'click button': function(e, tmpl){
		var desc = tmpl.find('input').value;
		if(desc){
			
			// Insert the new task
			Tasks.insert({
				description: desc,
				completed: false,
				createdAt: new Date()
			});
			
			// Clear the input field
			tmpl.find('input').value = '';
		}
	}
	
});


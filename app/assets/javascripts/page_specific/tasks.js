var TodoController = Paloma.controller('StaticPages')

TodoController.prototype.index = function () {
	// The taskHtml method takes in a JavaScript representation
	// of the task and produces an HTML representation using
	// <li> tags
	function taskHtml(task) {
		return '<li><div class="view"><input class="toggle" type="checkbox" ' +
			'data-id="' + task.id + '" ' +
			(task.done ? 'checked' : '') +
			'><label>' +
			task.title +
			'</label></div></li>';
	}

	// toggleTask takes in an HTML representation of the
	// an event that fires from an HTML representation of
	// the toggle checkbox and  performs an API request to toggle
	// the value of the `done` field
	function toggleTask(e) {
		$.post('/tasks/' + $(e.target).data('id'), {
			_method: 'PUT',
			task: {
				done: Boolean($(e.target).is(':checked'))
			}
		});
	}

	$.get('/tasks').success(function (data) {
		let htmlString = '';
		$.each(data, function (index, task) {
			htmlString += taskHtml(task);
		});
		$('.todo-list').html(htmlString);

		$('.toggle').change(toggleTask);
	});

	$('#new-form').submit(function (event) {
		event.preventDefault();
		$.post('/tasks', {
			task: {
				title: $('.new-todo').val()
			}
		}).success(function (data) {
			$('.todo-list').append(taskHtml(data));
			$('.toggle').click(toggleTask);
		});
	});
}
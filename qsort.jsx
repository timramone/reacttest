/** @jsx React.DOM */

var myFuncs = {
	getRandomInt: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	exch: function(arr, i, j) {
		var h = arr[i];
		arr[i] = arr[j];
		arr[j] = h;
	},
	shuffle: function(array) {
		for(var i=0; i<array.length; ++i) {
			this.exch(array, i, this.getRandomInt(0, i));
		}
	},
	partition: function(arr, lo, hi) {
		var i = lo + 1;
		var j = hi;
		
		while(true) {
			while(arr[i] < arr[lo] && i < hi) {
				i++;
			}
			
			while(arr[j] > arr[lo] && j > lo) {
				j--;
			}
			
			if (i >= j)
				break;
				
			this.exch(arr, i, j);
		}
		
		this.exch(arr, lo, j);
		return j;
	},
	qsort: function(arr, lo, hi) {
		if (lo >= hi)
			return;
		
		var mid = this.partition(arr, lo, hi);
		this.qsort(arr, lo, mid - 1);
		this.qsort(arr, mid + 1, hi);
	},
	sort: function(arr) {
		this.shuffle(arr);
		this.qsort(arr, 0, arr.length - 1);
	}
};

var QSortComponent = new React.createClass({
	handleClick: function(e) {
		var array = this.refs.arrayInput.getDOMNode().value.split(' ').
			filter(function(str) { return str; }).
			map(function(str) {return parseInt(str); });
		
		myFuncs.sort(array);
		
		this.refs.arrayInput.getDOMNode().value = array.join(' ');
		
		console.log(array);
	},
	render: function() {
		return (
			<div className="q-sort-container">
				<input type="text" placeholder="Type array here" ref="arrayInput" />
				<button onClick={this.handleClick}>Q-Sort!</button>
			</div>
		);
	}
});

React.renderComponent(
	<QSortComponent />,
	document.getElementById('qsort'));
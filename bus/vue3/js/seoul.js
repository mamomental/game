const seoul = {
	props:['bus'],
	data() {
		return {
			url :
				'https://bus.go.kr/sbus/bus/selectBusArrive.do',
			tableRow : [],
			timer : {
				timer : null,
				counterBase : 30,
				counter : 0
			}
		}
	},
	created() {
		this.tableRow = [];
		this.startTimer();
	},
	mounted : function (){
		
	},
	methods : {
		startTimer : function() {
			var interval = setInterval(() => {
				this.timer.counter--;
				if (0 >= this.timer.counter) {
					this.tableRow = [];
					this.searchSeoul();
					this.timer.counter = this.timer.counterBase;
				}
			}, 1000);
			return interval;
		},
		searchSeoul : function() {
			for (var i = 0; i < this.bus.buses.length; i++) {
				var params = {'_dc':this.bus.buses[i].dc,
					'stopId':this.bus.buses[i].stopId,
					'ord':this.bus.buses[i].staOrder};
					
				this.search(this.url, this.bus.buses[i], params);
			}
		},
		search : function(url, bus, params) {
			axios.get(url, {
				params:params
			})
			.then(response => {
				this.parse(response.data.ResponseVO.data.resultList, bus);
			})
			.catch(error => {
			  console.log(error);
			});
		},
		parse(list, bus) {
			for (var i = 0; i < list.length; i++) {
				if (list[i].rtnm == bus.rtnm) {
					this.tableRow.push({
						'busNo':bus.busNo,
						'predictTime1':list[i].avgs1,
						'predictTime2':list[i].avgs2
					});
				}
			}
		}
	},
	template: `<span>
	<span>{{this.timer.counter}}</span>
	<table id="bustable">
		<caption>{{bus.stationName}}</caption>
		<thead>
			<tr>
				<th scope="col">버스</th>
				<th scope="col">첫번째</th>
				<th scope="col">두번째</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="row in tableRow">
				<th scope="row">{{row.busNo}}번</th>
				<td scope="row">{{row.predictTime1}}</th>
				<td scope="row">{{row.predictTime2}}</th>
			</tr>
		</tbody>
	</table>
	</span>`
}

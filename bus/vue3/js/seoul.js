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
		console.log(this.params.caption);
		console.log(this.params.bus);
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
						'stationName':bus.stationName,
						'busNo':bus.busNo,
						'busOrder':'첫번째',
						'predictTime':list[i].avgs1
					});
					this.tableRow.push({
						'stationName':bus.stationName,
						'busNo':bus.busNo,
						'busOrder':'두번째',
						'predictTime':list[i].avgs2
					});
				}
			}
		}
	},
	template: `<span>
	<span>{{this.timer.counter}}</span>
	<table id="bustable">
		<caption>{{bus.caption}}</caption>
		<thead>
			<tr>
				<th scope="col">정거장</th>
				<th scope="col">버스</th>
				<th scope="col">순서</th>
				<th scope="col">도착 정보</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="row in tableRow">
				<th scope="row">{{row.stationName}}</th>
				<th scope="row">{{row.busNo}}번</th>
				<th scope="row">{{row.busOrder}}</th>
				<td>{{row.predictTime}}</td>
			</tr>
		</tbody>
	</table>
	</span>`
}

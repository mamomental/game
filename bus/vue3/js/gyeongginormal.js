const gyeongginormal = {
	props:['bus'],
	data() {
		return {
			url : 'https://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList',
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
					this.searchGyeonggi();
					this.timer.counter = this.timer.counterBase;
				}
			}, 1000);
			return interval;
		},
		searchGyeonggi : function() {
			for (var i = 0; i < this.bus.buses.length; i++) {
				var params = {'serviceKey':this.bus.buses[i].serviceKey,
					'stationId':this.bus.buses[i].stationId,
					'routeId':this.bus.buses[i].routeId,
					'staOrder':this.bus.buses[i].staOrder};
				
				this.search(this.url, this.bus.buses[i], params);
			}
		},
		search : function(url, bus, params) {
			axios.get(url, {
				params:params
			})
			.then(response => {
				var xml = this.parseXml(response.data);
				this.xmlToJson(xml, bus);
			})
			.catch(error => {
			  console.log(error);
			});
		},
		parseXml(xml) {
			var parser = new DOMParser();
			return parser.parseFromString(xml, "text/xml");
		},
		xmlToJson(xml, bus) {
			var list = xml.getElementsByTagName('busArrivalList');
			for (var i = 0; i < list.length; i++) {
				if (list[i].getElementsByTagName('routeId')[0].childNodes[0].nodeValue != 'undefined' && list[i].getElementsByTagName('routeId')[0].childNodes[0].nodeValue == bus.routeId) {
					if (list[i].getElementsByTagName('locationNo1')[0].childNodes[0].nodeValue != 'undefined') {
						this.tableRow.push({
							'busNo':bus.busNo,
							'busOrder':'첫번째',
							'locationNo':list[i].getElementsByTagName('locationNo1')[0].childNodes[0].nodeValue,
							'predictTime':list[i].getElementsByTagName('predictTime1')[0].childNodes[0].nodeValue
						});
					}
					if (list[i].getElementsByTagName('locationNo2')[0].childNodes[0].nodeValue != 'undefined') {
						this.tableRow.push({
							'busNo':bus.busNo,
							'busOrder':'두번째',
							'locationNo':list[i].getElementsByTagName('locationNo2')[0].childNodes[0].nodeValue,
							'predictTime':list[i].getElementsByTagName('predictTime2')[0].childNodes[0].nodeValue
						});
					}
				}
			}
		}
	},
	template: `<span>
		<span>{{this.timer.counter}}</span>
		<table>
			<caption>{{bus.stationName}}</caption>
			<thead>
				<tr>
					<th scope="col">버스</th>
					<th scope="col">순서</th>
					<th scope="col">몇 정거장 전</th>
					<th scope="col">몇 분 후</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="row in tableRow">
					<th scope="row">{{row.busNo}}번</th>
					<th scope="row">{{row.busOrder}}</th>
					<td>{{row.locationNo}}</td>
					<td>{{row.predictTime}}</td>
				</tr>
			</tbody>
		</table>
		</span>`
}

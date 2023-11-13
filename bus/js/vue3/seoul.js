const seoul = {
	data() {
		return {
			url :
				'http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRoute',
//				'https://mamomental.github.io/game/bus/xml/seoul.xml',
			tableRow : [],
			timer : {
				timer : null,
				counterBase : 30,
				counter : 0
			},
			buses : [
				{'serviceKey':'gJEu1BoleMqG5NN+QtCILoPjgDq2w13LP1V+zpR5QnCIqy73AGgPYInJcj67U+8T3A7YUPJ88jg423EQriZW8w==','stationName':'위례동주민센터.위례송파푸르지오','busNo':'333','stationId':'123000619','routeId':'100100496','staOrder':'10'},
				{'serviceKey':'gJEu1BoleMqG5NN+QtCILoPjgDq2w13LP1V+zpR5QnCIqy73AGgPYInJcj67U+8T3A7YUPJ88jg423EQriZW8w==','stationName':'위례동주민센터.위례송파푸르지오','busNo':'440','stationId':'123000619','routeId':'100100459','staOrder':'10'}
			]
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
			for (var i = 0; i < this.buses.length; i++) {
				var params = {'serviceKey':this.buses[i].serviceKey,
					'stId':this.buses[i].stationId,
					'busRouteId':this.buses[i].routeId,
					'ord':this.buses[i].staOrder};
					
				this.search(this.url, this.buses[i], params);
			}
		},
		search : function(url, bus, params) {
			axios.get(url, {
				params:params
			})
			.then(response => {
				var xml = this.parseXml(response.data);
				var json = this.xmlToJson(xml, bus);
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
			var result = [];
			var list = xml.getElementsByTagName('itemList');
			for (var i = 0; i < list.length; i++) {
				this.tableRow.push({
					'stationName':bus.stationName,
					'busNo':bus.busNo,
					'busOrder':'첫번째',
					'predictTime':list[i].getElementsByTagName('arrmsg1')[0].childNodes[0].nodeValue
				});
				this.tableRow.push({
					'stationName':bus.stationName,
					'busNo':bus.busNo,
					'busOrder':'두번째',
					'predictTime':list[i].getElementsByTagName('arrmsg2')[0].childNodes[0].nodeValue
				});
			}
			return result;
		}
	},
	template: `<span>
	<span>{{this.timer.counter}}</span>
	<table id="bustable">
		<caption>서울 버스 도착 정보(샘플)</caption>
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

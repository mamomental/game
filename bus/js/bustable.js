Vue.component('busTable', {
	template: `
	<span>
	<span>{{this.timer.counter}}</span>
	<table id="bustable">
		<caption>도착 정보</caption>
		<thead>
			<tr>
				<th scope="col">정거장</th>
				<th scope="col">버스</th>
				<th scope="col">순서</th>
				<th scope="col">몇 분 후</th>
				<th scope="col">몇 정거장 전</th>
				<th scope="col">남은 자리</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="row in tableRow">
				<th scope="row">{{row.stationName}}</th>
				<th scope="row">{{row.busNo}}번</th>
				<th scope="row">{{row.busOrder}}</th>
				<td>{{row.locationNo}}</td>
				<td>{{row.predictTime}}</td>
				<td>{{row.remainSeatCnt}}</td>
			</tr>
		</tbody>
	</table>
	</span>
	`,
	props:['params'],
	data() {
		return {
			url : {
				gyeonggi : 'https://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList',
				seoul : 'http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRoute'
			},
			tableRow : [],
			timer : {
				timer : null,
				counterBase : 30,
				counter : 0
			},
			buses : {
				gyeonggi : [
				{'serviceKey':'gJEu1BoleMqG5NN+QtCILoPjgDq2w13LP1V+zpR5QnCIqy73AGgPYInJcj67U+8T3A7YUPJ88jg423EQriZW8w==','stationName':'화랑공원남편','busNo':'1009','stationId':'206000544','routeId':'234000310','staOrder':'98'}
				],
				seoul : [
				{'serviceKey':'gJEu1BoleMqG5NN+QtCILoPjgDq2w13LP1V+zpR5QnCIqy73AGgPYInJcj67U+8T3A7YUPJ88jg423EQriZW8w==','stationName':'예제정류소','busNo':'예제버스','stationId':'124000414','routeId':'100100578','staOrder':'29'}
				]
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
					//		this.searchSeoul();
					this.timer.counter = this.timer.counterBase;
				}
			}, 1000);
			return interval;
		},
		searchGyeonggi : function() {
			for (var i = 0; i < this.buses.gyeonggi.length; i++) {
				this.search('g', this.url.gyeonggi, this.buses.gyeonggi[i]);
			}
		},
		searchSeoul : function() {
			for (var i = 0; i < this.buses.seoul.length; i++) {
				this.search('s', this.url.seoul, this.buses.seoul[i]);
			}
		},
		search : function(region, url, bus) {
			axios.get(url, {
				params:{
					serviceKey:bus.serviceKey,
					stationId:bus.stationId,
					routeId:bus.routeId,
					staOrder:bus.staOrder}
				}
			)
			.then(response => {
				var xml = this.parseXml(response.data);
				var json = this.xmlToJson(region, xml, bus);
			})
			.catch(error => {
			  console.log(error);
			});
		},
		parseXml(xml) {
			var parser = new DOMParser();
			return parser.parseFromString(xml, "text/xml");
		},
		xmlToJson(region, xml, bus) {
			var result = [];
			if (region == 'g') {
				var list = xml.getElementsByTagName('busArrivalList');
				for (var i = 0; i < list.length; i++) {
					if (list[i].getElementsByTagName('routeId')[0].childNodes[0].nodeValue == bus.routeId) {
						this.tableRow.push({
							'stationName':bus.stationName,
							'busNo':bus.busNo,
							'busOrder':'첫번째',
							'locationNo':list[i].getElementsByTagName('locationNo1')[0].childNodes[0].nodeValue,
							'predictTime':list[i].getElementsByTagName('predictTime1')[0].childNodes[0].nodeValue,
							'remainSeatCnt':list[i].getElementsByTagName('remainSeatCnt1')[0].childNodes[0].nodeValue,
						});
						this.tableRow.push({
							'stationName':bus.stationName,
							'busNo':bus.busNo,
							'busOrder':'두번째',
							'locationNo':list[i].getElementsByTagName('locationNo2')[0].childNodes[0].nodeValue,
							'predictTime':list[i].getElementsByTagName('predictTime2')[0].childNodes[0].nodeValue,
							'remainSeatCnt':list[i].getElementsByTagName('remainSeatCnt2')[0].childNodes[0].nodeValue
						});
					}
				}
			}
			return result;
		}
	}
});

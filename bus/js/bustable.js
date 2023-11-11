Vue.component('busTable', {
	template: `
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
	`,
	props:['params'],
	data() {
		return {
			url : {
				gg : 'https://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList'
			},
			tableRow : [],
			buses : [
			{'title':'퇴근-화랑공원남편-1009','serviceKey':'gJEu1BoleMqG5NN+QtCILoPjgDq2w13LP1V+zpR5QnCIqy73AGgPYInJcj67U+8T3A7YUPJ88jg423EQriZW8w==','stationName':'화랑공원남편','busNo':'1009','stationId':'206000544','routeId':'234000310','staOrder':'98'}
		]
		}
	},
	created() {
		this.search();
	},
	methods : {
		search : function() {
			axios.get(this.url.gg, {
				params:{
					serviceKey:this.buses[0].serviceKey,
					stationId:this.buses[0].stationId,
					routeId:this.buses[0].routeId,
					staOrder:this.buses[0].staOrder}
				}
			)
			.then(response => {
				this.tableRow = [];
				var xml = this.parseXml(response.data);
				var json = this.xmlToJson(xml, this.buses[0]);
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
			var result = [];
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
			return result;
		}
	}
});

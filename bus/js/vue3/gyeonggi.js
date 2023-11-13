const gyeonggi = {
  data() {
    return {
			url : 'https://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList',
			tableRow : [],
			timer : {
				timer : null,
				counterBase : 30,
				counter : 0
			},
			buses : [
				{'serviceKey':'gJEu1BoleMqG5NN+QtCILoPjgDq2w13LP1V+zpR5QnCIqy73AGgPYInJcj67U+8T3A7YUPJ88jg423EQriZW8w==','stationName':'화랑공원남편','busNo':'1009','stationId':'206000544','routeId':'234000310','staOrder':'98'},
				{'serviceKey':'gJEu1BoleMqG5NN+QtCILoPjgDq2w13LP1V+zpR5QnCIqy73AGgPYInJcj67U+8T3A7YUPJ88jg423EQriZW8w==','stationName':'경기수원의료원.두견마을.파크푸르지오','busNo':'1009','stationId':'200000113','routeId':'234000310','staOrder':'98'}
			]
    }
  },
  template: `<span>
	<span>{{this.timer.counter}}</span>
	<table>
		<caption>경기도 버스 도착 정보</caption>
		<thead>
			<tr>
				<th scope="col">정거장</th>
				<th scope="col">버스</th>
				<th scope="col">순서</th>
				<th scope="col">몇 정거장 전</th>
				<th scope="col">몇 분 후</th>
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
	</span>`
}

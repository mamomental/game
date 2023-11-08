jQuery(document).ready(function($) {
	var BusController = function(config) {
		var _config = config;
		var _processAjax = function (defaults, options) {
			options=$.extend(defaults, options);
			$.ajax(options);
		}
		
		var _parseData = function(xml, bus) {
			$(xml).find('busArrivalList').each(function(index){ 
                var routeId = $(this).find('routeId').text();
				if (routeId == bus.routeId) {
					// 몇 번째 전
					$('#location-'+bus.busNo+'-1').text($(this).find('locationNo1').text());
					$('#location-'+bus.busNo+'-2').text($(this).find('locationNo2').text());
					// 몇 분 후
					$('#time-'+bus.busNo+'-1').text($(this).find('predictTime1').text());
					$('#time-'+bus.busNo+'-2').text($(this).find('predictTime2').text());
					// 빈 자리
					$('#seat-'+bus.busNo+'-1').text($(this).find('remainSeatCnt1').text());
					$('#seat-'+bus.busNo+'-2').text($(this).find('remainSeatCnt2').text());
				}
			});
		}

		return {
			search : function(bus) {
				var options = {
					url:'https://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList',
					type: 'get',
					data:{
						'serviceKey':bus.serviceKey,
						'stationId':bus.stationId,
						'routeId':bus.routeId,
						'staOrder':bus.staOrder},
					dataType:'xml',
					success : function (result) {
						_parseData(result, bus);
					},
					error: function(xhr,status,error){
						console.log('code:'+xhr.status);
						if (xhr.status != '0') {
							res = $.parseJSON(xhr.responseText);
2//							console.log(res);
							if (res.result.displayableMessage) {
								alert(res.result.message);
							}
						}
					}
				}
				_processAjax(options);				
			},
			test : function(bus) {
				var options = {
					url:'https://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll',
					type: 'get',
					data:{
						'serviceKey':bus.serviceKey,
						'busRouteId':'100100118'
					},
					dataType:'xml',
					success : function (result) {
						console.log(result);
					},
					error: function(xhr,status,error){
						console.log('code:'+xhr.status);
						if (xhr.status != '0') {
							res = $.parseJSON(xhr.responseText);
2//							console.log(res);
							if (res.result.displayableMessage) {
								alert(res.result.message);
							}
						}
					}
				}
				_processAjax(options);				
			}
		};
	};
	var config = {
		buses : [
			{'title':'퇴근-화랑공원남편-1009','serviceKey':'gJEu1BoleMqG5NN+QtCILoPjgDq2w13LP1V+zpR5QnCIqy73AGgPYInJcj67U+8T3A7YUPJ88jg423EQriZW8w==','stationName':'화랑공원남편','busNo':'1009','stationId':'206000544','routeId':'234000310','staOrder':'98'}
		],
		msg : {
			SUCCESS:'성공했습니다.',
		}
	};

	$("body").on("click",".bus", function(event) {
		$.busController.search($(this).attr('stationId'), $(this).attr('routeId'), $(this).attr('staOrder'));
	});
	
	$(document).ready(function() {
		$.each(config.buses, function(i, item) {
				$('#bustable > tbody:last').append('<tr><th scope="row">'+item.stationName+'</th><th scope="row">'+item.busNo+'번</th><th scope="row">1번째</th><td id="time-'+item.busNo+'-1"></td><td id="location-'+item.busNo+'-1"></td><td id="seat-'+item.busNo+'-1"></td></tr>');
				$('#bustable > tbody:last').append('<tr><th scope="row">'+item.stationName+'</th><th scope="row">'+item.busNo+'번</th><th scope="row">2번째</th><td id="time-'+item.busNo+'-2"></td><td id="location-'+item.busNo+'-2"></td><td id="seat-'+item.busNo+'-2"></td></tr>');
		});
		$.each(config.buses, function(i, bus) {
				$.busController.search(bus);
		});
		
		$.busController.test(config.buses[0]);
	});
	$.busController = BusController(config);
});


jQuery(document).ready(function($) {
	var BusController = function(config) {
		var _config = config;
		var _processAjax = function (defaults, options) {
			options=$.extend(defaults, options);
			$.ajax(options);
		}

		var _parseData = function(xml, routeId) {
			console.log(xml);
			$(xml).find('busArrivalList').each(function(index){ 
                	var rId = $(this).find('routeId').text();
			if (rId == routeId) {
				// 몇 번째 전
				$('#locationNo1').text($(this).find('locationNo1').text());
				$('#locationNo2').text($(this).find('locationNo2').text());
				// 몇 분 후
				$('#predictTime1').text($(this).find('predictTime1').text());
				$('#predictTime2').text($(this).find('predictTime2').text());
				// 빈 자리
				$('#remainSeatCnt1').text($(this).find('remainSeatCnt1').text());
				$('#remainSeatCnt2').text($(this).find('remainSeatCnt2').text());
			}
			});
		}

		return {
			search : function(stationId, routeId, staOrder) {
				var options = {
					url:'https://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList',
					type: 'get',
					data:{
						'serviceKey':'gJEu1BoleMqG5NN+QtCILoPjgDq2w13LP1V+zpR5QnCIqy73AGgPYInJcj67U+8T3A7YUPJ88jg423EQriZW8w==',
						'stationId':stationId,
						'routeId':routeId,
						'staOrder':staOrder},
					success : function (result) {
						_parseData(result, routeId);
					},
					error: function(xhr,status,error){
						console.log('code:'+xhr.status);
						if (xhr.status != '0') {
							res = $.parseJSON(xhr.responseText);
//							console.log(res);
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
		msg : {
			SUCCESS:'성공했습니다.',
		}
	};

	$("body").on("click",".bus", function(event) {
		$.busController.search($(this).attr('stationId'), $(this).attr('routeId'), $(this).attr('staOrder'));
	});
	$.busController = BusController(config);
});

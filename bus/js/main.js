jQuery(document).ready(function($) {
	var BusController = function(config) {
		var _config = config;
		var _processAjax = function (defaults, options) {
			options=$.extend(defaults, options);
			$.ajax(options);
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
						console.log(result);
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

$('document').ready(() => {
	function blink() {
		$('#weatherBtn').removeClass('buttonOnLoad');
		$('#weatherBtn').addClass('blink');
        setTimeout(() => {
			$('#weatherBtn').removeClass('blink');
			$('#weatherBtn').addClass('buttonOnLoad');
		},250);
		setTimeout(() => {
			$('#infoBtn').removeClass('buttonOnLoad');
			$('#infoBtn').addClass('blink');
		},150);
		setTimeout(() => {
			$('#infoBtn').removeClass('blink');
			$('#infoBtn').addClass('buttonOnLoad');
		},450);
		setTimeout(() => {
			$('#livingBtn').removeClass('buttonOnLoad');
			$('#livingBtn').addClass('blink');
		},350);
		setTimeout(() => {
			$('#livingBtn').removeClass('blink');
			$('#livingBtn').addClass('buttonOnLoad');
		},550);
		setTimeout(() => {
			$('#flagBtn').removeClass('buttonOnLoad');
			$('#flagBtn').addClass('blink');
		},500);
		setTimeout(() => {
			$('#flagBtn').removeClass('blink');
			$('#flagBtn').addClass('buttonOnLoad');
		},750);
				$('#weatherBtn').removeClass('buttonOnLoad');
		$('#weatherBtn').addClass('blink');
        setTimeout(() => {
			$('#weatherBtn').removeClass('blink');
			$('#weatherBtn').addClass('buttonOnLoad');
		},250);
		setTimeout(() => {
			$('#infoBtn').removeClass('buttonOnLoad');
			$('#infoBtn').addClass('blink');
		},150);
		setTimeout(() => {
			$('#infoBtn').removeClass('blink');
			$('#infoBtn').addClass('buttonOnLoad');
		},450);
		setTimeout(() => {
			$('#livingBtn').removeClass('buttonOnLoad');
			$('#livingBtn').addClass('blink');
		},350);
		setTimeout(() => {
			$('#livingBtn').removeClass('blink');
			$('#livingBtn').addClass('buttonOnLoad');
		},550);
		setTimeout(() => {
			$('#flagBtn').removeClass('buttonOnLoad');
			$('#flagBtn').addClass('blink');
		},500);
		setTimeout(() => {
			$('#flagBtn').removeClass('blink');
			$('#flagBtn').addClass('buttonOnLoad');
		},750);
	}
	function phoneBlink() {
		$('#phoneWeatherBtn').removeClass('buttonIcons');
		$('#phoneWeatherBtn').addClass('phoneBlink');
        setTimeout(() => {
			$('#phoneWeatherBtn').removeClass('phoneBlink');
			$('#phoneWeatherBtn').addClass('buttonIcons');
		},250);
		setTimeout(() => {
			$('#phoneInfoBtn').removeClass('buttonIcons');
			$('#phoneInfoBtn').addClass('phoneBlink');
		},150);
		setTimeout(() => {
			$('#phoneInfoBtn').removeClass('phoneBlink');
			$('#phoneInfoBtn').addClass('buttonIcons');
		},450);
		setTimeout(() => {
			$('#phoneLivingBtn').removeClass('buttonIcons');
			$('#phoneLivingBtn').addClass('phoneBlink');
		},350);
		setTimeout(() => {
			$('#phoneLivingBtn').removeClass('phoneBlink');
			$('#phoneLivingBtn').addClass('buttonIcons');
		},600);
		setTimeout(() => {
			$('#phoneFlagBtn').removeClass('buttonIcons');
			$('#phoneFlagBtn').addClass('phoneBlink');
		},500);
		setTimeout(() => {
			$('#phoneFlagBtn').removeClass('phoneBlink');
			$('#phoneFlagBtn').addClass('buttonIcons');
		},750);
	}
	function calculateTimeStamp(stamp) {
		let date = new Date(stamp * 1000);
		let hrs =  date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
		let minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();;
		return hrs + ":" + minutes;
	}
	function createMainArray(arr) {
		arr.forEach(elem => {
			coordiantesArray.push(elem);
			console.log(elem);
		});
	}
	 //Loading map
	let userCountry;
	let countries;
	let userLocation = [];
	let mymap;
	let countryBorders;
	let coordiantesArray = [];
	let loaded = 1;

    function succesfulLookup(position) {
         userLocation[0] = position['coords']['latitude'];
         userLocation[1] = position['coords']['longitude'];
         mymap = L.map('mapid').setView([userLocation[0], userLocation[1]], 6);
         var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            minZoom: 3
        }).addTo(mymap);
		var marker = L.marker([userLocation[0], userLocation[1]]).addTo(mymap);

        //set selected button value to user's location
        $.ajax({
		    url: "libs/php/getCountryByLatAndLong.php",
		    type: 'POST',
		    dataType: 'json',
		    data: {
		    	'lat': userLocation[0],
		    	'lng': userLocation[1]
		    },
		    success: (result) => {
				countryCode = result['data']['countryCode'];
		    },
		    error: (jqXHR, textStatus, errorThrown) => {
		        alert("Something went wrong!! Please try again");
		    }
    	});
    }
    function failedLookup() {
        var mymap = L.map('mapid').setView([48.99, 12.01], 4);
        var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
           maxZoom: 19,
           minZoom: 3
       }).addTo(mymap);
    }
    navigator.geolocation.getCurrentPosition(succesfulLookup, failedLookup);

	//getcountries details for select button
    $.ajax({
	    url: "libs/php/getCountriesDetails.php",
	    type: 'POST',
	    dataType: 'json',
	    data: {
	    },
	    success: (result) => {
	        countries = result['data'].map(elem => {
	            return elem;
	        });
	         countries.forEach(country => {
	            $('#selectButton').append($("<option></option>")
	                 .attr('value', country['alpha2Code'])
	                 .text(country['name']));
			})
			$(`#selectButton option[value=${countryCode}]`).attr('selected','selected');
			$('#selectButton').trigger('change');
	    },
	    error: (jqXHR, textStatus, errorThrown) => {
	        alert("Something went wrong!! Please try again");
	    }
	});
	
    //api requests
    $('#selectButton').on('change', (event) => {
		let selectedCountry = $(event.currentTarget).find(':selected').text();
		let countryFlag = "";
		let countryCode = "";
		countries.forEach(country => {
			if(selectedCountry === country['name']) {
				countryCapital = country['capital'];
				countryFlag = country['flag'];
				countryCode = country['alpha2Code'];

				//country info desktop
				$('#countryArea').html(`${country['area']}`);
				$('#countryCapital').html(`${country['capital']}`);
				$('#countryPopulation').html(`${country['population']}`);
				$('#countryCurrency').html(`${country['currencies'][0]['code']}`);
				$('#countryTimezone').html(`${country['timezones'][0]}`);

				//country info phone
				$('#phoneCountryArea').html(`${country['area']}`);
				$('#phoneCountryCapital').html(`${country['capital']}`);
				$('#phoneCountryPopulation').html(`${country['population']}`);
				$('#phoneCountryCurrency').html(`${country['currencies'][0]['code']}`);
				$('#phoneCountryTimezone').html(`${country['timezones'][0]}`);

				//set user map view to selected country
				mymap.flyTo([country['latlng'][0], country['latlng'][1]], 6);
			}
		});

		//get country weather
		$.ajax({
			url: "libs/php/getCountryWeather.php",
			type: 'POST',
			dataType: 'json',
			data: {
				'countryCapital': countryCapital
			},
			success: (result) => {
				blink();
				phoneBlink();
				//desktop tags-----------------------------------------------------------------------------------
				//weather info
				$('#weatherD1Value').html(`${result['data']['main']['temp']}°C`);
				$('#weatherD2Value').html(`${result['data']['main']['feels_like']}°C`);
				$('#weatherD3Value').html(`${result['data']['main']['pressure']}mb`);
				$('#weatherD4Value').html(`${result['data']['main']['humidity']}%`);
				$('#weatherD5Value').html(`${result['data']['wind']['speed']}m/s`);
				$('#weatherD6Value').html(`${calculateTimeStamp(result['data']['sys']['sunrise'])}UTC`);
				$('#weatherD7Value').html(`${calculateTimeStamp(result['data']['sys']['sunset'])}UTC`);
				//flag 
				$('#flagImg').attr('src',countryFlag);

				//phone tags------------------------------------------------------------------------------------
				//wather info
				$('#weatherP1Value').html(`${result['data']['main']['temp']}°C`);
				$('#weatherP2Value').html(`${result['data']['main']['feels_like']}°C`);
				$('#weatherP3Value').html(`${result['data']['main']['pressure']}mb`);
				$('#weatherP4Value').html(`${result['data']['main']['humidity']}%`);
				$('#weatherP5Value').html(`${result['data']['wind']['speed']}m/s`);
				$('#weatherP6Value').html(`${calculateTimeStamp(result['data']['sys']['sunrise'])} UTC`);
				$('#weatherP7Value').html(`${calculateTimeStamp(result['data']['sys']['sunset'])} UTC`);
				//flag
				$('#phoneFlagImg').attr('src',countryFlag);			 
			},
			error: (jqXHR, textStatus, errorThrown) => {
				alert("Something went wrong!! Please try again");
			}
		});
		
		//get covid cases		
		$.ajax({
			url: "libs/php/getCovidCases.php",
			type: 'POST',
			dataType: 'json',
			data: {
				'countryCode': countryCode
			},
			success: (result) => {
				//desktop---------------------------------------------------------------------------------------
				$('#covidCountry').html(result[0]['country']);
				$('#covidConfirmed').html(result[0]['confirmed']);
				$('#covidCritical').html(result[0]['critical']);
				$('#covidRecovered').html(result[0]['recovered']);
				$('#covidDeaths').html(result[0]['deaths']);
				$('#covidUpdate').html(result[0]['lastUpdate'].substring(0,10));

				//phone-----------------------------------------------------------------------------------------
				$('#phoneCovidCountry').html(result[0]['country']);
				$('#phoneCovidConfirmed').html(result[0]['confirmed']);
				$('#phoneCovidCritical').html(result[0]['critical']);
				$('#phoneCovidRecovered').html(result[0]['recovered']);
				$('#phoneCovidDeaths').html(result[0]['deaths']);
				$('#phoneCovidUpdate').html(result[0]['lastUpdate'].substring(0,10));
			},
			error: (jqXHR, textStatus, errorThrown) => {
				alert("Something went wrong!! Please try again");
			}
		});

		//get country border and draw it
		$.ajax({
			url: "libs/php/getCountryBorders.php",
			type: 'POST',
			dataType: 'json',
			data: {
				'countryCode': countryCode
			},
			success: (result) => {
				result['features'].forEach(country => {
					loaded++;
					let type = "Polygon";
					if(countryCode === country['properties']['iso_a2']) {
						if(loaded > 1) {
							mymap.eachLayer(layer => {
								if('feature' in layer) {
									layer.remove();
								}
							});
						}
						if(country['geometry']['coordinates'].length > 1) {
							type = "MultiPolygon";
						}
						countryBorders = [{
							"type": "Feature",
							"properties": {"scope": "toBeDeleted"},
							"geometry": {
								"type": type,
								"coordinates": country['geometry']['coordinates']
							}
						}];
						L.geoJSON(countryBorders).addTo(mymap);
					}
				});
			},
			error: (jqXHR, textStatus, errorThrown) => {
				alert("getCountryBorders");
			}
		});
    });


});
$('document').ready(() => {
    //closing tags
    function closeAllTags(exception) {
        if(exception !== 'weatherInfo') {
            hide($('#weatherInfo'));
            remButtonPressedAddButtonLoad($('#weatherBtn'));
        }
        if(exception !== "countryInfo") {
            hide($('#countryInfo'));
            remButtonPressedAddButtonLoad($('#infoBtn'));
        }
        if(exception !== "livingCostInfo") {
            hide($('#livingCostInfo'));
            remButtonPressedAddButtonLoad($('#livingBtn'));
        }
        if(exception !=="flagInfo") {
            hide($('#flagInfo'));
            remButtonPressedAddButtonLoad($('#flagBtn'));
        }
    }

    //
    function remButtonLoadAddButtonPressed(event) {
        $(event).addClass('buttonPressed');
        $(event).removeClass('hide');
    }
    function remButtonPressedAddButtonLoad(event) {
        $(event).addClass('buttonOnLoad');
        $(event).removeClass('buttonPressed');
    }

    //Create functions for showing and hiding tags infos
    function show(element) {
        $(element).slideDown('slow');
        $(element).removeClass('hide');
    }
    function hide(element) {    
        $(element).slideUp('slow');
        $(element).addClass('hide');
    }
    //
    $('#weatherBtn').on('click', (event) => {
        if($('#weatherInfo').hasClass('hide')) {
            closeAllTags('weatherInfo');
            remButtonLoadAddButtonPressed(event.currentTarget);
            show($('#weatherInfo'));
        } else {
            hide($('#weatherInfo'));
            remButtonPressedAddButtonLoad(event.currentTarget);
        }
    });
    $('#infoBtn').on('click', (event) => {
        if($('#countryInfo').hasClass('hide')) {
            closeAllTags('countryInfo');
            remButtonLoadAddButtonPressed(event.currentTarget);
            show($('#countryInfo')); 
        } else {
            hide($('#countryInfo'));
            remButtonPressedAddButtonLoad(event.currentTarget);
        }
    });
    $('#livingBtn').on('click', (event) => {
        if($('#livingCostInfo').hasClass('hide')) {
            closeAllTags('livingCostInfo');
            remButtonLoadAddButtonPressed(event.currentTarget);
            show($('#livingCostInfo')); 
        } else {
            hide($('#livingCostInfo'));
            remButtonPressedAddButtonLoad(event.currentTarget);
        }
    });
    $('#flagBtn').on('click', (event) => {
        if($('#flagInfo').hasClass('hide')) {
            closeAllTags('flagInfo');
            remButtonLoadAddButtonPressed(event.currentTarget);
            show($('#flagInfo')); 
        } else {
            hide($('#flagInfo'));
            remButtonPressedAddButtonLoad(event.currentTarget);
        }
    });

    //-----------------------phone btns-----------------------------
    function hideAndSlide(exception) {
        if(exception !== 'phoneWeatherInfo') {
            $('#phoneWeatherInfo').addClass('hide');
            addOnLoadRemoveActive($('#phoneWeatherBtn'));
        }
        if(exception !== 'phoneCountryInfo') {
            $('#phoneCountryInfo').addClass('hide');
            addOnLoadRemoveActive($('#phoneInfoBtn'));
        }
        if(exception !== 'phoneLivingInfo') { 
            $('#phoneLivingInfo').addClass('hide');
            addOnLoadRemoveActive($('#phoneLivingBtn'));
        }
        if(exception !== 'phoneFlagInfo') {
            $('#phoneFlagInfo').addClass('hide');
            addOnLoadRemoveActive($('#phoneFlagBtn'));
        }
    }
    function showInfo(element) {
        $('#phoneTagsInfoContainer').slideDown('slow');
        $(element).removeClass('hide');

    }
    function hideInfo(element) {
        $('#phoneTagsInfoContainer').slideUp('slow');
        setTimeout(() => {
            $(element).addClass('hide');
        },400);
    }
    function addButtonActiveRemoveOnLoad(element) {
        $(element).removeClass('buttonIcons');
        $(element).addClass('buttonIconsActive');
    }
    function addOnLoadRemoveActive(element) {
        $(element).removeClass('buttonIconsActive');
        $(element).addClass('buttonIcons');
    }
    $('#phoneWeatherBtn').on('click', (event) => {
        if($('#phoneWeatherInfo').hasClass('hide')) {
            hideAndSlide('phoneWeatherInfo');
            addButtonActiveRemoveOnLoad(event.currentTarget);
            showInfo($('#phoneWeatherInfo'));
        } else {
            addOnLoadRemoveActive(event.currentTarget);
            hideInfo($('#phoneWeatherInfo'));
        }
    });
    $('#phoneInfoBtn').on('click', (event) => {
        if($('#phoneCountryInfo').hasClass('hide')) {
            hideAndSlide('phoneCountryInfo');
            addButtonActiveRemoveOnLoad(event.currentTarget);
            showInfo($('#phoneCountryInfo'));
        } else {
            addOnLoadRemoveActive(event.currentTarget);
            hideInfo($('#phoneCountryInfo'));
        }
    });
    $('#phoneLivingBtn').on('click', (event) => {
        if($('#phoneLivingInfo').hasClass('hide')) {
            hideAndSlide('phoneLivingInfo');
            addButtonActiveRemoveOnLoad(event.currentTarget);
            showInfo($('#phoneLivingInfo'));
        } else {
            addOnLoadRemoveActive(event.currentTarget);
            hideInfo($('#phoneLivingInfo'));
        }
    });
    $('#phoneFlagBtn').on('click', (event) => {
        if($('#phoneFlagInfo').hasClass('hide')) {
            hideAndSlide('phoneFlagInfo');
            addButtonActiveRemoveOnLoad(event.currentTarget);
            showInfo($('#phoneFlagInfo'));
        } else {
            addOnLoadRemoveActive(event.currentTarget);
            hideInfo($('#phoneFlagInfo'));
        }
    });
});
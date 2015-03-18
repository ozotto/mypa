/*----- Config TimeLine ------ */  
  //Value Defaults
  var defaultsTimeline = function () {
    var defaults =  {
        orientation: ['top', 'bottom'],
        autoResize: [true, false],
        showCurrentTime: [true, false],
        showCustomTime: [true, false],
        showMajorLabels: [true, false],
        showMinorLabels: [true, false],
        align: ['left', 'center', 'right'],
        stack: [true, false],

        moveable: [true, false],
        zoomable: [true, false],
        selectable: [true, false],
        editable: [true, false]
    };
    return defaults;
  };
    
  //Options Timeline
  var optionsTimeline = function(){
    return options = {
        align: 'center', 
        autoResize: true, 
        editable: false,
        selectable: true,
        orientation: ['top', 'bottom'],
        showCurrentTime: true,
        showCustomTime: true,
        showMajorLabels: true,
        showMinorLabels: true,
        zoomMin: 1000 * 60 * 60 * 24
        /*zoomMax: 1000 * 60 * 60 * 24 * 31 * 3*/
    };
  };

  //Load data example
  var sampleData = function (visDataSet) {
    var date = moment().format();
    return visDataSet([
      { id: 0,
        content: 'Empty',
        start: date 
      }
    ]);
  };

  //Values SelectOption order Timeline
  var valueSelectOption = function () {
    var values = [
      {name:'All categories', value:1},
      {name:'Sort up', value:2},
      {name:'Sort Down', value:3},
      {name:'More articles', value:4}
    ];
    return values;
  };

  

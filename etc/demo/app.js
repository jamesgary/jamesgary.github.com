Number.prototype.padZero= function(len){
 var s= String(this), c= '0';
 len= len || 2;
 while(s.length < len) s= c + s;
 return s;
}

$(function() {
  $('#well_sites div[data-role="content"] a, #farm_sites div[data-role="content"] a').click(function() {
    var site_name = $(this).text();
    $('.site_name').text(site_name);
    $('.site_name.singular').text(site_name.substring(0, site_name.length - 1));
  });

  $('#well_site div[data-role="content"] a, #farm_site div[data-role="content"] a').click(function() {
    var station_name = $(this).text();
    $('.station_name').text(station_name);
  });

  var currentdate = new Date();
  var date = ""
    + (currentdate.getMonth()+1)  + "/"
    + currentdate.getDate() + "/"
    + currentdate.getFullYear();
  var hours = currentdate.getHours();
  var time = ""
    + (hours > 12 ? (hours - 12) : hours) + ":"
    + currentdate.getMinutes().padZero() + " "
    + (hours >= 12 ? "PM" : "AM");

  $('.current_time').text(time + " " + date);
  $('.current_date').text(date);

  $(".override_time").hide();
  $(".override").click(function() {
    $(".override_time").show();
    $(".natural_time").hide();
  });
  $(".undo").click(function() {
    $(".override_time").hide();
    $(".natural_time").show();
  });

  $('.timestamp').timepicker();
});

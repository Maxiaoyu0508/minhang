
function activityDetails(id) {
    $.get(basePath + "/activityDetails.htm?m=" + Math.random(), {
        "item.id": id,
    }, function (data) {
        if (data.status == "SUCCESS") {
         var name = data.name;
         $("#activityNmae").html(name);
         $("#activityAddress").html(data.address);
         $("#activityHtmlDesc").html(data.htmlDesc);
         var details = data.id;
            $("#activityQrcode").attr("src", basePath + "/qrcode/generate.htm?replace=*&content=/activityDetails.htm?item.id="+details+"");
            alert(data.timeBegin)
          var yy =  data.timeBegin.toString().substring(0,5);
          var mm =  data.timeBegin.toString().substring(5,9);
          var dd = data.timeBegin.toString().substring(9,10);
          $("#activityTimeBegin").html(yy + mm + dd);
            var y =  data.timeEnd.toString().substring(0,5);
            var m = data.timeEnd.toString().substring(5,9);
            var d = data.timeEnd.toString().substring(9,10);
               if(y == yy){
                $("#activityTimeEnd").html(m + d);
            }else {
                $("#activityTimeEnd").html(y + m + d);
            }
           $("#activityEnroll").html(data.activityEnroll);
        }

    });

}
import $ from 'jquery';
$(document).ready(function () {

    $("#li2a").click(function(){
        $("#li1").removeClass("active");
        $("#li2").addClass("active");
        $("#li3").removeClass("active");
        $("#li5").removeClass("active");
        $("#li4").removeClass("active");
        $("#li6").removeClass("active");
    });
    $("#li3a").click(function(){
        $("#li1").removeClass("active");
        $("#li2").removeClass("active");
        $("#li3").addClass("active");
        $("#li4").removeClass("active");
        $("#li5").removeClass("active");
        $("#li6").removeClass("active");
    });
    $("#li1a").click(function(){
        $("#li2").removeClass("active");
        $("#li3").removeClass("active");
        $("#li1").addClass("active");
        $("#li5").removeClass("active");
        $("#li4").removeClass("active");
        $("#li6").removeClass("active");
    });
    $("#li5a").click(function(){
        $("#li2").removeClass("active");
        $("#li3").removeClass("active");
        $("#li5").addClass("active");
        $("#li1").removeClass("active");
        $("#li6").removeClass("active");
        $("#li4").removeClass("active");
    });
    $("#li4a").click(function(){
        $("#li2").removeClass("active");
        $("#li3").removeClass("active");
        $("#li4").addClass("active");
        $("#li1").removeClass("active");
        $("#li5").removeClass("active");
        $("#li6").removeClass("active");
    });
    $("#li6a").click(function(){
        $("#li2").removeClass("active");
        $("#li3").removeClass("active");
        $("#li6").addClass("active");
        $("#li1").removeClass("active");
        $("#li4").removeClass("active");
        $("#li5").removeClass("active");
    });

    $(".update1").click(function (){
        var userid = $(this).attr("data-id");
        // alert('h');
        $.ajax({
            url: "../Database/updateuser.php",
            type: "POST",
            data: { userid: userid },
            async: true,
            dataType: "JSON",
            success: function (data) {
                $("#u-fname").val(data.firstname);
                $("#u-lname").val(data.lastname);
                $("#u-user").val(data.username);
                let role = data.rid;
                role++;
                // alert(role);
                $("#u-role").prop('selectedIndex', role);
                // if (role == '2') {
                //     $("#u-role").prop('selectedIndex', 2);
                // }
                // if (role == '3') {
                //     $("#u-role").prop('selectedIndex', 3);
                // }
                $("#updatetable").modal('show');
            }
        });
    });

    $("#done1").click(function(){

        var ufname = $('#u-fname').val();
        var ulname = $('#u-lname').val();
        var username = $('#u-user').val();
        var urole = $('#u-role').val();
        $.ajax({
            url: "../Database/updateuser.php",
            type: "post",
            data: { ufname: ufname, ulname: ulname, username: username, urole: urole },
            success: function (data) {
                // alert("done");
                $("#updatetable").modal('hide');
                // $('#users').tabs('select', 1);
            }, error: function () {
                alert('error');
            }
        });
    });

    $(".del").click(function(){
        var del = $(this);
        var id = $(this).attr("data-id");
        // alert(id);
        $.ajax({
            url: "../Database/deleteuser.php",
            type: "post",
            data: { id: id },
            success: function (d) {
                del.closest("tr").hide();
            }
        });
    });

    $("#cancel-btn").click(function (){
        $("#updatetable").modal('hide');
    })    
})

function update(rid){

    let s="";
    $('.get_roles'+rid).each(function(){
        if($(this).is(":checked")){
            s+= $(this).val();
            s+=",";
        }
    });
    s = s.slice(0, -1);
    $.ajax({
        url : "../Database/update.php",
        method:"GET",
        data:{
            roles:s,id:rid
        },
        success:function(data){
            alert('Successfully Updated!!');
        }
    });

}

function newr(i){

    let s="";
    let id=i;
    let r1=$('#rolename').val();
    let r2=$('#roled').val();
    // alert(r1);
    $('.get_roles1'+id).each(function(){
        if($(this).is(":checked")){
            s+="m1-";
            s+= $(this).val();
            s+=",";
        }
    });
    id++;
    $('.get_roles2'+id).each(function(){
        if($(this).is(":checked")){
            s+="m2-";
            s+= $(this).val();
            s+=",";
        }
    });
    id++;
    $('.get_roles3'+id).each(function(){
        if($(this).is(":checked")){
            s+="m3-";
            s+= $(this).val();
            s+=",";
        }
    });
    s = s.slice(0, -1);
    // alert(s);

    $.ajax({
        url : "../Database/insertNewRecord.php",
        method:"GET",
        data:{
            r1:r1,r2:r2,s:s
        },
        success:function(data){
            // alert(data);
            alert('Successfully Updated!!');
        }
    });

}

$(".updaterole1").click(function (){
    var roleid = $(this).attr("data-id");
    $.ajax({

        url: "../Database/update.php",
        type: "POST",
        data: { roleid: roleid },
        async: true,
        success: function (data) {
            data = JSON.parse(data);
            $("#pform").trigger("reset");
            // alert(data.role);
            $("#rolename1").val(data.role);
            $("#roleinfo").val(data.roleinfo);
            var permission = data.permisions.split(",");
            $.each(permission, function (index,value) {
                if (value == "m1-0") {
                    $("#m1-u").prop('checked', true);
                }
                if (value == 'm1-1') {
                    $("#m1-v").prop('checked', true);
                }
                if (value == 'm1-2') {
                    $("#m1-d").prop('checked', true);
                }
                if (value == 'm2-0') {
                    $("#m2-u").prop('checked', true);
                }
                if (value == 'm2-1') {
                    $("#m2-v").prop('checked', true);
                }
                if (value == 'm2-2') {
                    $("#m2-d").prop('checked', true);
                }
                if (value == 'm3-0') {
                    $("#m3-u").prop('checked', true);
                }
                if (value == 'm3-1') {
                    $("#m3-v").prop('checked', true);
                }
                if (value == 'm3-2') {
                    $("#m3-d").prop('checked', true);
                }
            });
            $('#updaterole').modal('show');
        }
    });
    $('#datatable').DataTable();

});

$("#savepermission").click(function(){

    var rname = $('#rolename').val();
    var rinfo = $('#roleinfo').val();
    var permission = [];
    $('.get_permission').each(function () {
        if ($(this).is(":checked")) {
            permission.push($(this).val());
        }
    });
    permission = permission.toString();
    $.ajax({
        url: "../Database/update.php",
        type: "post",
        data: { rname: rname, rinfo: rinfo, permission: permission},
        success: function (data) {
            // alert("done");
            $(".updaterole").modal('hide');
            $("#pform").trigger("reset");
        }, error: function () {
            alert('error');
        }
    });
});

$(".del1").click(function(){
    var del = $(this);
    var id = $(this).attr("data-id");
    $.ajax({
        url: "../Database/deleteuser.php",
        type: "post",
        data: { delid: id,},
        success: function (d) {
            // alert(d);
            if(d=="done") {
                del.closest("tr").hide();
            }
        }
    });
});




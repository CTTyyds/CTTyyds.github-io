//通用网页跳转选择窗口
function selectdes(){
    if (document.body.offsetWidth<500){
        new swal({
            title: 'Please select your destination',
            type: 'info',
            icon: 'info',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText:
                'LAPTOP BOOKING REPAIR',
            cancelButtonText:
                'JOB SHEET',
        }).then(function(result){
            if(result.value){
                window.location.href = "../subpage/booking.html";
            }else if(result.dismiss == 'cancel'){
                window.location.href = "../subpage/jobsheet.html"
            }
        });
    }
}

//如已经在当前页面还要点击跳转当前页面就提示
function currentpage() {
    new swal({
        title: 'Already on the current page!',
        icon: 'warning',
    });
}
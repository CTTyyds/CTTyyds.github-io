const Phonelist = [{"iphone 14 Pro Max": 275}, {"Other Phone": 175}];
const Laptoplist = [{"HP Pavilion": 575}, {"Other laptops": 400}];
let customertype = "Consumer";
window.bond = 0;
window.sf = 0;
window.tot = 0;
window.gstper = 0.15;
window.gst = 0;
window.totgst = 0;
let data = {};
sumcost();

function selectcolorchange() {
    const tit = document.getElementById("tit");
    const make = document.getElementById("make");
    const FC = document.getElementById("FC");

    function changecolor(ele) {
        if (ele.selectedIndex != 0) {
            ele.style.color = 'black';
        } else {
            ele.style.color = 'red';
        }
    }

    changecolor(tit);
    changecolor(make);
    changecolor(FC);
}

function ctchange() {
    let typearr = document.getElementsByName("Customer-Type");
    for (let i = 0; i < typearr.length; i++) {
        if (typearr[i].checked) {
            let type = typearr[i].value;
            changetit(type);
            changeoption(type);
            additem("");
            customertype = type;
        }
    }
}

function addtotable() {
    const dl = document.querySelector("#device-list");
    if (dl.selectedIndex != 0) {
        const optionstext = dl.options[dl.selectedIndex].text;
        let cost = 0;
        if (customertype == "Consumer") {
            for (var i = 0; i < Phonelist.length; i++) {
                if (optionstext in Phonelist[i]) {
                    cost = Phonelist[i][optionstext];
                    window.bond += cost;
                    window.bond += 30;
                    sumcost();
                }
            }
            additem({device: optionstext, cost: cost});

        } else if (customertype == "Business") {
            for (var i = 0; i < Laptoplist.length; i++) {
                if (optionstext in Laptoplist[i]) {
                    cost = Laptoplist[i][optionstext];
                }
            }
            additem({device: optionstext, cost: cost})

        }
    } else {
        new swal({
            title: 'Please select one device!',
            icon: 'warning'
        });
    }
}

function extra_selectdes() {
    if (document.body.offsetWidth < 500) {
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
        }).then(function (result) {
            if (result.value) {
                currentpage();
            } else if (result.dismiss == 'cancel') {
                window.location.href = "../subpage/jobsheet.html"
            }
        });
    }
}

const cttit = {
    data() {
        return {
            msg: 'Courtesy Phone',
        }
    }, mounted() {
        window.changetit = this.changetit;
    }, methods: {
        changetit(type) {
            if (type == "Business") {
                this.msg = "Courtesy Laptop"
                window.bond = 0
                sumcost();
            } else {
                this.msg = "Courtesy Phone"
            }
        }
    }
}

const de_list = {
    data() {
        return {
            items: [{message: "iphone 14 Pro Max"}, {message: 'Other Phone'}]
        }
    }, mounted() {
        window.changeoption = this.changeoption;
    }, methods: {
        changeoption(type) {
            if (type == "Business") {
                this.items = [{message: "HP Pavilion"}, {message: 'Other laptops'}]
            } else {
                this.items = [{message: "iphone 14 Pro Max"}, {message: 'Other Phone'}]
            }
        }
    }
}

const table_list = {
    data() {
        return {
            items: []
        }
    }, mounted() {
        window.additem = this.additem
    }, methods: {
        additem(itemarr) {
            if (itemarr != "") {
                this.items[this.items.length] = itemarr;
                this.items[this.items.length] = {device: 'Charger', cost: 30};
                let device_li = []
                let device_cost = []
                for (let i = 0; i < this.items.length; i++) {
                    device_li[device_li.length] = this.items[i]["device"];
                    device_cost[device_cost.length] = this.items[i]["cost"];
                }
                data["device_li"]=device_li;
                data["device_cost"]=device_cost;
            } else {
                this.items = []
            }
        }
    }
}
Vue.createApp(cttit).mount('#Courtesy-Type');
Vue.createApp(de_list).mount('#device-list');
Vue.createApp(table_list).mount('#Courtesy-Table');


function addZero(n) {
    return parseInt(n) >= 10 ? n.toString() : '0' + n;
}

let dateNow = new Date(),
    yearNow = dateNow.getFullYear(),
    monthNow = dateNow.getMonth() + 1,
    dayNow = dateNow.getDate(),
    maxDate = yearNow + '-' + addZero(monthNow) + '-' + addZero(dayNow);
let inp = document.querySelector("#PD");
inp.setAttribute('max', maxDate);


function PDchange() {
    document.getElementById("PD").style.color = "black";
    let RD = document.querySelector("#RD");
    if (inp.value != '') {
        RD.removeAttribute('disabled');
        let minRD = new Date(inp.value);
        const minRD_1 = new Date(minRD.setDate(minRD.getDate() + 1));
        const year = minRD_1.getFullYear();
        const month = minRD_1.getMonth() + 1;
        const day = minRD_1.getDate();
        const minDate = year + '-' + addZero(month) + '-' + addZero(day) + "T00:00";
        RD.setAttribute('min', minDate);
    } else {
        RD.setAttribute('disabled', 'disabled');
    }
    if (RD.value != "") {
        RDchange();
    }
}


function RDchange() {
    let RDdate = document.getElementById("RD").value;
    let PDdate = document.getElementById("PD").value;
    document.getElementById("RD").style.color = "black";
    RDdate = new Date(RDdate);
    PDdate = new Date(PDdate);
    const RDyear = RDdate.getFullYear();
    const RDmonth = RDdate.getMonth();
    const RDday = RDdate.getDate();
    const PDyear = PDdate.getFullYear();
    const PDmonth = PDdate.getMonth();
    const PDday = PDdate.getDate();
    const basemonths = (RDyear - PDyear) * 12 + (RDmonth - PDmonth) + 1;
    let varmonth = 0;
    if (RDday <= PDday) {
        varmonth = -1;
    }
    let resmonth = basemonths + varmonth;
    if (resmonth > 24) {
        document.getElementById("Warrantly").checked = false;
        document.getElementById("Warrantly").disabled = true;
        Warrantlychange();
    } else {
        document.getElementById("Warrantly").checked = true;
        document.getElementById("Warrantly").disabled = false;
        Warrantlychange();
    }
}


function Warrantlychange() {
    if (document.getElementById("Warrantly").checked == true) {
        window.sf = 0;
        sumcost();
    } else {
        window.sf = 85;
        sumcost();
    }
}


function vaildinput(s_sign = true, from_submit = false) {
    let FN = document.getElementById("FN");
    let LN = document.getElementById("LN");
    let poco = document.getElementById("PoCo");
    let PN = document.getElementById("PN");
    let Email = document.getElementById("Em");
    let SN = document.getElementById("SN");
    let FNcheck = /^([a-zA-Z])*[a-zA-Z -]+$/;
    let LNcheck = /^([a-zA-Z])*[a-zA-Z -]+$/;
    let pococheck = /^(\d)\d{3}$/;
    let PNcheck = /^(\d|[+])(\d)*(-)?( )?(\d)*$/;
    let Emailcheck = /^[a-zA-Z\d_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    let SNcheck = /^([a-zA-Z\d])([a-zA-Z\d]){9}$/
    if (!(FNcheck.test(FN.value)) && s_sign == true) {
        FN.style.color = "red";
        s_sign = false;
        if (from_submit == true && FN.value == "") {
            FN.placeholder = "Please input your First Name";
        }
    } else {
        FN.style.color = "black";
    }
    if (!(LNcheck.test(LN.value))) {
        LN.style.color = "red";
        s_sign = false;
        if (from_submit == true && LN.value == "") {
            LN.placeholder = "Please input your Last Name";
        }
    } else {
        LN.style.color = "black";
    }
    if (!(pococheck.test(poco.value))) {
        poco.style.color = "red";
        if (poco.value != "") {
            s_sign = false;
        }
    } else {
        poco.style.color = "black";
    }
    if (!(PNcheck.test(PN.value))) {
        PN.style.color = "red";
        s_sign = false;
        if (from_submit == true && PN.value == "") {
            PN.placeholder = "Please input your Phone Number";
        }
    } else {
        PN.style.color = "black"
    }
    if (!(Emailcheck.test(Email.value))) {
        Email.style.color = "red";
        s_sign = false;
        if (from_submit == true) {
            Email.placeholder = "Please input your First Name";
        }
    } else {
        Email.style.color = "black"
    }
    if (!(SNcheck.test(SN.value))) {
        SN.style.color = "red";
        s_sign = false;
        if (from_submit == true && s_sign == true) {
            SN.placeholder = "Please input your Email";
        }
    } else {
        SN.style.color = "black"
    }
    return s_sign;
}



function sumcost() {
    tot = bond + sf;
    gst = tot * gstper;
    totgst = tot + gst;
    document.getElementById("Bond").value = '$' + bond;
    document.getElementById("SF").value = '$' + sf;
    document.getElementById("Total").value = '$' + tot;
    document.getElementById("GST").value = '$' + gst;
    document.getElementById("Total_with_GST").value = '$' + totgst;
}


function submitall() {
    let s_sign = true
    s_sign = vaildinput(s_sign, false);
    let FN = document.getElementById("FN");
    let LN = document.getElementById("LN");
    let poco = document.getElementById("PoCo");
    let PN = document.getElementById("PN");
    let Email = document.getElementById("Em");
    let SN = document.getElementById("SN");
    let tit = document.getElementById("tit");
    if (tit.selectedIndex == 0) {
        s_sign = false;
    }
    let make = document.getElementById("make");
    if (make.selectedIndex == 0) {
        s_sign = false;
    }
    let fc = document.getElementById("FC")
    if (fc.selectedIndex == 0) {
        s_sign = false;
    }
    let St = document.getElementById("St");
    if (St.value == ""){
        s_sign = false;
        St.placeholder = "Please input your Street";
    }
    let city = document.getElementById("Ci");
    if (city.value == ""){
        s_sign = false;
        city.placeholder = "Please input your City";
    }
    let pd = document.getElementById("PD");
    if (pd.value == ""){
        s_sign = false;
        pd.style.color = "red";
    }
    let rd = document.getElementById("RD");
    if (rd.value == ""){
        s_sign = false;
        rd.style.color = "red";
    }
    let des = document.getElementById("Desc");
    if (des.value == ""){
        s_sign = false;
        des.placeholder = "Please input your Description";
    }
    let typearr = document.getElementsByName("Customer-Type");
    for (let i = 0; i < typearr.length; i++) {
        if (typearr[i].checked) {
            let type = typearr[i].value;
            data["Customer-Type"] = type;
        }
    }
    let Su = document.getElementById("Su");
    let MN = document.getElementById("MN")
    data["tit"] = tit.options[tit.selectedIndex].text;
    data["FN"] = FN.value;
    data["LN"] = LN.value;
    data["St"] = St.value;
    data["Su"] = Su.value;
    data["Ci"] = city.value;
    data["PoCo"] = poco.value;
    data["PN"] = PN.value;
    data["Email"] = Email.value;
    data["PD"] = pd.value;
    data["RD"] = rd.value;
    data["Warrantly"] = document.getElementById("Warrantly").checked;
    data["SN"] = SN.value;
    data["Make"] = make.options[make.selectedIndex].text;
    data["MN"] = MN.value;
    data["FC"] = fc.options[fc.selectedIndex].text;
    data["Desc"] = des.value;
    data["Bond"] = window.bond;
    data["SF"] = window.sf;
    data["tot"] = window.tot;
    data["gst"] = window.gst;
    data["tot_w_gst"] = window.totgst;
    if (data["bid"] == null){
        data["bid"] = 100000000;
    }else {
        data["bid"] += 1;
    }
    console.log(data);
    if (s_sign == true){
        Swal.fire({
            title: "Submit Confirm",
            text: "Make sure you have written the right infomation",
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
        }).then(function (isConfirm) {
            if (isConfirm.value) {
                localStorage.obj = JSON.stringify(data);
                window.location.href = "../subpage/jobsheet.html"
            }
        });
    }else {
        new swal({
            icon:'error',
            title:'Oops',
            text:'Something Wrong'
        });
    }
}
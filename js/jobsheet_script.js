let strl = localStorage.obj;
let jsondata = [];
if (strl != undefined){
    jsondata = JSON.parse(strl);
}
let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


function addZero(n) {
    return parseInt(n) >= 10 ? n.toString() : '0' + n;
}

const AD = {
    data() {
        return {
            costs: 0
        }
    }, mounted() {
        window.gettot = this.gettot;
    }, methods: {
        gettot() {
            this.costs = jsondata.tot_w_gst
        }
    }
}


const cust = {
    data() {
        return {
            tit: "tit",
            FN: "FN",
            LN: "LN",
            Street: "Street",
            Suburb: "Suburb",
            city: "City",
            PoCo: "PoCo",
            PN: "PN",
            Email: "Email"
        }
    }, mounted() {
        window.getcust = this.getcust;
    }, methods: {
        getcust() {
            this.FN = jsondata.FN;
            this.tit = jsondata.tit;
            this.LN = jsondata.LN;
            this.Street = jsondata.St;
            this.Suburb = jsondata.Su;
            this.city = jsondata.Ci;
            this.PoCo = jsondata.PoCo;
            this.PN = jsondata.PN;
            this.Email = jsondata.Email;
        }
    }
}

const RJ = {
    data() {
        return {
            JN: "JN",
            InDa: "InDa",
            PaDu: "PaDu"
        }
    }, mounted() {
        window.getRJ = this.getRJ;
    }, methods: {
        getRJ() {
            this.JN = jsondata.bid;
            let pddate = new Date(jsondata.RD);
            let datestring1 = month[pddate.getMonth()] + " " + addZero(pddate.getDate()) + "," + pddate.getFullYear() + "-" + addZero(pddate.getHours()) + ":" + addZero(pddate.getMinutes());
            this.InDa = datestring1;
            pddate.setDate(pddate.getDate() + 4);
            let datestring2 = month[pddate.getMonth()] + " " + addZero(pddate.getDate()) + "," + pddate.getFullYear();
            this.PaDu = datestring2;
        }
    }
}


const ReDe = {
    data() {
        return {
            PD: "PD",
            RD: "RD",
            UW: "UW",
            SN: "SN",
            DM: "DM",
            MN: "MN",
            FC: "FC",
            Desc: "Desc"
        }
    }, mounted() {
        window.getrede = this.getrede;
    }, methods: {
        getrede() {
            let pd = new Date(jsondata.PD);
            let pdstr = addZero(pd.getDate()) + "/" + addZero(pd.getMonth() + 1) + "/" + pd.getFullYear();
            this.PD = pdstr;
            let rd = new Date(jsondata.RD);
            let rdstr = addZero(rd.getDate()) + "/" + addZero(rd.getMonth() + 1) + "/" + rd.getFullYear() + "-" + rd.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            })
            this.RD = rdstr;
            let UWstr = "";
            if (jsondata.Warrantly == true) {
                UWstr = "yes √"
            } else {
                UWstr = "no ×"
            }
            this.UW = UWstr;
            this.SN = jsondata.SN;
            this.DM = jsondata.Make;
            this.MN = jsondata.MN;
            this.FC = jsondata.FC;
            this.Desc = jsondata.Desc;
        }
    }
}


const tabledata = {
    data() {
        return {
            items:[]
        }
    },mounted(){
        window.getdata = this.getdata;
    },methods:{
        getdata(tabledata){
            this.items = tabledata;
        }
    }
}

const total = {
    data(){
        return{
            Bond:0,
            SF:0,
            Tot:0,
            GST:0,
            Tot_w_Gst:0
        }
    },mounted(){
        window.gettots = this.gettots;
    },methods:{
        gettots(){
            this.Bond = jsondata.Bond;
            this.SF = jsondata.SF;
            this.Tot = jsondata.tot;
            this.GST = jsondata.gst;
            this.Tot_w_Gst = jsondata.tot_w_gst;
        }
    }
}
Vue.createApp(AD).mount("#AD");
Vue.createApp(cust).mount("#customer")
Vue.createApp(RJ).mount("#RJ")
Vue.createApp(ReDe).mount("#ReDe");
Vue.createApp(tabledata).mount("#c_table")
Vue.createApp(total).mount("#totals")

if (strl != undefined) {
    gettot();
    getcust();
    getRJ();
    getrede();
    let temparr = []
    for (let i = 0;i<jsondata.device_li.length;i++){
        let tempdic = {device:jsondata.device_li[i],cost:jsondata.device_cost[i]};
        temparr[i] = tempdic;
    }
    getdata(temparr);
    gettots();
}
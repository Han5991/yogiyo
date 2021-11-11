function AccountRepair(type, phoneNumber, email, accountNumber, accountStatusCode, signUpTypeCode) {
    const type2 ="webhook";
    const method = "POST";
}

function RefundSuper(type, phoneNumber, email, accountNumber) {
    const type2 ="webhook";
    const method = "POST";
}
function CancelPayment(sch10402, phone_number, restaurant_name, cancel_number, converted_date, detail_contents) {
    const type ="webhook";
    const method = "POST";
}

function CancelOrder(type, phoneNumber, restaurantName, orderNumber, cancelTypeCode) {
    const type2 ="webhook";
    const method = "POST";
}

function AccountRepair(sch10405, phone_number, email, account_phone, account_status_code, signup_type_code) {
    const type ="webhook";
    const method = "POST";
}

//매장 주문 목록 얻기
function getRestaurantOrder() {

    log('getRestaurnatOrder function is activated')

    try {

        var phone_number = getGlobal('phone_number')

        var result = RestaurantOrder(phone_number)

        if (!isEmpty(result)) {
            const current = new Date()
            var order_list = []
            for (var i = 0; i < result.length; i++) {
                log('Order' + JSON.stringify(result, null, '  '))
                if (result[i].result_key !== 'tts_processing' &&
                    result[i].result_key !== 'tts_transmitted' &&
                    result[i].result_key !== '9c_transmitted' &&
                    result[i].result_key !== 'sms_transmitted' &&
                    result[i].result_key !== 'terminal_transmitted' &&
                    result[i].result_key !== 'transmitted' &&
                    result[i].result_key !== 'Try TTS relay' &&
                    result[i].result_key !== 'TTS relay transmitted' &&
                    result[i].result_key !== '9 cookies relay transmitted' &&
                    result[i].result_key !== 'Order Transmitted') {
                    continue;
                }
                var this_order = {}
                if (result[i].hasOwnProperty('submitted_at')) {
                    var submitted_at = result[i]['submitted_at']
                    const submittedDate = new Date(submitted_at)
                    const diff = Math.floor((current - submittedDate) / (1000*60*60))
                    if (diff >= 24) {
                        continue;
                    }
                    this_order['submitted_at'] = submitted_at

                }
                if (result[i].hasOwnProperty('ordered_items')) {
                    var ordered_items = result[i]['ordered_items']
                    this_order['ordered_items'] = ordered_items

                }
                if (result[i].hasOwnProperty('total_price')) {
                    var total_price = result[i]['total_price']
                    this_order['total_price'] = total_price

                }
                if (result[i].hasOwnProperty('order_number')) {
                    var order_number = result[i]['order_number']
                    this_order['order_number'] = order_number
                }

                order_list.push(this_order)
            }

            if(order_list.length != 0){
                setGlobal('order_list', order_list)
                return 'true'
            }else{
                log('getRestaurantOrder function result : order_list is empty')
                return 'false'
            }

        } else {
            log('getRestaurant function result : webhook result is empty ')
            return 'false'
        }

    } catch (e) {

        log('getRestaurant try catch error : ')
        log(e)
        return 'false'
    }

}

//환불 결과 알려주기 boolean
function getRefundResult() {
    function getUserId () {
        if (hermes_context.hasOwnProperty('kakao') &&
            hermes_context.kakao.hasOwnProperty('id')) {
            return hermes_context.kakao.id
        }
        return undefined
    }

    function getRefundResult(phone_number, email, account_phone) {

        log('getCancelApproveResult function is activated')
        const user_id = getUserId()
        const debugInfos = []
        const now = new Date().toISOString()

        try {

            var result = RefundSuper("SCH10404", phone_number, email, account_phone)
            debugInfos.push({
                timestamp: now,
                type: '슈퍼클럽환불',
                user_id,
                entity_type: 'SCH10404',
                entity_phoneNumber: phone_number,
                entity_email: email,
                entity_accountNumber: account_phone,
                result: !isEmpty(result) && result.hasOwnProperty('entityStatus')
            })
            log('Refund result : ')
            log(JSON.stringify(result, null, ' '))

            if (!isEmpty(result)) {

                if (result.hasOwnProperty('entityStatus') === true) {

                    setGlobal('debug_infos', debugInfos)
                    return 'true'

                } else {
                    log('getRefundResult function result : webhook result is not valid')
                    setGlobal('debug_infos', debugInfos)
                    return 'false'
                }

            } else {
                log('getRefundResult function result : webhook result is empty')
                setGlobal('debug_infos', debugInfos)
                return 'false'
            }


        } catch (e) {
            debugInfos.push({
                timestamp: now,
                type: '슈퍼클럽환불',
                user_id,
                result: 'getRefundResult try catch error'
            })
            setGlobal('debug_infos', debugInfos)

            log('getRefundResult function try catch error : ')
            log(e)
            return 'false'

        }

    }

}

//계정 결과 가져오기 boolean
function getAccountResult(phone_number, email, account_phone, account_type, signup_type) {

    log('getAccountResult function is activated')
    const user_id = getUserId()
    const debugInfos = []
    const now = new Date().toISOString()

    try {

        var account_map = {
            '휴면 계정': 'SCH10601',
            '탈퇴 계정': 'SCH10602'
        }

        var signup_map = {
            '일반 이메일': 'SCH10701',
            '네이버로 로그인': 'SCH10702',
            '카카오톡으로 로그인': 'SCH10703',
            '애플로 로그인': 'SCH10704'
        }

        var account_status_code = account_map[account_type]
        var signup_type_code = signup_map[signup_type]

        var result = AccountRepair("SCH10405", phone_number, email, account_phone, account_status_code, signup_type_code)
        debugInfos.push({
            timestamp: now,
            type: '계정복구',
            user_id,
            entity_type: 'SCH10405',
            entity_phoneNumber: phone_number,
            entity_email: email,
            entity_accountNumber: account_phone,
            entity_accountStatusCode: account_status_code,
            entity_signUpTypeCode: signup_type_code,
            result: !isEmpty(result) && result.hasOwnProperty('entityStatus')
        })
        log('Account result : ')
        log(JSON.stringify(result, null, ' '))

        if (!isEmpty(result)) {

            if (result.hasOwnProperty('entityStatus') === true) {

                setGlobal('debug_infos', debugInfos)
                return 'true'

            } else {
                log('getAccountResult function result : webhook result is not valid')
                setGlobal('debug_infos', debugInfos)
                return 'false'
            }

        } else {
            log('getAccountResult function result : webhook result is empty')
            setGlobal('debug_infos', debugInfos)
            return 'false'
        }


    } catch (e) {
        debugInfos.push({
            timestamp: now,
            type: '계정복구',
            user_id,
            result: 'getAccountResult try catch error'
        })
        setGlobal('debug_infos', debugInfos)

        log('getAccountResult function try catch error : ')
        log(e)
        return 'false'

    }

}

//주문 취소 결과 얻기 boolean
function getCancelOrderResult(phone_number, restaurant_name, cancel_number, cancel_cause) {

    log('getCancelOrderResult function is activated')
    const user_id = getUserId()
    const debugInfos = []
    const now = new Date().toISOString()

    try {
        log('Cancel order ' + phone_number)
        log('Cancel order ' + restaurant_name)
        log('Cancel order ' + cancel_number)
        log('Cancel order ' + cancel_cause)
        var result = CancelOrder("SCH10401", phone_number, restaurant_name, cancel_number, cancel_cause)
        debugInfos.push({
            timestamp: now,
            type: '주문취소',
            user_id,
            entity_type: 'SCH10401',
            entity_phoneNumber: phone_number,
            entity_restaurantName: restaurant_name,
            entity_orderNumber: cancel_number,
            entity_cancelTypeCode: cancel_cause,
            result: !isEmpty(result) && result.hasOwnProperty('entityStatus')
        })
        log('CancelOrder result : ')
        log(JSON.stringify(result, null, ' '))

        if (!isEmpty(result)) {

            if (result.hasOwnProperty('entityStatus') === true) {

                setGlobal('debug_infos', debugInfos)
                return 'true'

            } else {
                log('getCancelOrderResult function result : webhook result is not valid')
                setGlobal('debug_infos', debugInfos)
                return 'false'
            }

        } else {
            log('getCancelOrderResult function result : webhook result is empty')
            setGlobal('debug_infos', debugInfos)
            return 'false'
        }


    } catch (e) {
        debugInfos.push({
            timestamp: now,
            type: '주문취소',
            user_id,
            result: 'getCancelOrderResult try catch error'
        })
        setGlobal('debug_infos', debugInfos)

        log('getCancelOrderResult function try catch error : ')
        log(e)
        return 'false'

    }

}

//오배달 결제 취소 결과 리턴 boolean
function getCancelPaymentResult() {
    function getCancelPaymentResult(phone_number, restaurant_name, cancel_number, order_date, detail_contents) {

        log('getCancelPaymentResult function is activated')
        const user_id = getUserId()
        const debugInfos = []
        const now = new Date().toISOString()

        try {

            var converted_date = order_date.split('일')[0]
            converted_date = converted_date.replace('년 ', '-')
            converted_date = converted_date.replace('월 ', '-')
            converted_date = converted_date.replace('"', '')
            converted_date = converted_date.toString() + 'T00:00:00.000Z'

            log('phone_number : ' + phone_number)
            log('restaurant_name : ' + restaurant_name)
            log('cancel_number : ' + cancel_number)
            log('converted_date : ' + converted_date)
            log('detail_contents : ' + detail_contents)

            var result = CancelPayment("SCH10402", phone_number, restaurant_name, cancel_number, converted_date, detail_contents)
            debugInfos.push({
                timestamp: now,
                type: '오배달누락 결제취소',
                user_id,
                entity_type: 'SCH10402',
                entity_phoneNumber: phone_number,
                entity_restaurantName: restaurant_name,
                entity_orderNumber: cancel_number,
                entity_orderDate: converted_date,
                entity_detailContents: detail_contents,
                result: !isEmpty(result) && result.hasOwnProperty('entityStatus')
            })
            log('CancelPayment result : ')
            log(JSON.stringify(result, null, ' '))

            if (!isEmpty(result)) {

                if (result.hasOwnProperty('entityStatus') === true) {

                    setGlobal('debug_infos', debugInfos)
                    return 'true'

                } else {
                    log('getCancelPaymentResult function result : webhook result is not valid')
                    setGlobal('debug_infos', debugInfos)
                    return 'false'
                }

            } else {
                log('getCancelPaymentResult function result : webhook result is empty')
                setGlobal('debug_infos', debugInfos)
                return 'false'
            }


        } catch (e) {
            debugInfos.push({
                timestamp: now,
                type: '오배달누락 결제취소',
                user_id,
                result: 'getCancelPaymentResult try catch error'
            })
            setGlobal('debug_infos', debugInfos)

            log('getCancelPaymentResult function try catch error : ')
            log(e)
            return 'false'

        }

    }

    function addZero(my_date) {

        if (my_date.length == 2) {
            return '0' + my_date[1]
        } else {
            return my_date.substr(1, 2)
        }

    }

}

//카카오 폰번호 얻기 글로벌 셋팅 및 boolean
function getKakaoPhone(){
    try{
        log('getKakaoPhone ' + JSON.stringify(hermes_context, null, '  ') )

        var phone_number = hermes_context.kakao_profile.phone_number

        if(hermes_context.hasOwnProperty('kakao_profile')){
            if(hermes_context['kakao_profile'].hasOwnProperty('phone_number')){
                if(phone_number !== undefined){
                    phone = '0' + phone_number.split(' ')[1]
                    setGlobal('phone_number', phone)
                    return phone
                }else{
                    log('getKakaoPhone result : phone_number is undefined')
                    return 'false'
                }
            }else{
                log('getKakaoPhone result : no_phone_number')
                return 'false'
            }
        }else{
            log('getKakaoPhone result : no_profile')
            return 'false'
        }

    }catch(e){

        log('getKakaoPhone try catch error : ')
        log(e)
        return 'false'

    }

}

//개인정보 동의 말해주기
function sayInfoAgree() {

    var task = getGlobal('task')
    var message = '[개인정보 수집/이용 동의 안내]'

    message += '\n\n1. 수집 및 이용 목적'
    message += '\n - 챗봇 서비스 제공 및 이용에 따른 본인확인 등'
    message += '\n2. 수집하는 항목'

    if (task == '슈퍼클럽 환불 신청') {
        message += '\n - 이메일 주소, 연락처'
    } else if (task == '계정 복구 요청') {
        message += '\n - 이메일 주소, 연락처'
    } else {
        message += '\n - 연락처'
    }

    message += '\n3. 개인정보의 보유 및 이용기간'
    message += '\n - 3년'
    message += '\n\n* 동의를 거부하실 수 있으나, 이 경우 요기요(고객) 챗봇 서비스 이용에 제한이 있을 수 있습니다.'

    return createTextFormat([message])

}

//대답 포맷 생성
function createAnswerFormat() {
    function createAnswerFormat(){}

    function createTextFormat(texts) {
        if (!Array.isArray(texts)) {
            return
        }
        for (var i in texts) {
            if (!isString(texts[i])) {
                return
            }
        }
        return { "textFormat": { "texts": texts } }
    }

    function createButtonsFormat(buttons) {
        if (!Array.isArray(buttons)) {
            return
        }

        return {'buttonsFormat' : {"buttons": buttons}}
    }

    function createTextButton(display_text, reaction_text){

        if(reaction_text.indexOf('http') == -1){
            return {
                "display_text" : display_text,
                "reaction" : {
                    "text": reaction_text
                }
            }
        }else{
            return {
                "display_text" : display_text,
                "reaction" : {
                    "url": reaction_text
                }
            }
        }



    }

    function createCarousel(cards) {
        if (!Array.isArray(cards)) {
            return
        }

        for (var i in cards) {
            if (cards[i] && 'cardFormat' in cards[i]) {
                cards[i] = cards[i]['cardFormat']
            }
        }

        return {
            carouselFormat: {
                cards: cards
            }
        }
    }

    function createCard(title, bodyText, imageUrl, buttons) {

        var card = {}

        card['title'] = title
        card['bodyText'] = bodyText

        if(imageUrl != ''){
            card['imageUrl'] = {
                'displayType': 1,
                'url': imageUrl,
            }
        }
        if(buttons != ''){
            card['buttons'] = buttons
        }


        return card
    }

    function createCardFormat(title, bodyText, imageUrl, buttons) {
        return {
            cardFormat: createCard(title, bodyText, imageUrl, buttons)
        }
    }

    function isString(value) {
        return typeof value === 'string' || value instanceof String
    }

    function isNumber (value) {
        return typeof value === 'number' && isFinite(value);
    }

}

//코드인증상태 체크 boolean
function checkVerificationCode (phone_number, verificationCode) {
    try {
        const result = CheckVericode(phone_number, verificationCode)
        log('check verification code' + JSON.stringify(result))
        if (result.result === 'true') {
            return 'true'
        }
        if (result.result === 'false') {
            return 'false'
        }
        if (result.result === 'expire') {
            return 'expire'
        }
        if (result.result === 'too_many_trials') {
            return 'too_many_trials'
        }
    } catch (e) {
        log('Failed ot check verificationCode' + e)
    }
    return 'error'
}

//
function sendVerificationCode (phone_number) {
    try {
        const result = SendVericode(phone_number, "chatbot")
        if (result.result === 'banned_number') {
            return 'banned_number'
        } else if (result.result === 'invalid_number') {
            return 'invalid_number'
        } else if (result.result === 'sms_error') {
            return 'error'
        }

        const sendCount = parseInt(result.result)
        log('Send verification code count' + sendCount)
        return 'true'
    } catch (e) {
        log("Failed to send verification" + e)
    }
    return 'error'
}

function RestaurantOrderMock(phone){

    return {
        "items": [
            {
                "payment_method": "",
                "restaurant_phone": "1111-1111",
                "total_price": 0,
                "submitted_at": "",
                "order_number": "",
                "company_number": "",
                "discounts": {
                    "coupon": 0,
                    "delivery": 0,
                    "superclub": 0,
                    "restaurant": 0
                },
                "ordered_items": [],
                "result_key": "",
                "type": "1",
                "email": null
            },
            {
                "payment_method": "",
                "restaurant_phone": "2222-2222",
                "total_price": 0,
                "submitted_at": "",
                "order_number": "",
                "company_number": "",
                "discounts": {
                    "coupon": 0,
                    "delivery": 0,
                    "superclub": 0,
                    "restaurant": 0
                },
                "ordered_items": [],
                "result_key": "",
                "type": "2",
                "email": null
            }
        ]
    }

}

function answerTest(){

    const answers = []
    const cardList = []

    var test = RestaurantOrderMock()

    answers.push(createTextFormat([
        '현재 배달 중인 가게의 연락처 입니다.'
    ]))
    for (let i = 0; i < test.items.length; i++) {
        if(test.items[i].type != '1'){
            cardList.push(createCardFormat(
                '',
                '가게명 : test1\n'+
                '가게 연락처 : '+test.items[i].restaurant_phone+'\n'+
                '가게 전화가 불가하실 경우 회원 주문 내역 내 우측 하단 상담톡 버튼을 눌러주세요',
                'https://upload.wikimedia.org/wikipedia/commons/7/70/Rec_restaurant_phonecall.png',
                [
                    createTextButton('처음으로', '처음으로')
                ]
            ))
        }

    }
    answers.push(createCarousel(cardList));

    log('Answers' + JSON.stringify(answers, null, '  '))
    return answers

}
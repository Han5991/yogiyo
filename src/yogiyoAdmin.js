function log(s) {
    return s;
}

//
function YogiyoImage(chatbot_type, telno, ceo_name, shop_name, bl_number, explanation_type, explanation_list) {
    const type ="webhook";
    const method = "POST";
}

//보이스 코드 보내기
function SendVericode(phone_number, context) {
    const type ="webhook";
    const method = "POST";
}

//보이스 코드 체크
function CheckVericode(phone_number, code) {
    const type ="webhook";
    const method = "POST";
}

//배달 장소 수정
function DeliveryPlaceEdit(chatbot_type, telno, ceo_name, shop_name, bl_number, explanation_list) {
    const type ="webhook";
    const method = "POST";
}

//매장 주문??
function RestaurantOrder(phone) {
    const type ="webhook";
    const method = "GET";
}

//????
function RestaurantSection(restaurant_id) {
    const type ="webhook";
    const method = "GET";
}

//매장 메뉴
function RestaurantMenu(restaurant_id, section_id) {
    const type ="webhook";
    const method = "GET";
}

//메뉴 수정
function EditMenu(chatbot_type, telno, ceo_name, shop_name, bl_number, explanation_list) {
    const type ="webhook";
    const method = "POST";
}

//배달 요금 수정
function DeliveryFeeEdit(chatbot_type, telno, ceo_name, shop_name, bl_number, mod_price) {
    const type ="webhook";
    const method = "POST";
}

//메뉴 삭제
function DeleteMenu(chatbot_type, telno, ceo_name, shop_name, bl_number, explanation_list) {
    const type ="webhook";
    const method = "POST";
}

//요기요 종료
function ExitYogiyo(chatbot_type, telno, ceo_name, shop_name, bl_number, cause, date) {
    const type ="webhook";
    const method = "POST";
}

function createTextFormat(strings) {
    return undefined;
}

//매장 상세 정보 가져오기
function RestaurantInfoDetail(s) {
    const type ="webhook";
    const method = "GET";
}

function RestaurantInfo(phone_number) {
    const type ="webhook";
    const method = "GET";
}

//챗봇에 접근 할 때 데이터를 수집하는 메소드로 보임
function DeviceOpen (chatbot_type, telno, ceo_name, shop_name, bl_number, callback_telno, callback_time) {
    const type ="webhook";
    const method = "POST";
}

//배달지역 수정
function DeliveryPlaceEdit(chatbot_type, telno, ceo_name, shop_name, bl_number, callback_telno, explanation_list) {
    const type ="webhook";
    const method = "POST";
}

//요기요 나가기
function ExitYogiyo(s, telno, ceo_name, shop_name, bl_number, exit_reason, exit_date) {
    const type ="webhook";
    const method = "POST";
}

//디바이스 정보 받기
function DeviceReturn(s, telno, ceo_name, shop_name, bl_number, device_phone, device_contact_time, device_reason, device_address) {
    const type ="webhook";
    const method = "POST";
}

//주문 취소
function CancelOrder(s, telno, ceo_name, shop_name, phone_no, s2, cancel_cause, bl_number) {
    const type ="webhook";
    const method = "POST";
}

//요기요 이미지 등록
function YogiyoImage(s, telno, ceo_name, shop_name, bl_number, imageMapElement, details) {
    const type ="webhook";
    const method = "POST";
}

//메뉴 삭제
function DeleteMenu(s, telno, ceo_name, shop_name, bl_number, explanation_list) {
    const type ="webhook";
    const method = "POST";
}

//메뉴 수정
function EditMenu(s, telno, ceo_name, shop_name, bl_number, explanation_list) {
    const type ="webhook";
    const method = "POST";
}

//메뉴 추가
function AddMenu(s, telno, ceo_name, shop_name, bl_number, explanation_list) {
    const type ="webhook";
    const method = "POST";
}

//휴일 설정
function SetOffDay(s, telno, ceo_name, shop_name, bl_number, day_of_weeks) {
    const type ="webhook";
    const method = "POST";
}

//휴식 시간 셋팅
function SetOffTime(chatbot_type, telno, ceo_name, shop_name, bl_number, day_of_weeks, time_start, time_end) {
    const type ="webhook";
    const method = "POST";
}

//컨텍스트에서 유저 ID가져오기
function getUserId () {
    if (hermes_context.hasOwnProperty('kakao') &&
        hermes_context.kakao.hasOwnProperty('id')) {
        return hermes_context.kakao.id
    }
    return undefined
}

//글로벌 셋팅
function setGlobal(parameter, my_value) {

    try {
        if (my_value !== null && typeof my_value !== 'undefined' && my_value !== '') {
            hermes_context[parameter] = my_value
            return "true"
        } else {
            return "false"
        }
    } catch (e) {
        log('setGlobal try catch error : ')
        log(e)
        return "false"
    }
}

//글로벌 파라미터 가져오기
function getGlobal(parameter) {
    try {
        let has_global = hermes_context.hasOwnProperty(parameter)

        if (has_global === true) {
            return hermes_context[parameter]
        } else {
            return "미수집"
        }

    } catch (e) {
        log('getGlobal try catch error : ')
        log(e)
        return "미수집"
    }

}

//배달비 무료 지역 수정 결과 받기  boolean
function getDeliveryFeeEditResult(dong, delivery_min, delivery_fee_edit, delivery_free) {

    log('getDeliveryFeeEditResult function is acitvated')
    const user_id = getUserId()
    const debugInfos = []
    const now = new Date().toISOString()

    try {

        var company_info = getGlobal('company_info')
        var telno = ''
        const phone_number = getGlobal('phone_number')
        if (phone_number !== '미수집' && phone_number !== 'false') {
            telno = phone_number
        } else {
            telno = company_info['phone']
        }
        var ceo_name = company_info['owner']
        var shop_name = company_info['restaurant_name']
        var bl_number = company_info['company_number']
        const location_type = getGlobal('location_type')

        log('telno : ' + telno)
        log('ceo_name : ' + ceo_name)
        log('shop_name : ' + shop_name)
        log('bl_number : ' + bl_number)

        var task = getGlobal('task')

        let this_policy = ''
        if (task === '배달 지역 동 단위 추가/삭제' && location_type === '배달 지역 삭제') {
            this_policy = dong
        } else {
            this_policy = dong + ',' + delivery_min + ',' + delivery_fee_edit + ',' + delivery_free
        }
        var delivery_policy = getGlobal('delivery_policy')
        log('current delivery_policy : ' + delivery_policy)
        if (delivery_policy != '미수집' && delivery_policy != []) {
            for (var i = 0; i < delivery_policy.length; i++) {
                this_policy += '|' + delivery_policy[i]
            }
        }

        log('final_policy : ' + this_policy)

        let result
        let chatbot_type
        if (task === '배달 지역 동 단위 추가/삭제') {

            if (location_type === '배달 지역 추가') {
                chatbot_type = '19'
            } else if (location_type === '배달 지역 삭제') {
                chatbot_type = '20'
            }
            result = DeliveryPlaceEdit(chatbot_type, telno, ceo_name, shop_name, bl_number, this_policy)
            debugInfos.push({
                timestamp: now,
                type: chatbot_type === '19' ? '배달지역추가' : '배달지역삭제',
                user_id,
                chatbot_type,
                telno,
                ceo_name,
                shop_name,
                bl_number,
                explanation_list: this_policy,
                result: !isEmpty(result) && result.hasOwnProperty('entityStatus')
            })

            log('DeliveryPlaceEdit result : ')
            log(JSON.stringify(result, null, ' '))
        } else if (task === '배달료/최소주문금액 변경') {
            chatbot_type = '3'
            result = DeliveryFeeEdit(chatbot_type, telno, ceo_name, shop_name, bl_number, this_policy)
            debugInfos.push({
                timestamp: now,
                type: '배달료변경',
                user_id,
                chatbot_type,
                telno,
                ceo_name,
                shop_name,
                bl_number,
                explanation_list: this_policy,
                result: !isEmpty(result) && result.hasOwnProperty('entityStatus')
            })
            log('DeliveryFeeEdit result : ')
            log(JSON.stringify(result, null, ' '))
        }

        if (!isEmpty(result)) {

            if (result.hasOwnProperty('entityStatus') === true) {

                setGlobal('debug_infos', debugInfos)
                return 'true'

            } else {
                log('getDeliveryFeeEditResult function result : webhook result is not valid')
                setGlobal('debug_infos', debugInfos)
                return 'false'
            }

        } else {
            log('getDeliveryFeeEditResult function result : webhook result is empty')
            setGlobal('debug_infos', debugInfos)
            return 'false'
        }

    } catch (e) {
        var type = ''
        if (chatbot_type === '19') {
            type = '배달지역추가'
        } else if (chatbot_type === '20') {
            type = '배달지역삭제'
        } else {
            type = '배달료변경'
        }

        debugInfos.push({
            timestamp: now,
            type,
            user_id,
            result: 'getDeliveryFeeEditResult try catch error'
        })
        setGlobal('debug_infos', debugInfos)
        log('getDeliveryFeeEditResult try catch error : ')
        log(e)
        return 'false'
    }
}

//사용자발화가 배달료 or 배달비 체크
function checkFAQUserSays() {
    if (user_says === '배달료' || user_says === '배달비') {
        return user_says
    }

    return 'false'
}

//빈값 확인
function isEmpty(result) {

    if( value === "" || value === null || value === undefined || value == 'false' || value === NaN || value == 'NaN' || value == '미수집' || value == []){
        return true
    }else{
        return false
    }
}

//요기요 나가기 결과 받기 boolean
function getExitYogiyoResult(exit_reason, exit_date) {

    log('getExitYogiyoResult function is acitvated')
    const user_id = getUserId()
    const debugInfos = []
    const now = new Date().toISOString()

    try {

        var company_info = getGlobal('company_info')
        var telno = ''
        const phone_number = getGlobal('phone_number')
        if (phone_number !== '미수집' && phone_number !== 'false') {
            telno = phone_number
        } else {
            telno = company_info['phone']
        }
        var ceo_name = company_info['owner']
        var shop_name = company_info['restaurant_name']
        var bl_number = company_info['company_number']

        log('telno : ' + telno)
        log('ceo_name : ' + ceo_name)
        log('shop_name : ' + shop_name)
        log('bl_number : ' + bl_number)
        log('exit_reason: ' + exit_reason)
        log('exit_date: ' + exit_date)

        var result = ExitYogiyo('13', telno, ceo_name, shop_name, bl_number, exit_reason, exit_date)
        debugInfos.push({
            timestamp: now,
            type: '전체가맹점해지',
            user_id,
            chatbot_type: '13',
            telno,
            ceo_name,
            shop_name,
            bl_number,
            cause: exit_reason,
            date: exit_date,
            result: !isEmpty(result) && result.hasOwnProperty('entityStatus')
        })

        log('ExitYogiyo result : ')
        log(JSON.stringify(result, null, ' '))

        if (!isEmpty(result)) {

            if (result.hasOwnProperty('entityStatus') === true) {

                setGlobal('debug_infos', debugInfos)
                return 'true'

            } else {
                log('getExitYogiyoResult function result : webhook result is not valid')
                setGlobal('debug_infos', debugInfos)
                return 'false'
            }

        } else {
            log('getExitYogiyoResult function result : webhook result is empty')
            setGlobal('debug_infos', debugInfos)
            return 'false'
        }

    } catch (e) {
        debugInfos.push({
            timestamp: now,
            type: '전체가맹점해지',
            user_id,
            result: 'getExitYogiyoResult try catch error'
        })
        setGlobal('debug_infos', debugInfos)
        log('getExitYogiyoResult try catch error : ')
        log(e)
        return 'false'
    }
}

// 디바이스 반납 요청 결과 받기 boolean
function getDeviceReturnResult(device_phone, device_contact_time, device_reason, device_address) {

    log('getDeviceReturnResult function is activated')
    const user_id = getUserId()
    const debugInfos = []
    const now = new Date().toISOString()
    try {

        var company_info = getGlobal('company_info')
        var telno = ''
        const phone_number = getGlobal('phone_number')
        if (phone_number !== '미수집' && phone_number !== 'false') {
            telno = phone_number
        } else {
            telno = company_info['phone']
        }
        var ceo_name = company_info['owner']
        var shop_name = company_info['restaurant_name']
        var bl_number = company_info['company_number']

        log('telno : ' + telno)
        log('ceo_name : ' + ceo_name)
        log('shop_name : ' + shop_name)
        log('bl_number : ' + bl_number)
        log('callback_telno : ' + device_phone)
        log('callback_time ; ' + device_contact_time)
        log('cause : ' + device_reason)
        log('device_address : ' + device_address)

        var result = DeviceReturn('12', telno, ceo_name, shop_name, bl_number, device_phone, device_contact_time, device_reason, device_address)
        debugInfos.push({
            timestamp: now,
            type: '단말기반납요청',
            user_id,
            chatbot_type: '12',
            telno,
            ceo_name,
            shop_name,
            bl_number,
            callback_telno: device_phone,
            callback_time: device_contact_time,
            cause: device_reason,
            address: device_address,
            result: !isEmpty(result) && result.hasOwnProperty('entityStatus')
        })
        log('DeviceReturn Result : ')
        log(JSON.stringify(result, null, ' '))

        if (!isEmpty(result)) {

            if (result.hasOwnProperty('entityStatus') === true) {

                setGlobal('debug_infos', debugInfos)
                return 'true'

            } else {
                log('getDeviceReturnResult function result : webhook result is not valid')
                setGlobal('debug_infos', debugInfos)
                return 'false'
            }

        } else {
            log('getDeviceReturnResult function result : webhook result is empty')
            setGlobal('debug_infos', debugInfos)
            return 'false'
        }

    } catch (e) {
        debugInfos.push({
            timestamp: now,
            type: '단말기반납요청',
            user_id,
            result: 'getDeviceReturnResult try catch error'
        })
        setGlobal('debug_infos', debugInfos)
        log('getDeviceReturnResult try catch error : ')
        log(e)

        return 'false'
    }

}

//디바이스 오픈 결과 받기 boolean
function getDeviceOpenResult(device_phone, device_contact_time) {
    log('getDeviceOpenResult function is activated')
    const user_id = getUserId()
    const debugInfos = []
    const now = new Date().toISOString()
    try {
        const auth_phone_number = getGlobal('phone_number')
        const companies = []
        // if (getGlobal('select_all') === 'true') {
        //   companies.push(...getGlobal('company_details'))
        // } else {
        companies.push(getGlobal('company_info'))
        // }

        for (let i = 0; i < companies.length; ++i) {
            let telno
            if (auth_phone_number !== '미수집' && auth_phone_number !== 'false') {
                telno = auth_phone_number
            } else {
                telno = companies[i]['phone']
            }
            const ceo_name = companies[i]['owner']
            const shop_name = companies[i]['restaurant_name']
            const bl_number = companies[i]['company_number']
            log('company info : ' + telno + '/' + ceo_name + '/' + shop_name + '/' + bl_number)
            log('callback_telno : ' + device_phone + '/callback_time ; ' + device_contact_time)
            var result = DeviceOpen('11', telno, ceo_name, shop_name, bl_number, device_phone, device_contact_time)
            debugInfos.push({
                timestamp: now,
                type: '단말기개통요청',
                user_id,
                chatbot_type: '11',
                telno,
                ceo_name,
                shop_name,
                bl_number,
                callback_telno: device_phone,
                callback_time: device_contact_time,
                result: !isEmpty(result) && result.hasOwnProperty('entityStatus')
            })
            log('DeviceOpen Result : ')
            log(JSON.stringify(result, null, ' '))
            if (isEmpty(result)) {
                log('getDeviceOpenResult function result : webhook result is not valid')
                setGlobal('debug_infos', debugInfos)
                return 'false'
            } else if (!result.hasOwnProperty('entityStatus')) {
                log('getDeviceOpenResult function result : webhook result is not valid')
                setGlobal('debug_infos', debugInfos)
                return 'false'
            }
        }

        setGlobal('debug_infos', debugInfos)
        return 'true'
    } catch (e) {
        debugInfos.push({
            timestamp: now,
            type: '단말기개통요청',
            user_id,
            result: 'getDeviceOpenResult try catch error'
        })
        setGlobal('debug_infos', debugInfos)
        log('getDeviceOpenResult try catch error : ')
        log(e)
        return 'false'
    }
}

//주문취소 결과 받기 boolean
function getCancelOrderResult(phone_no, cancel_number, cancel_cause) {

    log('getCancelOrderResult function is activated')
    const user_id = getUserId()
    const debugInfos = []
    const now = new Date().toISOString()

    try {

        var company_info = getGlobal('company_info')
        var telno = ''
        const phone_number = getGlobal('phone_number')
        if (phone_number !== '미수집' && phone_number !== 'false') {
            telno = phone_number
        } else {
            telno = company_info['phone']
        }
        var ceo_name = company_info['owner']
        var shop_name = company_info['restaurant_name']
        var bl_number = company_info['company_number']

        //var cancel_map = {
        //    '메뉴/가격 변동': '19',
        //    '메뉴 품절(재료 소진)': '10',
        //    '주문량 폭주': '03',
        //    '영업 시간 아님': '20',
        //    '기상 악화': '15',
        //    '배달원 부재': '20',
        //    '요청사항 적용 불가': '20',
        //    '배달 불가 지역': '08'
        //}
        //var cancel_cause_num = cancel_map[cancel_cause]

        log('telno : ' + telno)
        log('ceo_name : ' + ceo_name)
        log('shop_name : ' + shop_name)
        log('phone_no : ' + phone_no)
        log('cancel_number : ' + cancel_number)
        log('cancel_cause : ' + cancel_cause)
        log('bl_number : ' + bl_number)

        var result = CancelOrder("1", telno, ceo_name, shop_name, phone_no, String(cancel_number), cancel_cause, bl_number)
        debugInfos.push({
            timestamp: now,
            type: '주문취소',
            user_id,
            chatbot_type: '1',
            telno,
            ceo_name,
            shop_name,
            phone_no,
            cancel_number: String(cancel_number),
            cancel_cause,
            bl_number,
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

//요기요 이미지 등록 결과 받기 boolean
function getYogiyoImageResult(image_type, image_detail) {

    log('getYogiyoImageResult function is acitvated')
    const user_id = getUserId()
    const debugInfos = []
    const now = new Date().toISOString()

    try {

        var company_info = getGlobal('company_info')
        var telno = ''
        const phone_number = getGlobal('phone_number')
        if (phone_number !== '미수집' && phone_number !== 'false') {
            telno = phone_number
        } else {
            telno = company_info['phone']
        }
        var ceo_name = company_info['owner']
        var shop_name = company_info['restaurant_name']
        var bl_number = company_info['company_number']

        log('telno : ' + telno)
        log('ceo_name : ' + ceo_name)
        log('shop_name : ' + shop_name)
        log('bl_number : ' + bl_number)

        let details
        if (image_type === '메뉴 사진') {
            details = image_detail
        } else {
            details = image_detail.replace(/,/gi, '')
        }
        var image_map = {
            '대표 사진' : 'THUMBNAIL',
            '홈화면 사진' : 'HOME',
            '배경 사진' : 'BG',
            '메뉴 사진' : 'MENU'
        }

        var result = YogiyoImage('17', telno, ceo_name, shop_name, bl_number, image_map[image_type], details)
        debugInfos.push({
            timestamp: now,
            type: '요기요이미지로변경',
            user_id,
            chatbot_type: '17',
            telno,
            ceo_name,
            shop_name,
            bl_number,
            explanation_type: image_map[image_type],
            explanation: details,
            result: !isEmpty(result) && result.hasOwnProperty('entityStatus')
        })

        log('YogiyoImage result : ')
        log(JSON.stringify(result, null, ' '))

        if (!isEmpty(result)) {

            if (result.hasOwnProperty('entityStatus') === true) {

                setGlobal('debug_infos', debugInfos)
                return 'true'

            } else {
                log('getYogiyoImageResult function result : webhook result is not valid')
                setGlobal('debug_infos', debugInfos)
                return 'false'
            }

        } else {
            log('getYogiyoImageResult function result : webhook result is empty')
            setGlobal('debug_infos', debugInfos)
            return 'false'
        }



    } catch (e) {
        debugInfos.push({
            timestamp: now,
            type: '요기요이미지로변경',
            user_id,
            result: 'getYogiyoImageResult try catch error'
        })
        setGlobal('debug_infos', debugInfos)
        log('getYogiyoImageResult try catch error : ')
        log(e)
        return 'false'
    }
}

//메뉴 삭제 결과 받기 boolean
function getDeleteMenuResult() {
    log('getDeleteMenuResult function is acitvated')
    const user_id = getUserId()
    const debugInfos = []
    const now = new Date().toISOString()
    try {
        var menu_policy = getGlobal('menu_policy')
        var explanation_list = ''
        for (var i = 0; i < (menu_policy.length - 1); i++) {
            explanation_list += menu_policy[i] + '|'
        }
        explanation_list += menu_policy[menu_policy.length - 1]
        const auth_phone_number = getGlobal('phone_number')
        const companies = []
        // if (getGlobal('select_all') === 'true') {
        //   companies.push(...getGlobal('company_details'))
        // } else {
        companies.push(getGlobal('company_info'))
        // }

        for (let i = 0; i < companies.length; ++i) {
            let telno
            if (auth_phone_number !== '미수집' && auth_phone_number !== 'false') {
                telno = auth_phone_number
            } else {
                telno = companies[i]['phone']
            }
            const ceo_name = companies[i]['owner']
            const shop_name = companies[i]['restaurant_name']
            const bl_number = companies[i]['company_number']
            log('company info : ' + telno + '/' + ceo_name + '/' + shop_name + '/' + bl_number)
            var result = DeleteMenu('10', telno, ceo_name, shop_name, bl_number, explanation_list)
            debugInfos.push({
                timestamp: now,
                type: '메뉴삭제',
                user_id,
                chatbot_type: '10',
                telno,
                ceo_name,
                shop_name,
                bl_number,
                explanation_list,
                result: !isEmpty(result) && result.hasOwnProperty('entityStatus')
            })
            log('DeleteMenu result : ')
            log(JSON.stringify(result, null, ' '))
            if (isEmpty(result)) {
                log('getSetOffTimeResult function result : webhook result is not valid')
                setGlobal('debug_infos', debugInfos)
                return 'false'
            } else if (!result.hasOwnProperty('entityStatus')) {
                log('getSetOffTimeResult function result : webhook result is not valid')
                setGlobal('debug_infos', debugInfos)
                return 'false'
            }
        }

        setGlobal('debug_infos', debugInfos)
        return 'true'
    } catch (e) {
        debugInfos.push({
            timestamp: now,
            type: '메뉴삭제',
            user_id,
            result: 'getDeleteMenuResult try catch error'
        })
        setGlobal('debug_infos', debugInfos)
        log('getDeleteMenuResult try catch error : ')
        log(e)
        return 'false'
    }
}

//메뉴 수정 결과 받기 boolean
function getEditMenuResult() {
    log('getEditMenuResult function is activated')
    const user_id = getUserId()
    const debugInfos = []
    const now = new Date().toISOString()
    try {
        var menu_policy = getGlobal('menu_policy')
        var explanation_list = ''
        for (var i = 0; i < (menu_policy.length - 1); i++) {
            explanation_list += menu_policy[i] + '|'
        }
        explanation_list += menu_policy[menu_policy.length - 1]

        const auth_phone_number = getGlobal('phone_number')
        const companies = []
        // if (getGlobal('select_all') === 'true') {
        //   companies.push(...getGlobal('company_details'))
        // } else {
        companies.push(getGlobal('company_info'))
        // }

        for (let i = 0; i < companies.length; ++i) {
            let telno
            if (auth_phone_number !== '미수집' && auth_phone_number !== 'false') {
                telno = auth_phone_number
            } else {
                telno = companies[i]['phone']
            }
            const ceo_name = companies[i]['owner']
            const shop_name = companies[i]['restaurant_name']
            const bl_number = companies[i]['company_number']
            log('company info : ' + telno + '/' + ceo_name + '/' + shop_name + '/' + bl_number)
            var result = EditMenu('2', telno, ceo_name, shop_name, bl_number, explanation_list)
            debugInfos.push({
                timestamp: now,
                type: '메뉴변경',
                user_id,
                chatbot_type: '2',
                telno,
                ceo_name,
                shop_name,
                bl_number,
                explanation_list,
                result: !isEmpty(result) && result.hasOwnProperty('entityStatus')
            })

            log('EditMenu result : ')
            log(JSON.stringify(result, null, ' '))
            if (isEmpty(result)) {
                log('getAddMenuResult function result : webhook result is not valid')
                setGlobal('debug_infos', debugInfos)
                return 'false'
            } else if (!result.hasOwnProperty('entityStatus')) {
                log('getAddMenuResult function result : webhook result is not valid')
                setGlobal('debug_infos', debugInfos)
                return 'false'
            }
        }

        setGlobal('debug_infos', debugInfos)
        return 'true'
    } catch (e) {
        debugInfos.push({
            timestamp: now,
            type: '메뉴변경',
            user_id,
            result: 'getEditMenuResult try catch error'
        })
        setGlobal('debug_infos', debugInfos)
        log('getEditMenuResult try catch error : ')
        log(e)
        return 'false'
    }
}

//메뉴 추가 결과 boolean
function getAddMenuResult() {

    log('getAddMenuResult function is acitvated')
    const user_id = getUserId()
    const debugInfos = []
    const now = new Date().toISOString()
    try {

        var company_info = getGlobal('company_info')
        var telno = ''
        const phone_number = getGlobal('phone_number')
        if (phone_number !== '미수집' && phone_number !== 'false') {
            telno = phone_number
        } else {
            telno = company_info['phone']
        }
        var ceo_name = company_info['owner']
        var shop_name = company_info['restaurant_name']
        var bl_number = company_info['company_number']

        log('telno : ' + telno)
        log('ceo_name : ' + ceo_name)
        log('shop_name : ' + shop_name)
        log('bl_number : ' + bl_number)

        var menu_policy = getGlobal('menu_policy')

        var explanation_list = ''
        for(var i=0; i<(menu_policy.length - 1); i++){
            explanation_list += menu_policy[i] + '|'
        }
        explanation_list += menu_policy[menu_policy.length - 1]

        var result = AddMenu('9', telno, ceo_name, shop_name, bl_number, explanation_list)
        debugInfos.push({
            timestamp: now,
            type: '메뉴추가',
            user_id,
            chatbot_type: '9',
            telno,
            ceo_name,
            shop_name,
            bl_number,
            explanation_list,
            result: !isEmpty(result) && result.hasOwnProperty('entityStatus')
        })

        log('AddMenu result : ')
        log(JSON.stringify(result, null, ' '))

        if (!isEmpty(result)) {

            if (result.hasOwnProperty('entityStatus') === true) {

                setGlobal('debug_infos', debugInfos)
                return 'true'

            } else {
                log('getAddMenuResult function result : webhook result is not valid')
                setGlobal('debug_infos', debugInfos)
                return 'false'
            }

        } else {
            log('getAddMenuResult function result : webhook result is empty')
            setGlobal('debug_infos', debugInfos)
            return 'false'
        }



    } catch (e) {
        debugInfos.push({
            timestamp: now,
            type: '메뉴추가',
            user_id,
            result: 'getAddMenuResult try catch error'
        })
        setGlobal('debug_infos', debugInfos)
        log('getAddMenuResult try catch error : ')
        log(e)
        return 'false'
    }

}

//휴일 시간 셋팅 결과 받기 boolean
function getSetOffDayResult() {
    log('getSetOffDayResult function is activated')
    const user_id = getUserId()
    const debugInfos = []
    const now = new Date().toISOString()
    try {
        var list_days = getGlobal('list_days')
        var splited = list_days.split(',')
        var day_of_weeks = ''
        for (var i = 0; i < splited.length; i++) {
            day_of_weeks += splited[i] + '|'
        }
        var len = day_of_weeks.length
        day_of_weeks = day_of_weeks.substring(0, len - 1)

        const auth_phone_number = getGlobal('phone_number')
        const companies = []
        // if (getGlobal('select_all') === 'true') {
        // companies.push(...getGlobal('company_details'))
        // } else {
        companies.push(getGlobal('company_info'))
        // }

        for (let i = 0; i < companies.length; ++i) {
            let telno
            if (auth_phone_number !== '미수집' && auth_phone_number !== 'false') {
                telno = auth_phone_number
            } else {
                telno = companies[i]['phone']
            }
            const ceo_name = companies[i]['owner']
            const shop_name = companies[i]['restaurant_name']
            const bl_number = companies[i]['company_number']
            log('company info : ' + telno + '/' + ceo_name + '/' + shop_name + '/' + bl_number)
            log('day_of_weeks : ' + day_of_weeks)
            var result = SetOffDay('8', telno, ceo_name, shop_name, bl_number, day_of_weeks)
            debugInfos.push({
                timestamp: now,
                type: '정기휴무일변경',
                user_id,
                chatbot_type: '8',
                telno,
                ceo_name,
                shop_name,
                bl_number,
                day_of_weeks,
                result: !isEmpty(result) && result.hasOwnProperty('entityStatus')
            })
            log('SetOffDay result : ')
            log(JSON.stringify(result, null, ' '))
            log('SetOffTime result : ')
            log(JSON.stringify(result, null, ' '))
            if (isEmpty(result)) {
                log('getSetOffDayResult function result : webhook result is not valid')
                setGlobal('debug_infos', debugInfos)
                return 'false'
            } else if (!result.hasOwnProperty('entityStatus')) {
                log('getSetOffDayResult function result : webhook result is not valid')
                setGlobal('debug_infos', debugInfos)
                return 'false'
            }
        }

        setGlobal('debug_infos', debugInfos)
        return 'true'
    } catch (e) {
        debugInfos.push({
            timestamp: now,
            type: '정기휴무일변경',
            user_id,
            result: 'getSetOffDayResult try catch error'
        })
        setGlobal('debug_infos', debugInfos)
        log('getSetOffDayResult try catch error : ')
        log(e)
        return 'false'
    }
}


//영업 종료 시간 셋 결과 받기 boolean
function getSetOffTimeResult(task_name, time_start, time_end) {
    log('getSetOffTimeResult function is activated')
    const user_id = getUserId()
    const debugInfos = []
    const now = new Date().toISOString()
    try {
        const list_days = getGlobal('list_days')
        const splited = list_days.split(',')

        let day_of_weeks = ''
        for (var i = 0; i < splited.length; i++) {
            day_of_weeks += splited[i] + '|'
        }
        day_of_weeks = day_of_weeks.substring(0, day_of_weeks.length - 1)

        let chatbot_type = ''
        if (task_name == '영업시간') {
            chatbot_type = '6'
        } else {
            chatbot_type = '7'
        }

        const auth_phone_number = getGlobal('phone_number')
        const companies = []
        // if (getGlobal('select_all') === 'true') {
        //   companies.push(...getGlobal('company_details'))
        // } else {
        companies.push(getGlobal('company_info'))
        // }

        for (let i = 0; i < companies.length; ++i) {
            let telno
            if (auth_phone_number !== '미수집' && auth_phone_number !== 'false') {
                telno = auth_phone_number
            } else {
                telno = companies[i]['phone']
            }
            const ceo_name = companies[i]['owner']
            const shop_name = companies[i]['restaurant_name']
            const bl_number = companies[i]['company_number']
            log('chatbot_type : ' + chatbot_type)
            log('telno : ' + telno)
            log('ceo_name : ' + ceo_name)
            log('shop_name : ' + shop_name)
            log('bl_number : ' + bl_number)
            log('day_of_weeks : ' + day_of_weeks)
            log('start_time : ' + time_start)
            log('end_time : ' + time_end)
            var result = SetOffTime(chatbot_type, telno, ceo_name, shop_name, bl_number, day_of_weeks, time_start, time_end)
            debugInfos.push({
                timestamp: now,
                type: chatbot_type === '6' ? '영업시간변경' : '브레이크타임변경',
                user_id,
                chatbot_type,
                telno,
                ceo_name,
                shop_name,
                bl_number,
                day_of_weeks,
                start_time: time_start,
                end_time: time_end,
                result: !isEmpty(result) && result.hasOwnProperty('entityStatus')
            })

            log('SetOffTime result : ')
            log(JSON.stringify(result, null, ' '))
            if (isEmpty(result)) {
                log('getSetOffTimeResult function result : webhook result is not valid')
                setGlobal('debug_infos', debugInfos)
                return 'false'
            } else if (!result.hasOwnProperty('entityStatus')) {
                log('getSetOffTimeResult function result : webhook result is not valid')
                setGlobal('debug_infos', debugInfos)
                return 'false'
            }
        }

        setGlobal('debug_infos', debugInfos)
        return 'true'
    } catch (e) {
        debugInfos.push({
            timestamp: now,
            type: task_name === '영업시간' ? '영업시간변경' : '브레이크타임변경',
            user_id,
            result: 'getSetOffTimeResult try catch error'
        })
        setGlobal('debug_infos', debugInfos)
        log('getSetOffTimeResult try catch error : ')
        log(e)
        return 'false'
    }
}

//콘텍스트 초기화
function resetContext(){

    var phone_number = getGlobal('phone_number')
    var debug_infos = getGlobal('debug_infos')
    var kakao = getGlobal('kakao')

    hermes_context = {}

    setGlobal('phone_number', phone_number)
    setGlobal('debug_infos', debug_infos)
    setGlobal('kakao', kakao)

    return 'true'

}

function calculatePos(items, input_page) {
    let page = 0
    if (input_page !== '미수집') {
        page = Number(input_page)
    }
    if (items.length <= 10) {
        return {
            begin: 0,
            end: items.length,
            previous: false,
            next: false
        }
    }

    if (page === 0) {
        return {
            begin: 0,
            end: 9,
            previous: false,
            next: true
        }
    }
    const begin = 9 + 8 * (page - 1)
    const leftAmount = items.length - 9 - 8 * (page - 1)
    if (leftAmount <= 9) {
        return {
            begin,
            end: begin + leftAmount,
            previous: true,
            next: false
        }
    }
    return {
        begin,
        end: begin + 8,
        previous: true,
        next: true
    }
}

function getPageButtons (type, items, page) {
    const {begin, end, previous, next} = calculatePos(items, page)
    const buttons = []
    let message = ''

    if (previous) {
        message += '\n✅ 이전 ' + type + '를 보려면 <이전 ' + type + ' 보기> 버튼을 눌러주세요.'
        buttons.push(createTextButton('이전 ' + type + ' 보기', '이전 ' + type + ' 보기'))
    }
    for (let i = begin; i < end; ++i) {
        var items_name = items[i].invisible ? '[품절] ' + items[i].name : items[i].name
        buttons.push(createTextButton(items_name, items[i].name))
    }
    if (next) {
        message += '\n✅ 나머지 ' + type + '를 보려면 <' + type + ' 더보기> 버튼을 눌러주세요.'
        buttons.push(createTextButton(type + ' 더보기', type + ' 더보기'))
    }

    return {message: message, buttons: buttons}
}

//페이지 변경?
function changePage (type, delta) {
    let items
    let pageStr
    try {
        if (type === 'category') {
            items = getGlobal('list_sections')
            pageStr = getGlobal('cate_page')
        } else {
            items = getGlobal('list_menu')
            pageStr = getGlobal('menu_page')
        }

        let page
        if (pageStr === '미수집') {
            page = 0
        } else {
            page = Number(pageStr)
        }

        const position = calculatePos(items, page)
        const deltaNum = Number(delta)
        if ((deltaNum > 0 && position.next) || (deltaNum < 0 && position.previous)) {
            if (type === 'category') {
                setGlobal('cate_page', (page + deltaNum).toString())
            } else {
                setGlobal('menu_page', (page + deltaNum).toString())
            }
        }
    } catch (e) {
        log('failed to change page' + JSON.stringify(e))
    }
    return 'done'
}

//배달 지역과 배달 요금 채팅
function sayDeliveryAreaAndDeliveryFee(resay) {
    const answers = []
    if (resay === 'true') {
        answers.push(createTextFormat([
            '죄송합니다. 제가 지금 도와드릴 수 있는 일이 아니에요. 😥\n\n' +
            '✅  다음 중, 진행하고 싶은 항목을 선택해주세요.'
        ]))
    }
    answers.push(createCardFormat(
        '',
        '■ 배달 지역/배달료 관리를 하시려면 아래 버튼을 눌러주세요.\n' +
        '■ 내 배달 지역 확인은 사장님 사이트에서 가능합니다.\n' +
        '※사장님사이트는 PC환경에서 더 원활하게 이용할 수 있습니다.',
        '',
        [
            createTextButton('배달 지역 변경', '배달 지역 변경'),
            createTextButton('배달료/최소주문금액 변경', '배달료/최소주문금액 변경'),
            createTextButton('내 배달 지역 확인', 'https://owner.yogiyo.co.kr/owner/delivery/'),
        ]
    ))
    log('Answers' + JSON.stringify(answers, null, '  '))
    return answers
}

//사업자 등록 번호 조회
function selectCompanyNumber() {

    var list_company = getGlobal('list_company')
    var list_number = []

    for (var j = 0; j < list_company.length; j++) {
        list_number.push(list_company[j]['company_number'])
    }
    var list_set = new Set(list_number)
    var list_company_number = Array.from(list_set)
    setGlobal('list_company_number', list_company_number)

    var message = ''
    var task = getGlobal('task')

    var com_num_start = getGlobal('com_num_start')
    var com_num_end = getGlobal('com_num_end')

    var list_buttons = []
    //if (task == "요일별 영업시간 설정" || task == "브레이크타임 설정" || task == "정기 휴무일 설정" || task == "요일별 영업시간 설정" || task == '배달 지역 변경' || task == '배달료/최소주문금액 변경' || task == '배달 지역 동 단위 추가/삭제') {
    //    list_buttons.push([createTextButton('모두 선택', '모두 선택')])
    //}

    if ((com_num_start == '미수집') || com_num_start == '0') {
        log('selectCompanyNumber : first company number list')

        com_num_start = '0'
        if (list_company_number.length > 9) {
            com_num_end = '9'
        } else {
            com_num_end = list_company_number.length
        }
        setGlobal('com_num_start', com_num_start)
        setGlobal('com_num_end', com_num_end)

        message = '사장님의 핸드폰 번호로 조회된 사업자등록번호를 보여드릴게요.'

    } else {
        log('selectCompanyNumber : not first company number list')
        message = '조회된 사업자등록번호 개수가 9건을 초과하여, 나머지 번호를 보여드릴게요.'

    }

    message += '\n\n' + task + ' 접수에 사용할 사업자등록번호를 아래 버튼 중에서 선택해주세요.'
    //message += '\n\n✅ 모든 사업자등록번호에 동일하게 적용하시려면 <모두 선택>을 선택해주세요.'

    for (var i = Number(com_num_start); i < Number(com_num_end); i++) {
        list_buttons.push(createTextButton(list_company_number[i], list_company_number[i]))
    }

    if (list_company_number.length != com_num_end) {
        message += '\n✅ 최대 8개의 사업자등록번호를 보여드립니다. 나머지 사업자등록번호를 보시려면 <더보기> 버튼을 눌러주세요.'
        list_buttons.push(createTextButton('더보기', '더보기'))
    }


    var list_answer = []
    list_answer.push(createTextFormat([message]))
    list_answer.push(createButtonsFormat(list_buttons))

    log('selectCompanyNumber list_answer : ')
    log(JSON.stringify(list_answer, null, ' '))

    return list_answer

}

//여러개의 사업자등록 번호가 있는지 확인 하는 함수???
function hasMultipleCompanies() {
    log('hasMultipleCompanies is activated')
    try {
        const list_company = getGlobal('list_company')
        if (list_company === '미수집') {
            return 'empty'
        }

        const restaurantMap = {}
        for (let i = 0; i < list_company.length; ++i) {
            if (list_company[i].hasOwnProperty('company_number')) {
                const companyNumber = list_company[i].company_number
                if (restaurantMap.hasOwnProperty(companyNumber)) {
                    restaurantMap[companyNumber].push(list_company[i])
                } else {
                    restaurantMap[companyNumber] = [list_company[i]]
                }
            }
        }

        const companyNumbers = Object.keys(restaurantMap)
        if (companyNumbers.length === 0) {
            return 'empty'
        } else if (companyNumbers.length > 1) {
            return 'multiple company'
        }

        const restaurants = restaurantMap[companyNumbers[0]]
        setGlobal('company_number', companyNumbers[0])
        setGlobal('list_selected_company', restaurants)
        if (restaurants.length === 1) {
            setGlobal('restaurant_name', restaurants[0].restaurant_name)
            setGlobal('company_info', restaurants[0])
            return 'one restaurant'
        } else if (restaurants.length === 0) {
            return 'empty'
        }
        return 'multiple restaurant'
    } catch (e) {
        log('hasMultipleCompanies try catch error : ')
        log(e)
        return 'false'
    }
}

//매장 이름 선택
function selectRestaurantName() {

    var list_selected_company = getGlobal('list_selected_company')
    var company_names = getGlobal('company_names')

    var message = ''
    var task = getGlobal('task')

    var res_name_start = getGlobal('res_name_start')
    var res_name_end = getGlobal('res_name_end')

    var list_buttons = []
    //if (task == "요일별 영업시간 설정" || task == "브레이크타임 설정" || task == "정기 휴무일 설정" || task == "요일별 영업시간 설정" || task == '배달 지역 변경' || task == '배달료/최소주문금액 변경' || task == '배달 지역 동 단위 추가/삭제') {
    //    list_buttons.push([createTextButton('모두 선택', '모두 선택')])
    //}

    if ((res_name_start == '미수집') || res_name_start == '0') {
        log('selectRestaurantName : first company number list')

        res_name_start = '0'
        if (company_names.length > 9) {
            res_name_end = '9'
        } else {
            res_name_end = company_names.length
        }
        setGlobal('res_name_start', res_name_start)
        setGlobal('res_name_end', res_name_end)

        message = '선택하신 사업자등록번호로 상호명이 여러 건 조회됐습니다.'

    } else {
        log('selectRestaurantName : not first company number list')
        message = '조회된 상호명 개수가 9건을 초과하여, 나머지 번호를 보여드릴게요.'

    }

    message += '\n\n' + task + ' 접수에 사용할 상호명을 아래 버튼 중에서 선택해주세요.'
    // message += '\n\n✅ 모든 사업체에 동일하게 적용하시려면 <모두 선택>을 선택해주세요.'

    for (var i = Number(res_name_start); i < Number(res_name_end); i++) {
        list_buttons.push(createTextButton(company_names[i], (i + 1) + '번 사업체 선택'))
    }

    if (company_names.length != res_name_end) {
        message += '\n✅ 최대 8개의 상호명을 보여드립니다. 나머지 상호명을 보려면 <더보기> 버튼을 눌러주세요.'
        list_buttons.push(createTextButton('더보기', '더보기'))
    }

    var list_answer = []
    list_answer.push(createTextFormat([message]))
    list_answer.push(createButtonsFormat(list_buttons))

    log('selectRestaurantName list_answer : ')
    log(JSON.stringify(list_answer, null, ' '))

    return list_answer

}

//사업자등록번호 등록 및 결과값 리턴 boolean
function saveCompanyNumber(this_number) {
    log('saveCompanyNumber input ' + this_number)
    if (!this_number) {
        return 'false'
    }

    var list_selected_company = getGlobal('list_selected_company')
    var company_names = getGlobal('company_names')
    var company_number = getGlobal('company_number')

    if (this_number == '모두 선택') {

        //var converted_number = ''

        //for (var i = 0; i < (list_company.length - 1); i++) {
        //    converted_number += list_company[i]['company_number'] + ', '
        //}
        //converted_number += list_company[(list_company.length - 1)]['company_number']

        //setGlobal('bl_number', converted_number)
        //setGlobal('select_all', 'true')
        //setGlobal('company_info', list_company[0])
        //log('saveCompanyNumber Select all ' + JSON.stringify(list_company[0]))
        return 'false'

    } else {
        const index = Number(this_number) - 1
        if (company_names.length <= index) {
            log('Failed to saveCompanyNumber ' + this_number + '/' + company_names.length)
            return 'false'
        }
        company_info = list_selected_company[index]
        bl_number = list_selected_company[index]['company_number']
        restaurant_name = list_selected_company[index]['restaurant_name']
        restaurant_id = list_selected_company[index]['restaurant_id']

        log(JSON.stringify(company_info, null, '  '))

        if (bl_number != '미수집' && bl_number != '' && bl_number == company_number) {
            setGlobal('bl_number', bl_number)
        } else {
            setGlobal('bl_number', company_number)
        }

        setGlobal('restaurant_name', restaurant_name)
        setGlobal('restaurant_id', restaurant_id)
        setGlobal('company_info', company_info)
        log('saveCompanyNumber ' + JSON.stringify(company_info))
    }


    return 'true'

}

//사업자등록번호 기준 중복되는지 확인 리턴 boolean
function checkRestaurantNameCount() {

    log('checkRestaurantNameCount is activated')
    try {

        var list_company = getGlobal('list_company')
        var company_number = getGlobal('company_number')
        var list_selected_company = []
        var company_names = []

        for (var j = 0; j < list_company.length; j++) {
            if (list_company[j].hasOwnProperty('company_number') && list_company[j]['company_number'] == company_number) {
                list_selected_company.push(list_company[j])
                company_names.push(list_company[j]['restaurant_name'])
            }
        }

        setGlobal('list_selected_company', list_selected_company)
        setGlobal('company_names', company_names)

        if (list_selected_company.length > 1) {
            return 'true'
        } else {
            setGlobal('company_info', list_selected_company[0])
            return 'false'
        }

    } catch (e) {
        log('checkRestaurantNameCount try catch error : ')
        log(e)

        return 'false'
    }

}

//메뉴 추가 삭제 메뉴 바로가기 버튼 생성
function sayMenuAndPrice(resay) {
    const link =  {
        "mobile": "https://owner.yogiyo.co.kr/owner/app-download?deeplink=ygyownerapp://restaurant/out_of_dish",
        "android": "ygyownerapp://restaurant/out_of_dish",
        "ios": "ygyownerapp://restaurant/out_of_dish"
    }
    const answers = []
    if (resay === 'true') {
        return [
            '죄송합니다. 제가 지금 도와드릴 수 있는 일이 아니에요. 😥\n\n' +
            '✅  다음 중, 진행하고 싶은 항목을 선택해주세요.'
        ]
    }
    return [{
        cardFormat: {
            title:
                "",
            bodyText:
                "■ 메뉴/가격 관리를 하시려면 아래 버튼을 눌러주세요.\n" +
                "■ 메뉴 품절 설정은 사장님 앱에서 가능합니다.",
            buttons: [
                {
                    displayText: '메뉴 추가/삭제',
                    reaction: {
                        text: '메뉴 추가/삭제'
                    }
                },
                {
                    displayText: '메뉴/가격 변경',
                    reaction: {
                        text: '메뉴/가격 변경'
                    }
                },
                {
                    displayText: '메뉴 품절 설정',
                    reaction: {
                        json: JSON.stringify(link)
                    }
                }
            ]
        },
        subtype: '딥링크'
    }]
}

//영업시간 휴무일 관리 바로가기 버튼 생성
function sayBusinessHourAndClosedDay(resay) {
    const link =  {
        "mobile": "https://owner.yogiyo.co.kr/owner/app-download?deeplink=ygyownerapp://oe_pause",
        "android": "ygyownerapp://oe_pause",
        "ios": "ygyownerapp://oe_pause"
    }
    const answers = []
    if (resay === 'true') {
        return [
            '죄송합니다. 제가 지금 도와드릴 수 있는 일이 아니에요. 😥\n\n' +
            '✅  다음 중, 진행하고 싶은 항목을 선택해주세요.'
        ]
    }
    return [{
        cardFormat: {
            title:
                "",
            bodyText:
                "■ 영업시간/휴무일 관리를 하시려면 아래 버튼을 눌러주세요.\n" +
                "■ 영업일시중지/해제 설정은 사장님 어플에서 가능합니다.\n" +
                "■ 아래 버튼을 눌러 사장님 어플로 이동할 수 있습니다.",
            buttons: [
                {
                    displayText: '정규 영업 시간 변경',
                    reaction: {
                        text: '정규 영업 시간 변경'
                    }
                },
                {
                    displayText: '휴무일 설정',
                    reaction: {
                        text: '휴무일 설정'
                    }
                },
                {
                    displayText: '영업 일시 중지 설정',
                    reaction: {
                        json: JSON.stringify(link)
                    }
                }
            ]
        },
        subtype: '딥링크'
    }]
}

//기타 다른 문의 바로가기
function sayAboutOrder(resay) {
    const link =  {
        "mobile": "https://owner.yogiyo.co.kr/owner/app-download?deeplink=ygyownerapp://orderlist",
        "android": "ygyownerapp://orderlist",
        "ios": "ygyownerapp://orderlist"
    }

    if (resay === 'true') {
        return [
            '죄송합니다. 제가 지금 도와드릴 수 있는 일이 아니에요. 😥\n\n' +
            '✅  다음 중, 진행하고 싶은 항목을 선택해주세요.'
        ]
    }

    return [{
        cardFormat: {
            title: "",
            bodyText:
                "■ 배달을 갔는데 고객이 부재이거나, 기타 사유로 배달을 실패하셨다면 <배달 실패> 버튼을 눌러주세요. CS매니저와 연결해드릴게요.\n" +
                "■ 주문취소를 하시려면 아래 버튼을 눌러주세요.\n" +
                "■ 24시간 이내 접수된 주문 내역 확인은 사장님 어플에서 가능합니다.",
            buttons: [
                {
                    displayText: '배달 실패',
                    reaction: {
                        text: '상담원 연결'
                    }
                },
                {
                    displayText: '주문 취소 진행하기',
                    reaction: {
                        text: '주문 취소 진행하기'
                    }
                },
                {
                    displayText: '주문 내역 확인하기',
                    reaction: {
                        json: JSON.stringify(link)
                    }
                }
            ]
        },
        subtype: '딥링크'
    }]
}

//int to string
function parseIntStr(numberStr) {
    return parseInt(numberStr).toString()
}



function getRestaurantDetail(companyInfo) {
    try {
        const detail = RestaurantInfoDetail(String(companyInfo['restaurant_id']))
        log('detail: ')
        log(JSON.stringify(detail, null, '  '))
        if (!isEmpty(detail) && detail.hasOwnProperty('restaurant_name')) {
            return {
                ...companyInfo,
                'phone': detail['phone'],
                'owner': detail['owner']
            }
        }
    } catch (e) {
        log('getRestaurantDetail function try catch error')
        log(e)
    }
    return undefined
}

//매장 상세 정보 가져오기
function getRestaurantInfoDetail() {
    try {
        const companies = []
        if (getGlobal('select_all') === 'true') {
            companies.push(...getGlobal('list_company'))
        } else {
            companies.push(getGlobal('company_info'))
        }
        log('getRestaurantInfoDetail ' + JSON.stringify(companies))
        const details = []
        for (let i = 0; i < companies.length; ++i) {
            const detail = getRestaurantDetail(companies[i])
            if (!detail) {
                log('getRestaurantInfoDetail function result : Failed')
                return 'false'
            }

            details.push(detail)
            if (i === 0) {
                setGlobal('company_info', detail)
                setGlobal('bl_number', detail['company_number'])
                setGlobal('telno', detail['phone'])
                setGlobal('ceo_name', detail['owner'])
                setGlobal('restaurant_name', detail['restaurant_name'])
                setGlobal('restaurant_id', detail['restaurant_id'])
            }
        }
        setGlobal('company_details', details)
        return 'true'
    } catch (e) {
        log('getRestaurantInfoDetail function try catch error : ')
        log(e)
    }
    return 'false'
}

//메뉴 정책 말해주기??
function sayMenuPolicy(this_menu) {

    var menu_policy = getGlobal('menu_policy')

    var task = getGlobal('task')

    if (task == '메뉴 추가') {
        task = '추가'
    } else if (task == '메뉴 삭제') {
        task = '삭제'
    } else {
        task = '변경'
    }

    var message = '현재까지 등록된 ' + task + '할 메뉴 리스트입니다.\n--------------------\n'

    for (var i = 0; i < menu_policy.length; i++) {
        const splited = menu_policy[i].split(',')
        if (i > 0) {
            message += '\n\n'
        }
        message += (i + 1) + '번.'

        if (task === '추가') {
            message += '\n카테고리 : ' + splited[0]
            message += '\n메뉴명 : ' + splited[1]
            message += '\n가격 : ' + splited[2]
        } else if (task === '삭제') {
            message += '\n카테고리 : ' + splited[0]
            message += '\n메뉴명 : ' + splited[1]
        } else { // 변경
            //const category_menu = splited[0].split('/')
            //message += '\n카테고리 : ' + category_menu[0]
            //message += '\n메뉴명 : ' + category_menu[1]
            //var etc_splited = splited[1].split('/')
            //message += '\n' + etc_splited[0]
            //message += '\n' + etc_splited[1].trim()
            message += '\n카테고리 : ' + splited[0]
            message += '\n메뉴명 : ' + splited[1]
            var etc_splited = splited[2].split('/')
            message += '\n' + etc_splited[0]
            message += '\n' + etc_splited[1].trim()
        }
        // var splited = splited = menu_policy[i].split(',')
        // var foods_categorymenu = menu_policy[0].split(',')
        // var foods_etc = menu_policy[1].split(',')

        // for (var i = 0; i < foods_categorymenu.length; i++) {

        //     var splited2 = splited2 = foods_categorymenu[0].split('/')
        //     var foods_category = ''
        //     var foods_menu = ''

        //     if (i > 0) {
        //         message += '\n\n'
        //     }
        //     message += (i + 1) + '번.'

        //     if (task.indexOf('변경') == -1) {

        //         foods_category = splited2[0]
        //         foods_menu = splited2[1]

        //         message += '\n카테고리 : ' + foods_category
        //         message += '\n메뉴명 : ' + foods_menu

        //         if (task == '메뉴 추가') {
        //             var foods_price = splited2[2]
        //             message += '\n가격 : ' + foods_price
        //         }

        //     } else {

        //         foods_category = splited2[0]
        //         foods_menu = splited2[1]
        //         foods_etc = splited2[2]

        //         message += '\n카테고리 : ' + foods_category
        //         message += '\n메뉴명 : ' + foods_menu
        //         var etc_splited = foods_etc.split('/')
        //         message += '\n' + etc_splited[0]
        //         message += '\n' + etc_splited[1].trim()

        //     }
        // }

    }

    message += '\n--------------------\n\n'
    message += this_menu + '외에 다른 메뉴를 더 ' + task + '하시겠어요?'
    message += '\n<아니오>를 선택하시면 현재까지 등록된 리스트로 메뉴 ' + task + ' 요청을 접수합니다.'

    return createTextFormat([message])

}

//카카오 전화번호 얻기
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

//메뉴 정책 저장
function saveMenuPolicy(foods_category, foods_menu, foods_etc) {

    log('saveMenuPolicy is activated')

    var menu_policy = getGlobal('menu_policy')
    var policy = ''

    var task = getGlobal('task')

    if (foods_etc != "") {
        if (task == '메뉴 추가') {
            policy = foods_category + ',' + foods_menu + ',' + foods_etc + '원'
        } else {
            const request_msg = foods_etc.replace(/,/gi, '')
            policy = foods_category + ',' + foods_menu + ',' + request_msg
        }
    } else {
        policy = foods_category + ',' + foods_menu
    }

    log('before menu_policy : ' + JSON.stringify(menu_policy, null, ' '))
    menu_policy.push(policy)
    log('after menu_policy : ' + JSON.stringify(menu_policy, null, ' '))

    setGlobal('menu_policy', menu_policy)

    return 'true'

}

//이미지 상세 정보 구분자(,) 널기
function convertImageDetail(image_category, image_menu, image_detail) {
    const details = image_detail.replace(/,/gi, '')
    return [image_category, image_menu, details].join(',')
}

//시간 변경해서 리턴
function getContactTime2(start, end) {
    log('contact time2 ' + start + '/' + end)
    if (start === '오전 10:00:00' && end === '오후 1:00:00') {
        return '오전10시 - 오후1시'
    } else if (start === '오후 1:00:00' && end === '오후 4:00:00') {
        return '오후1시 - 오후4시'
    } else if (start === '오후 4:00:00' && end === '오후 7:00:00') {
        return '오후4시 - 오후7시'
    }

    return 'false'
}

//시간을 스트링
function isTimeStr() {
    log('is time str |' + user_says)
    const userStr = user_says.trim()
    if (userStr === '오전10시') {
        return '10:00:00'
    } else if (userStr === '오후1시') {
        return '13:00:00'
    } else if (userStr == '오후4시') {
        return '16:00:00'
    } else if (userStr == '오후7시') {
        return '19:00:00'
    }
    return 'false'
}

//주문 배달 방법 말해줘
function sayOrderDeliveryMeans(resay) {
    const answers = []
    if (resay === 'true') {
        answers.push(createTextFormat([
            '죄송합니다. 제가 지금 도와드릴 수 있는 일이 아니에요. 😥\n\n' +
            '✅  다음 중, 진행하고 싶은 항목을 선택해주세요.'
        ]))
    }
    answers.push(createCardFormat(
        '',
        '■ 주문 전달 수단에 대한 자주묻는 질문을 준비했어요. 이용하시는 전달 수단을 선택해 확인해보세요.\n' +
        '■ 주문 접수 문자/어플 번호 추가는 사장님 사이트에서 가능합니다. 주문전달 핸드폰 번호 추가 버튼을 눌러 사장님 사이트로 이동할 수 있습니다.\n' +
        '※사장님사이트는 PC환경에서 더 원활하게 이용할 수 있습니다.',
        '',
        [
            createTextButton('PC 접수 프로그램', 'PC 접수 프로그램'),
            createTextButton('단말기', '단말기'),
            createTextButton('주문전달 핸드폰 번호 추가', 'https://owner.yogiyo.co.kr/owner/profile/'),
        ]
    ))
    log('Answers' + JSON.stringify(answers, null, '  '))
    return answers
}

//정산 정보 말해줘
function sayAdjustment(resay) {
    const answers = []
    if (resay === 'true') {
        answers.push(createTextFormat([
            '죄송합니다. 제가 지금 도와드릴 수 있는 일이 아니에요. 😥\n\n' +
            '✅  다음 중, 진행하고 싶은 항목을 선택해주세요.'
        ]))
    }
    answers.push(createCardFormat(
        '',
        '■ 정산 날짜 확인이 필요하신 경우 [정산일] 버튼을 눌러 확인해주세요.\n' +
        '■ 그 외 정산 관련 문의를 원하시는 경우 아래 버튼을 통해 확인 가능합니다.',
        '',
        [
            createTextButton('정산일', '정산일'),
            createTextButton('정산 내역 확인', '정산 내역 확인'),
            createTextButton('계좌 정보 변경', '계좌 정보 변경'),
        ]
    ))
    log('Answers' + JSON.stringify(answers, null, '  '))
    return answers
}

//답변 포맷 생성
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

    function createUrlButton(display_text, url) {
        return {
            "display_text" : display_text,
            "reaction" : {
                "url": url
            }
        }
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

//카테고리 답변 리스트 생성
function sayCategoryList() {
    const categories = getGlobal('list_sections')
    const categoryPage = getGlobal('cate_page')
    const task = getGlobal('task')

    let message = ''
    if (task.indexOf('추가') != -1) {
        message += '추가할 메뉴가 속할 카테고리를 아래 버튼 중에서 선택해주세요.\n단, 주류 메뉴 카테고리는 챗봇을 통해서 접수하실 수 없어요.'
    } else if (task.indexOf('삭제') != -1) {
        message += '삭제할 메뉴가 속한 카테고리를 아래 버튼 중에서 선택해주세요.'
    } else if (task.indexOf('변경') != -1) {
        message += '변경할 메뉴가 속한 카테고리를 아래 버튼 중에서 선택해주세요.'
    } else if (task.indexOf('사진') != -1) {
        message += '사진을 변경할 메뉴가 속한 카테고리를 선택해주세요.'
    } else {
        message += '메뉴가 속한 카테고리를 선택해주세요.'
    }
    const {message: buttonMessage, buttons} = getPageButtons('카테고리', categories, categoryPage)

    const answers = []
    answers.push(createTextFormat([message + buttonMessage]))
    answers.push(createButtonsFormat(buttons))

    log('sayCategoryList answers: ')
    log(JSON.stringify(answers, null, '  '))
    return answers
}

//메뉴 변경 리스트 답변 생성
function sayMenuList() {
    const categories = getGlobal('list_menu')
    const categoryPage = getGlobal('menu_page')
    const task = getGlobal('task')

    let message = ''
    if (task.indexOf('추가') != -1) {
        message += '추가할 메뉴를 아래 버튼 중에서 선택해주세요.'
    } else if (task.indexOf('삭제') != -1) {
        message += '삭제할 메뉴를 아래 버튼 중에서 선택해주세요.'
    } else if (task.indexOf('변경') != -1) {
        message += '변경할 메뉴를 아래 버튼 중에서 선택해주세요.'
    } else if (task.indexOf('사진') != -1) {
        message += '다음 중 어느 메뉴의 사진을 변경할까요?'
    } else {
        message += '메뉴를 아래 버튼 중에서 선택해주세요.'
    }
    const {message: buttonMessage, buttons} = getPageButtons('메뉴', categories, categoryPage)

    const answers = []
    answers.push(createTextFormat([message + buttonMessage]))
    answers.push(createButtonsFormat(buttons))

    log('sayMenuList answers: ')
    log(JSON.stringify(answers, null, '  '))
    return answers
}

//매장 메뉴 정보 호출
function getRestaurantMenu() {

    try {

        var restaurant_id = getGlobal('restaurant_id')
        var section_id = getGlobal('section_id')

        var result = RestaurantMenu(String(restaurant_id), String(section_id))
        if (result.hasOwnProperty('items')) {
            result['items'].sort(function (a, b) { return a.id - b.id })
            log('RestaurantMenu webhook result : ')
            log(JSON.stringify(result, null, ' '))
            setGlobal('list_menu', result['items'])
            return 'true'

        } else {
            log('getRestaurantMenuresult : webhook result is not valid')
            return 'false'
        }

    } catch (e) {
        log('getRestaurantMenu try catch error : ')
        log(e)
        return 'false'
    }

}

//매장 구역
function getRestaurantSection() {

    try {

        var restaurant_id = getGlobal('restaurant_id')
        log('restaurant_id : ' + restaurant_id)

        var result = RestaurantSection(String(restaurant_id))
        log('RestaurantSection webhook result : ')

        if (result.hasOwnProperty('items')) {
            result['items'].sort(function (a, b) { return a.id - b.id })
            log(JSON.stringify(result, null, ' '))
            setGlobal('list_sections', result['items'])
            return 'true'

        } else {
            log(JSON.stringify(result, null, ' '))
            log('getRestaurantSection result : webhook result is not valid')
            return 'false'
        }

    } catch (e) {
        log('getRestaurantSection try catch error : ')
        log(e)
        return 'false'
    }

}

//정보이용 동의 말해주기기
function sayInfoAgree() {

    var task = getGlobal('task')
    var message = '[개인정보 수집/이용 동의 안내]'

    message += '\n\n1. 수집 및 이용 목적'
    message += '\n - 챗봇 서비스 제공 및 이용에 따른 본인확인 등'
    message += '\n2. 수집하는 항목'

    if (task == '반납 요청') {
        message += '\n - 연락처, 주소'
    } else {
        message += '\n - 연락처'
    }

    message += '\n3. 개인정보의 보유 및 이용기간'
    message += '\n - 3년'
    message += '\n\n* 동의를 거부하실 수 있으나, 이 경우 요기요(사장님) 챗봇 서비스 이용에 제한이 있을 수 있습니다.'

    return createTextFormat([message])

}

//배달 정책 말해주기
function saveDeliveryPolicy(dong, delivery_min, delivery_fee_edit, delivery_free) {

    log('savePolicy is activated')

    let task = getGlobal('task')
    let policy
    if(task === '배달 지역 동 단위 추가/삭제' && getGlobal('location_type') === '배달 지역 삭제') {
        policy = dong
    }else{
        policy = dong + ',' + delivery_min + ',' + delivery_fee_edit + ',' + delivery_free
    }

    var delivery_policy = getGlobal('delivery_policy')
    delivery_policy.push(policy)
    log('delivery_policy : ' + delivery_policy)

    setGlobal('delivery_policy', delivery_policy)

    return 'true'

}

//시간이랑 분 합치기
function fcombineHourAndMinute() {
    function toTwoDigit (digit) {
        const intDigit = parseInt(digit)
        if (intDigit >= 0 && intDigit <= 9) {
            return '0' + intDigit.toString()
        }
        return intDigit.toString()
    }

    function combineHourAndMinute (hour, minute) {
        if (!hour || !minute) return '00:00:00'
        return toTwoDigit(hour) + ':' + toTwoDigit(minute) + ':00'
    }
}

//코드 인증 상태 확인
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

//확인된 코드 보내주기
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

//동네 확인
function sayDongConfirm() {

    var message = ''

    var list_found = getGlobal('list_found')
    setGlobal("dong_count", list_found.length)
    message = '요청하신 지역이 '

    if (list_found.length == 1) {

        var city = list_found[0][0]
        var gu = list_found[0][1]
        var dong = list_found[0][2]

        message += city + ' ' + gu + ' ' + dong + ' 인가요?'
        return createTextFormat([message])

    } else if (list_found.length > 1) {

        message += '다음 중 어디인가요? 만약 2번이라면 "2번"이라고 입력해주세요.\n'

        for (var i = 0; i < list_found.length; i++) {

            var this_city = list_found[i][0]
            var this_gu = list_found[i][1]
            var this_dong = list_found[i][2]

            message += '\n' + (i + 1) + '번 ' + this_city + ' ' + this_gu + ' ' + this_dong

        }

        return createTextFormat([message])

    }

}

//시간 확인
function checkTime(this_time) {

    try {

        //2018년 1월 23일
        //20210123

        var year = ''
        var month = ''
        var day = ''
        var today = new Date()

        log('this_time : ' + this_time)

        if (this_time.indexOf('.') != -1) {

            var year_splited = this_time.split('.')
            log('year_splited : ' + year_splited)
            year = year_splited[0]
            year = year.replace(/(\s*)/g, "")

            month = year_splited[1]
            month = month.replace(/(\s*)/g, "")

            day = year_splited[2]
            day = day.replace(/(\s*)/g, "")


        } else if (this_time.length == 8) {

            year = this_time.substr(0, 4)
            month = this_time.substr(4, 2)
            day = this_time.substr(6, 2)

        } else if (this_time == '즉시') {

            year = today.getFullYear()
            month = Number(today.getMonth()) + 1
            day = today.getDate()

            var exit_date = year + '년 ' + month + '월 ' + day + '일'
            setGlobal('exit_date', exit_date)

            return 'true'

        } else {
            log('checkTime function result : not expected time format')
            return 'false'
        }

        log('year : ' + year)
        log('month : ' + month)
        log('day : ' + day)

        var this_datetime = new Date(year, Number(month) - 1, day)

        var hour = today.getHours()
        var minute = today.getMinutes()
        var second = today.getSeconds()

        this_datetime.setHours(hour)
        this_datetime.setMinutes(minute)
        this_datetime.setSeconds(second)

        log('this_datetime : ' + String(this_datetime))
        log('today : ' + String(today))

        if (this_datetime >= today) {

            var exit_date = year + '년 ' + month + '월 ' + day + '일'
            setGlobal('exit_date', exit_date)

            return 'true'

        } else {
            log('checkTime function result : user says past time')
            return 'false'
        }


    } catch (e) {
        log('checkTime try catch error ; ')
        log(e)
        return 'false'
    }

}

//
function saveAdr(user_pick) {
    log('saveAdr function is acitvated')
    var list_found = getGlobal('list_found')

    var dong = ''
    if (user_pick == '네') {
        log('user_pick : 네')
        log('list_found : ' + list_found)
        log('list_found : ' + list_found[2])

        dong = list_found[0][2]

    } else {
        log('user_pick : ' + user_pick)
        dong = list_found[Number(user_pick) - 1][2]
    }

    setGlobal('dong', dong)
    return 'true'

}

//컨텍스트 초기화
function clearContext(){

    hermes_context = {}
    return 'true'

}

//유저 발화 체크
function checkUserSays(num, keyword) {

    log('checkUserSays is activated')

    if (user_says.length >= Number(num)) {

        if ((keyword != '') && (keyword == user_says)) {

            log('checkUserSays result : user_says is same as keyword')
            return 'false'

        } else {

            var annotations = hermes_log['candidate_annotations']
            log('annotations : ')
            log(JSON.stringify(annotations, null, ' '))

            if (annotations.length >= 1 && annotations[0].hasOwnProperty('begin_pos') === true) {

                for (var i = 0; i < annotations.length; i++) {

                    var name = annotations[i]['entity_name']

                    if ((name == '사업자등록번호') ||
                        (name == '확인 요청 선택지')) {
                        return 'false'
                    }

                }
                return 'true'

            } else {

                log('checkUserSays result : annotation is empty')
                return 'true'

            }
        }

    } else {
        log('checkUserSays result : too short user_says')
        return 'false'
    }

}

//??????
function setComNum() {
    log('setComNum function is activated')

    var com_num_start = getGlobal('com_num_start')
    var com_num_end = getGlobal('com_num_end')
    var list_company_number = getGlobal('list_company_number')
    var company_length = list_company_number.length

    com_num_start = com_num_end
    com_num_start = Number(com_num_start)
    com_num_end = Number(com_num_end)

    if ((company_length - com_num_start) < 8) {
        com_num_end = company_length
    } else {
        com_num_end = com_num_start + 8
    }

    setGlobal('com_num_start', String(com_num_start))
    setGlobal('com_num_end', String(com_num_end))

    return 'true'
}

// 굳이 뭐...
function convertFoodsEtc(edit_target, edit_detail){

    return '변경 항목 : ' + edit_target + '/ 변경 요청사항 : ' + edit_detail

}


function convertPrice() {
    //가격을 넘버로 리턴, 아니면 없음, 무료, 설정 안함 리턴
    function convertPrice(price) {

        if ((price == '없음') || (price == '무료') || (price == '설정 안함')) {

            return price

        } else {

            var message = String(Number(price).toLocaleString('ko-KR')) + '원(' + convertKorean(Number(price)) + '원)'
            return message

        }

    }

    function convertKorean(num) {

        num = parseInt((num + '').replace(/[^0-9]/g, ''), 10) + '';

        if (num == '0') {
            return '영';
        }

        var number = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
        var unit = ['', '만', '억', '조'];
        var smallUnit = ['천', '백', '십', ''];

        var result = []

        var unitCnt = Math.ceil(num.length / 4);

        num = num.padStart(unitCnt * 4, '0')
        var regexp = /[\w\W]{4}/g;

        var array = num.match(regexp);

        for (var i = array.length - 1, unitCnt = 0; i >= 0; i--, unitCnt++) {
            var hanValue = _makeHan(array[i]);
            if (hanValue == '')
                continue;
            result.unshift(hanValue + unit[unitCnt]);
        }

        function _makeHan(text) {
            var str = '';
            for (var i = 0; i < text.length; i++) {
                var num = text[i];
                if (num == '0')
                    continue;
                str += number[num] + smallUnit[i];
            }
            return str;
        }
        return result.join('');
    }
}

//유저 매뉴 체크 boolean
function checkUserMenu() {

    try {

        var list_menu = getGlobal('list_menu')

        for (var i = 0; i < list_menu.length; i++) {
            if (list_menu[i]['name'] == user_says) {

                var menu_name = list_menu[i]['name']
                var menu_price = list_menu[i]['price']

                setGlobal('menu_name', menu_name)
                setGlobal('menu_price', menu_price)

                return 'true'
            }
        }
        log('checkUserMenu function result : user says invalid menu name')
        return 'false'

    } catch (e) {
        log('checkUserMenu try catch error : ')
        log(e)
        return 'false'
    }

}

//유저 카테고리 체크 boolean
function checkUserCategory() {

    try {

        var list_sections = getGlobal('list_sections')

        for (var i = 0; i < list_sections.length; i++) {
            if (list_sections[i]['name'] == user_says) {
                var section_name = list_sections[i]['name']
                var section_id = list_sections[i]['id']

                setGlobal('section_name', section_name)
                setGlobal('section_id', section_id)
                return 'true'
            }
        }
        log('checkUserCategory function result : user says invalid category name')
        return 'false'

    } catch (e) {
        log('checkUserCategory try catch error : ')
        log(e)
        return 'false'
    }

}

//사업자 등록 번호 체크 boolean
function checkCompanyNumber(company_number) {

    try {

        log('before company_number : ' + company_number)

        var list_company = getGlobal('list_company')

        if (company_number.indexOf('-') != -1) {
            company_number = company_number.replace('-', '').replace('-', '')
        }

        if (company_number.indexOf(' ') != -1) {
            company_number = company_number.replace(' ', '').replace(' ', '')
        }

        log('after company_number : ' + company_number)

        for (var i = 0; i < list_company.length; i++) {

            this_company_number = list_company[i]['company_number']
            this_company_number = this_company_number.replace('-', '').replace('-', '')
            log('this_company_number : ' + this_company_number)

            if (company_number == this_company_number) {
                setGlobal('company_info', list_company[i])
                setGlobal('bl_number', this_company_number)
                setGlobal('restaurant_id', list_company[i]['restaurant_id'])
                return 'true'
            }
        }

        log('checkCompanyNumber function result : no matched company number')
        return 'false'

    } catch (e) {
        log('checkCompanyNumber function try catch error : ')
        log(e)
        return 'false'
    }

}

//발화로 날짜 체크 boolean
function checkDay() {
    function checkDay() {

        try {

            var annotations = hermes_log['candidate_annotations']
            log('annotations : ')
            log(JSON.stringify(annotations, null, ' '))

            if (!isEmpty(annotations)) {

                if (annotations.length >= 1 && annotations[0].hasOwnProperty('begin_pos') === true) {

                    list_annotated = []
                    for (var i = 0; i < annotations.length; i++) {

                        var name = annotations[i]['entity_name']

                        if (name == '요일') {
                            list_annotated.push(annotations[i]['value'])
                        } else if (name == 'datetime') {
                            list_annotated.push(annotations[i]['value'])
                        } else if (name == 'duration') {
                            list_annotated.push(annotations[i]['value'])
                        }
                    }

                    var list_days = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일', '매일']

                    var list_days_said = []
                    log('list_annotated : ')
                    log(JSON.stringify(list_annotated, null, ' '))

                    for (var j = 0; j < list_annotated.length; j++) {
                        if (list_days.indexOf(list_annotated[j]) != -1) {
                            list_days_said.push(list_annotated[j])
                        }
                        else if (list_annotated[j].indexOf('W') != -1
                            && list_annotated[j].length == 10) {
                            if (list_annotated[j][9] == '1') {
                                list_days_said.push('월요일')
                            }
                            if (list_annotated[j][9] == '2') {
                                list_days_said.push('화요일')
                            }
                            if (list_annotated[j][9] == '3') {
                                list_days_said.push('수요일')
                            }
                            if (list_annotated[j][9] == '4') {
                                list_days_said.push('목요일')
                            }
                            if (list_annotated[j][9] == '5') {
                                list_days_said.push('금요일')
                            }
                            if (list_annotated[j][9] == '6') {
                                list_days_said.push('토요일')
                            }
                            if (list_annotated[j][9] == '7') {
                                list_days_said.push('일요일')
                            }
                        }
                        else if ((list_annotated[j].indexOf('W') != -1) && (list_annotated[j].length == 11)) {
                            if (list_annotated[j][10] == 'D') {
                                list_days_said.push('월요일')
                                list_days_said.push('화요일')
                                list_days_said.push('수요일')
                                list_days_said.push('목요일')
                                list_days_said.push('금요일')
                            }
                            if (list_annotated[j][10] == 'E') {
                                list_days_said.push('토요일')
                                list_days_said.push('일요일')
                            }
                        } else if (list_annotated[j].indexOf('P1W') != -1) {
                            list_days_said.push('월요일')
                            list_days_said.push('화요일')
                            list_days_said.push('수요일')
                            list_days_said.push('목요일')
                            list_days_said.push('금요일')
                            list_days_said.push('토요일')
                            list_days_said.push('일요일')
                        }
                    }

                    if (list_days_said.indexOf('매일') != -1) {
                        list_days_said = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일']
                    }

                    var day_map = {
                        '월요일': 1,
                        '화요일': 2,
                        '수요일': 3,
                        '목요일': 4,
                        '금요일': 5,
                        '토요일': 6,
                        '일요일': 7
                    }

                    var list_days_final = []
                    if ((user_says.indexOf('부터') != -1) || (user_says.indexOf('~') != -1)) {
                        log('user_says : ' + user_says)

                        list_num = []
                        for (var k = 0; k < list_days_said.length; k++) {
                            var num = day_map[list_days_said[k]]
                            list_num.push(num)
                        }
                        var min = Math.min.apply(null, list_num) - 1
                        var max = Math.max.apply(null, list_num) - 1

                        var list_converted = []
                        for (var l = min; l <= max; l++) {
                            list_converted.push(list_days[l])
                        }
                        list_days_final = removeDuplicate(list_converted)

                    } else {
                        list_days_final = removeDuplicate(list_days_said)
                    }

                    if (list_days_final.length != 0) {
                        log('list_days : ' + list_days_final)
                        setGlobal('list_days', toSayDays(list_days_final))
                        return 'true'
                    } else {
                        log('checkDay function result : no day in user_says')
                        return 'false'
                    }

                } else {
                    log('checkDay function result : no annotations')
                    return 'false'
                }

            } else {
                log('checkDay function result : no annotations')
                return 'false'
            }

        } catch (e) {

            log('checkDay function try catch error : ')
            log(e)
            return 'false'
        }
    }


    function removeDuplicate(list_data) {

        var list_deleted = []
        for (var i = 0; i < list_data.length; i++) {
            if (list_deleted.indexOf(list_data[i]) == -1) {
                list_deleted.push(list_data[i])
            }
        }

        return list_deleted
    }

    function toSayDays(list_days) {
        var msg = ''
        for (var i = 0; i < list_days.length; i++) {
            msg += list_days[i] + ', '
        }

        var len = msg.length
        return msg.substring(0, len - 2)
    }
}

//주문번호 리턴
function sayOrderNumber() {

    var order_list = getGlobal('order_list')

    var list_card = []

    var last = 10
    if(order_list.length < 10){
        last = order_list.length
    }
    for (var i = 0; i < last; i++) {
        var order_number = order_list[i]['order_number']
        if (!isEmpty(order_number)) {

            var title = '주문 번호 | ' + order_number
            var body_text = '주문 접수 시간 : ' + order_list[i]['submitted_at']
            body_text += '\n주문 금액 : ' + convertPrice(order_list[i]['total_price'].toString()) + '원'
            body_text += '\n주문 내역 : ' + order_list[i]['ordered_items']

            list_card.push(createCard(title, body_text, '', [createTextButton('이 주문번호 취소', order_number + '번 주문 취소')]))


        }
    }

    return createCarousel(list_card)

}

//매장 주문 리턴 list
function getRestaurantOrder(phone_no) {

    log('getRestaurnatOrder function is activated')

    try {

        var phone_number = getGlobal('phone_no')

        var result = RestaurantOrder(phone_no)

        if (!isEmpty(result)) {

            var order_list = []
            for (var i = 0; i < result.length; i++) {

                var this_order = {}
                if (result[i].hasOwnProperty('submitted_at')) {
                    var submitted_at = result[i]['submitted_at']
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

//배달, 메뉴 정책 초기화
function setPolicy(type){

    if(type == 'delivery'){
        hermes_context['delivery_policy'] = []
        return 'true'
    }else if(type == 'menu'){
        hermes_context['menu_policy'] = []
        return 'true'
    }

}

//매장 정보 리턴
function getRestaurantInfo(phone_number) {

    log('getRestaurantInfo function is activated')

    try {

        var result = RestaurantInfo(phone_number)
        log('RestaurantInfor result : ')
        log(JSON.stringify(result, null, ' '))

        if (!isEmpty(result)) {

            if (result.length >= 1) {

                list_company = []
                for (var i = 0; i < result.length; i++) {

                    if(result[i].hasOwnProperty('company_number') === true){
                        var num = result[i]['company_number']
                        if (num != '') {
                            list_company.push(result[i])
                        }
                    }

                }
                setGlobal('list_company', list_company)
                return 'true'

            } else {

                log('getRestaurantInfo function result : no restaurant')
                return 'no_restaurant'
            }

        } else {
            log('getRestaurantInfo function result : no restaurant')
            return 'false'
        }


    } catch (e) {

        log('getRestaurantInfo try catch error : ')
        log(e)
        return 'false'

    }

}

//나간 이유 출력
function convertReason(exit_reason, exit_reason_detail){
    return exit_reason + ' : ' + exit_reason_detail
}

//광고 횟수 체크????
function checkAdrCount(adr_num) {

    try {

        var adr_count = getGlobal('adr_count')

        log('checkAdrCount is activated')
        log('adr_num : ' + adr_num)

        if ((Number(adr_num) < 1) || (Number(adr_num) > adr_count)) {
            log('return false')
            return "false"
        } else {
            log('return true')
            return "true"
        }

    } catch (e) {
        log('checkAdrCount try catch error : ')
        log(e)
        return "false"
    }

}
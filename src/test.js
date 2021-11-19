const hermes_context = {};
const answer = 0;
function setSatisfaction (item,question,answer){
    try {
        if (answer !== null && typeof answer !== 'undefined' && answer !== '') {

            if(hermes_context[item] === undefined){
                console.log('setSatisfaction undefined');
                hermes_context[item] = {};
                hermes_context[item][question] = answer;

                let length = Object.keys(hermes_context[item]).length;
                console.log('setSatisfaction length : ' + length);

                console.log('setSatisfaction answer : ' + '\n' + JSON.stringify(hermes_context[item], null, ' '));
            }else{
                console.log('setSatisfaction');
                hermes_context[item][question] = answer;

                let length = Object.keys(hermes_context[item]).length;
                console.log('setSatisfaction length : ' + length);
                answer = (length<5) ? true : false
                console.log('setSatisfaction answer : ');
                console.log(JSON.stringify(hermes_context[item], null, ' '));
            }
            return "true";
        } else {
            return "false";
        }
    }
    catch (e) {
        log('setSatisfaction try catch error :');
        log(e);
        return "false";
    }
}
setSatisfaction('전달', '문항1','만족')
setSatisfaction('전달', '문항2','불만족')
setSatisfaction('전달', '문항3','매우불만족')
setSatisfaction('전달', '문항4','괜찮게 사용하고 있어요')
setSatisfaction('AS', '문항4','괜찮게 사용하고 있어요')
console.log(hermes_context);

timestamp = new Date();
console.log(timestamp);



function saySerialList(){
    log('saySerialList function is activated')

    try {
        const serial_list = getGlobal('serial_list')
        let serial_detail_list = getGlobal('serial_detail_list')
        if (!serial_detail_list || serial_detail_list === '미수집') {
            serial_detail_list = []
        }
        if (serial_list != '미수집') {
            let message = ''

            const but_prev = createTextButton('더 예전 시리얼조회')
            const but_set = createTextButton('조회기간 지정')
            const buttons = [but_prev, but_set]
            let chatbot_task

            buttons.push(createTextButton('처음으로'))

            list_cards = []
            let serial_start = getGlobal('serial_start')
            let serial_end = getGlobal('serial_end')

            if (serial_start == '미수집' || serial_start == '0') {
                log('saySerialList : first serial list view')
                serial_start = '0'
                if (serial_list.length > 5) {
                    serial_end = '5'
                } else {
                    serial_end = serial_list.length
                }
                var getStartDateToSay = ''
                if(getGlobal)
                    setGlobal('serial_start', serial_start)
                setGlobal('serial_end', serial_end)

                message +=
                    `[시리얼 조회 기간]\n` +
                    `· ${getGlobal('start_date_to_say')}부터\n` +
                    `· ${getGlobal('end_date_to_say')}까지`
            } else {
                log('saySerialList : not first serial list view')
                log('serial_start : ' + serial_start)
                message +=
                    '시리얼 내역 건수가 5건을 초과하여, 나머지 시리얼 내역 건을 보여드릴게요.\n' +
                    (Number(serial_start) + 1).toString() +
                    '번째 시리얼 내역부터 표시됩니다.'
            }

            message +=
                '\n\n' +
                `· [더 예전 시리얼 내역 조회] : 3개월 간격으로 과거 시리얼내역을 조회합니다.`
            message +=
                '\n' +
                '· [조회기간 지정] : 내가 원하는 기간으로 시리얼' +
                ' 내역을 조회합니다. 최대 조회 가능 기간은 3개월입니다.'
            message +=
                '\n' +
                `· 나머지 시리얼 내역은 : 최대 5건의 시리얼 내역이 조회됩니다.` +
                `나머지 시리얼 내역 버튼을 누르면 나머지 시리얼 내역 건을 볼 수 있습니다.\n` +
                `· 시리얼 내역 취소를 하시려면 상세 보기 버튼을 누른후 진행해주세요.`

            serial_start = Number(serial_start)
            serial_end = Number(serial_end)

            if (serial_list.length != serial_end) {
                buttons.splice(
                    0,
                    0,
                    createTextButton('나머지 ', '나머지 시리얼 내역')
                )
            }


            if (serial_end > serial_detail_list.length) {
                auth_yn = ''
                var detail = []
                for (var i = serial_detail_list.length; i < serial_end; i++) {
                    log('getGlobal(enroll) : ' + getGlobal('enroll'))
                    log('serial_list.auth_yn : ' + serial_list[i]['auth_yn'])
                    if(getGlobal('enroll') == serial_list[i]['auth_yn']){
                        detail = searchSerialDetail(serial_list[i])
                    }
                    serial_detail_list.push(detail)
                }
                setGlobal('serial_detail_list', serial_detail_list)
            }
            if(detail === []){
                for (var i = serial_start; i < serial_end; i++) {
                    log('있다')
                    if (serial_detail_list[i]) {
                        log('serial detail ' + JSON.stringify(serial_detail_list[i]))
                        list_cards.push(createSerialCard(serial_detail_list[i], i))
                    }
                }
            }else{
                log('없다')
                var empty = ''
                if(getGlobal('Y')){
                    empty = '고객님의 2021년 8월 2일부터 2021년 11월 2일까지의 정품 인증 내역이 없는 것으로 조회됩니다.\n\n'
                    empty += '· [더 예전 내역 조회] 버튼을 누르면 3개월 간격으로 과거 정품 인증 내역을 조회합니다.\n'
                    empty += '· [조회기간 지정] 버튼을 누르면 기간을 지정하여 조회할 수 있습니다.\n'
                    empty += '· 최대 조회 가능 기간은 3개월입니다.'
                }else{
                    empty = '고객님의 2021년 8월 2일부터 2021년 11월 2일까지의 시리얼 넘버 발급 내역이 없는 것으로 조회됩니다.\n\n'
                    empty += '· 시리얼 넘버 조회와 정품 등록은 알림톡을 통한 별도 안내가 이루어진 후에 진행할 수 있습니다.\n'
                    empty += '· 시리얼 넘버 조회와 정품 등록은 알림톡을 통한 별도 안내가 이루어진 후에 진행할 수 있습니다.\n'
                    empty += '(알림톡은 배송 완료 후 2~3일 내 입력하신 핸드폰 번호로 발송됩니다.)\n'
                    empty += '· 쿠팡 로켓배송 토퍼 상품은 박스 내에 동봉된 별도의 삽지로 시리얼 넘버를 확인하실 수 있습니다.\n'
                    empty += '· [더 예전 내역 조회] 버튼을 누르면 3개월 간격으로 과거 시리얼 넘버 발급 내역을 조회합니다.\n'
                    empty += '· [조회기간 지정] 버튼을 누르면 기간을 지정하여 조회할 수 있습니다.\n'
                    empty += '· 최대 조회 가능 기간은 3개월입니다. '
                }
                return [
                    (createTextFormat([empty]))
                ]
            }
            const list_answer = []
            list_answer.push(createTextFormat([message]))
            list_answer.push(createCarousel(list_cards))
            list_answer.push(createButtonsFormat(buttons))
            return list_answer
        } else {
            log('saySerialList function result : serial_list 미수집')
            return [
                createTextFormat('죄송합니다. 일시적인 연결이 원활하지 않습니다.')
            ]
        }
    } catch (e) {
        log('saySerialList function try catch error : ')
        log(e)

        return [createTextFormat('죄송합니다. 일시적인 연결이 원활하지 않습니다.')]
    }
}
function searchSerialDetail(orderInfo) {

    log(
        'SearchSerialInfoDetail result for ' +
        ' serial_no(' +
        orderInfo.serial_no +
        ') : ' +
        ' orm_no(' +
        orderInfo.orm_no +
        ') : '
    )
    log(JSON.stringify(orderInfo, null, ' '))

    let start_dt = ''
    let finish_dt = ''
    let serial_no = ''
    let itm_nm = ''
    let order_qty = 1

    if (
        orderInfo != undefined &&
        orderInfo.length != 0 &&
        orderInfo.hasOwnProperty('error') === false
    ) {
        start_dt = orderInfo.start_dt
        finish_dt = orderInfo.finish_dt
        serial_no = orderInfo.serial_no
        itm_nm = orderInfo.itm_nm

        itm_nm = itm_nm.trim()
        if (order_qty > 1) {
            itm_nm += ` ${order_qty - 1}개`
        } else {
            itm_nm = itm_nm.substr(0, itm_nm.length - 2)
        }
    } else if(orderInfo === undefined || orderInfo.length === 0) {
        serial_no = '시리얼 번호 없음'
    } else {
        return undefined
    }

    return {
        serial_no,
        start_dt,
        finish_dt,
        itm_nm
    }
}
function createSerialCard(order, i) {
    const serial_no = order.serial_no
    const start_dt = order.start_dt
    const finish_dt = order.finish_dt
    const itm_nm = order.itm_nm

    const buttons = []

    let title = ''
    let body_text = start_dt + '접수 건' + '\n'
    body_text += itm_nm

    buttons.push(
        createTextButton('상세 보기', String(i + 1) + '번 상세 보기')
    )

    let image_url = getImageUrl('order_status_04')

    return createCard(title, body_text, image_url, buttons)
}


function buttonResponse(buttonList){

    return {"buttonsFormat" : {"buttons" : buttonList}};

}

a = [createButton("처음으로1", "처음으로1"), createButton("처음으로2", "처음으로2"), createButton("처음으로3", "처음으로3")]
function createButton(display, reaction) {
    var button = {
        display_text : display,
        reaction: {
            text : reaction,
        }
    };
    return button;
}

console.log(buttonResponse(a));
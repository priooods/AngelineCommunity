export default function Messages(code: Number, data: any, response: any) {
    if (code)
        response.json({
            'error_code': code,
            'message_code': 'Failure',
            'data': data
        })
    else
        response.json({
            'error_code': code,
            'message_code': "Success",
            'data': data
        })
}
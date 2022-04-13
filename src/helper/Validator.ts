export default function Validation(data: Array<Object>) {
    // email format
    const email_format = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // tampung field yang kosong
    const arrays: Array<String> = [];
    data.forEach(element => {
        // dapeting key sama value input
        for (const [key, value] of Object.entries(element)) {
            if (key === 'email' && !email_format.test(value)) // Check email formating
                arrays.push(" " + key + " anda tidak valid");        
            if (value === undefined || value == null || value === '') // Check kalau value nya kosong
                arrays.push(" " + key + " anda kosong")
        }
    });
    if(arrays.length > 0) return arrays // kalau ada yang kosong = false
    else return true // next
}
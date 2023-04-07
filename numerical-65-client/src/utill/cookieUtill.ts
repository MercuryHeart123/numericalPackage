import Cookies from 'universal-cookie'

export const getTokenFormCookie = (): string => {
    const cookies = new Cookies();
    const token = cookies.get('numericalToken');
    return token;
}

export const getHeaders = (token: string | null): { headers: { Authorization: string } } => {
    if (!token) {
        token = getTokenFormCookie();
    }

    let header = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
    return header
}

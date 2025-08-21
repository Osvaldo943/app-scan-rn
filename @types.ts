export type IProduct = {
    title: string,
    code:string,
    price: number,
    shop:string,
    image?:string
}

export type AppRoutes = {
    '/Home': undefined;
    '/ProductComparison/[code]': {code: string};
    '/NewProduct/[code]': {code: string};
    '/Camera': undefined;
}
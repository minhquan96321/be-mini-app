
export const Base = (body) => {
    return {
        "records": [
            {
                "fields": {
                    idbookcar: body.latsId,
                    username: body.username,
                    idrestaurant: body.idrestaurant,
                    addressStart: body.addressStart,
                    addressEnd: body.addressEnd,
                    vehicletype: body.vehicletype,
                    Paymentmethods: body.Paymentmethods,
                    SumPayable: body.SumPayable

                }
            }
        ]
    }
}
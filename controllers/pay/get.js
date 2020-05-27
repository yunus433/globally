const mongoose = require('mongoose');
const iyz = require('iyzipay');

const User = require('../../models/user/User');

module.exports = (req, res) => {
  request = {
    locale: iyz.LOCALE.TR,
    conversationId: '123456789',
    price: '1',
    paidPrice: '1.2',
    currency: iyz.CURRENCY.TRY,
    basketId: 'B67832',
    paymentGroup: iyz.PAYMENT_GROUP.PRODUCT,
    callbackUrl: 'https://www.merchant.com/callback',
    enabledInstallments: [2, 3, 6, 9],
    buyer: {
        id: 'BY789',
        name: 'John',
        surname: 'Doe',
        gsmNumber: '+905350000000',
        email: 'email@email.com',
        identityNumber: '74300864791',
        lastLoginDate: '2015-10-05 12:43:35',
        registrationDate: '2013-04-21 15:12:09',
        registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        ip: '85.34.78.112',
        city: 'Istanbul',
        country: 'Turkey',
        zipCode: '34732'
    },
    shippingAddress: {
        contactName: 'Jane Doe',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        zipCode: '34742'
    },
    billingAddress: {
        contactName: 'Jane Doe',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        zipCode: '34742'
    },
    basketItems: [
        {
            id: 'BI101',
            name: 'Binocular',
            category1: 'Collectibles',
            category2: 'Accessories',
            itemType: iyz.BASKET_ITEM_TYPE.PHYSICAL,
            price: '0.3'
        },
        {
            id: 'BI102',
            name: 'Game code',
            category1: 'Game',
            category2: 'Online Game Items',
            itemType: iyz.BASKET_ITEM_TYPE.VIRTUAL,
            price: '0.5'
        },
        {
            id: 'BI103',
            name: 'Usb',
            category1: 'Electronics',
            category2: 'Usb / Cable',
            itemType: iyz.BASKET_ITEM_TYPE.PHYSICAL,
            price: '0.2'
        }
    ]
  };

  User.findById(mongoose.Types.ObjectId(req.session.user._id), (err, user) => {
    if (err || !user) return res.redirect('/');

    req.iyzipay.checkoutFormInitialize.create(request, function (err, result) {

      return res.render('pay/index', {
        page: 'pay/index',
        title: "Ödeme Sayfası",
        includes: {
          external: ['css']
        },
        user: req.session.user,
        price: user.currentPrice,
        formContent: '{' + result.checkoutFormContent.split('<script type="text/javascript">')[1].split('</script>')[0] + '}'
      });    
    });
  });
}

window.onload = () => {
  addEventListener(document);
  
  const button = document.querySelector('#submit-button');
  const userId = document.getElementById('user-id').innerHTML;

  braintree.dropin.create({
    authorization: userId,
    container: '#dropin-container',
    translations: {
      cpayingWith: '{{paymentSource}} kullanılarak ödeme yapılıyor',
      chooseAnotherWayToPay: 'Ödemek için başka bir yol seçin',
      chooseAWayToPay: 'Ödeme yolunuzu seçin',
      otherWaysToPay: 'Diğer ödeme yolları',
      edit: 'Düzenle',
      doneEditing: 'Onayla',
      editPaymentMethods: 'Ödeme yollarını düzenle',
      CreditCardDeleteConfirmationMessage: '{{identifier}} ile bitin {{secondaryIdentifier}} kartını silmek istediğinize emin misiniz?',
      PayPalAccountDeleteConfirmationMessage: '{{identifier}} PayPal hesabını silmek istediğinize emin misiniz?',
      VenmoAccountDeleteConfirmationMessage: '{{identifier}} isimli kullanıcı hesabını silmek istediğinize emin misiniz?',
      genericDeleteConfirmationMessage: 'Bu ödeme yöntemini silmek istediğinize emin misiniz?',
      deleteCancelButton: 'İptal',
      deleteConfirmationButton: 'Sil',
      fieldEmptyForCvv: 'Lütfen kartınızın CVV\'sini girin.',
      fieldEmptyForExpirationDate: 'Lütfen kartınızın bitiş tarihini girin.',
      fieldEmptyForCardholderName: 'Lütfen kart sahibinin ismini girin.',
      fieldEmptyForNumber: 'Lütfen kart numaranızı girin.',
      fieldEmptyForPostalCode: 'Lütfen posta kodunuzu girin.',
      fieldInvalidForCvv: 'CVV doğru değil.',
      fieldInvalidForExpirationDate: 'Bitiş tarihi doğru değil.',
      fieldInvalidForNumber: 'Kart numarası doğru değil.',
      fieldInvalidForPostalCode: 'Posta kodu doğru değil.',
      fieldTooLongForCardholderName: 'Kart sahibi ismi 256 karakterden kısa olmalı.',
      genericError: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.',
      hostedFieldsTokenizationFailOnDuplicateError: 'Bu kredi kartı çoktan ödeme yöntemi olarak kaydedilmiş.',
      hostedFieldsFailedTokenizationError: 'Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.',
      hostedFieldsTokenizationCvvVerificationFailedError: 'Kredi kartı onaylanamadı. Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.',
      hostedFieldsTokenizationNetworkErrorError: 'Bağlantı hatası. Lütfen tekrar deneyin.',
      hostedFieldsFieldsInvalidError: 'Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.',
      paypalButtonMustBeUsed: 'PayPal\'ı ödeme yöntemi olarak kullan',
      paypalAccountTokenizationFailedError: 'PayPal hesabında bir sorun oluştu. Lütfen tekrar deneyin.',
      paypalFlowFailedError: 'PayPal\'a bağlanırken bir hata oluştu. Lütfen tekrar deneyin.',
      paypalTokenizationRequestActiveError: 'Lütfen bekleyin.',
      applePayTokenizationError: 'Bağlantı hatası oluştu. Lütfen tekrar deneyin.',
      applePayActiveCardError: 'Lütfen Apple Pay\'e geçerli bir kart numarası girin.',
      vaultManagerPaymentMethodDeletionError: 'Ödeme yöntemi silinemedi. Lütfen tekrar deneyin.',
      venmoCanceledError: 'Bir hata oluştu. Lütfen en son Venmo uygulamasını kullandığınıza ve tarayıcınızın Venmo\'ya bağlanmaya izin verdiğine emin olun',
      venmoAppFailedError: 'Venmo uygulaması bulunamadı.',
      unsupportedCardTypeError: 'Bu kart tipi desteklenmiyor. Lütfen başka bir kart deneyin.',
      // Card form
      cardholderNameLabel: 'Kart Sahibi İsmi',
      cardNumberLabel: 'Kart Numarası',
      cvvLabel: 'CVV',
      cvvThreeDigitLabelSubheading: '(3 digits)',
      cvvFourDigitLabelSubheading: '(4 digits)',
      expirationDateLabel: 'Bitiş Tarihi',
      expirationDateLabelSubheading: '(MM/YY)',
      cardholderNamePlaceholder: 'Kart Sahibi İsmi',
      expirationDatePlaceholder: 'MM/YY',
      postalCodeLabel: 'Posta Kodu',
      saveCardLabel: 'Kartı kaydet',
      payWithCard: 'Kart ile öde',
      endingIn: '{{lastFourCardDigits}} ile biten',
      Card: 'Kart',
      PayPal: 'PayPal',
      'PayPal Credit': 'PayPal Credit',
      'Apple Pay': 'Apple Pay',
      'Google Pay': 'Google Pay',
      'Venmo': 'Venmo',
      'American Express': 'American Express',
      Discover: 'Discover',
      'Diners Club': 'Diners Club',
      MasterCard: 'Mastercard',
      Visa: 'Visa',
      JCB: 'JCB',
      Maestro: 'Maestro',
      UnionPay: 'UnionPay'
    }
  }, (createErr, instance) => {

    button.addEventListener('click', () => {
      instance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
        if (requestPaymentMethodErr) return alert(requestPaymentMethodErr);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/pay");
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify({
          "nonce": payload.nonce
        }));
      
        xhr.onreadystatechange = () => {
          if (xhr.readyState == 4)
            return location.reload();
        }
      });
    });
  });
}

import LocalStorage from '../../../../utils/localStorage';

export function saveCustomerAddressToLocalStorage(addressId, isBillingSame) {
  LocalStorage.saveBillingSameAsShipping(isBillingSame);
  LocalStorage.saveCustomerShippingAddressId(addressId);

  if (isBillingSame) {
    LocalStorage.saveCustomerBillingAddressId(addressId);
  }
}
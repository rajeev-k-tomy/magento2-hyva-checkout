import { useEffect, useMemo } from 'react';
import _get from 'lodash.get';

import useAppContext from '../../../hook/useAppContext';
import { prepareCountryOptions, prepareCountryStateOptions } from '../utility';

export default function useCountryState({ fields, formikData }) {
  const { countryList, stateList } = useAppContext();
  const regionField = fields.region;
  const { selectedCountry, selectedRegion, setFieldValue } = formikData || {};

  // whenever the country is switched, we need to clear the state input
  useEffect(() => {
    if (selectedCountry) {
      const stateListContainsSelectedRegion =
        !stateList.length ||
        _get(stateList, selectedCountry, []).find(
          (state) => state.code === selectedRegion
        );

      if (!stateListContainsSelectedRegion) {
        setFieldValue(regionField, '');
      }
    }
  }, [selectedCountry, regionField, selectedRegion, stateList, setFieldValue]);

  const countryOptions = useMemo(
    () => prepareCountryOptions(countryList),
    [countryList]
  );

  const stateOptions = useMemo(
    () => prepareCountryStateOptions(stateList, selectedCountry),
    [stateList, selectedCountry]
  );

  return {
    countryOptions,
    stateOptions,
    hasStateOptions: !!stateOptions.length,
  };
}

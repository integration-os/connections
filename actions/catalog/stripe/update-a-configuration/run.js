const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    configuration,
    bbpos_wisepos_e,
    expand,
    tipping,
    verifone_p400,
    bbpos_wisepos_eSplashscreen,
    expand0,
    expand1,
    tippingAudFixed_amounts0,
    tippingAudFixed_amounts1,
    tippingAudPercentages0,
    tippingAudPercentages1,
    tippingAudSmart_tip_threshold,
    tippingCadFixed_amounts0,
    tippingCadFixed_amounts1,
    tippingCadPercentages0,
    tippingCadPercentages1,
    tippingCadSmart_tip_threshold,
    tippingChfFixed_amounts0,
    tippingChfFixed_amounts1,
    tippingChfPercentages0,
    tippingChfPercentages1,
    tippingChfSmart_tip_threshold,
    tippingCzkFixed_amounts0,
    tippingCzkFixed_amounts1,
    tippingCzkPercentages0,
    tippingCzkPercentages1,
    tippingCzkSmart_tip_threshold,
    tippingDkkFixed_amounts0,
    tippingDkkFixed_amounts1,
    tippingDkkPercentages0,
    tippingDkkPercentages1,
    tippingDkkSmart_tip_threshold,
    tippingEurFixed_amounts0,
    tippingEurFixed_amounts1,
    tippingEurPercentages0,
    tippingEurPercentages1,
    tippingEurSmart_tip_threshold,
    tippingGbpFixed_amounts0,
    tippingGbpFixed_amounts1,
    tippingGbpPercentages0,
    tippingGbpPercentages1,
    tippingGbpSmart_tip_threshold,
    tippingHkdFixed_amounts0,
    tippingHkdFixed_amounts1,
    tippingHkdPercentages0,
    tippingHkdPercentages1,
    tippingHkdSmart_tip_threshold,
    tippingMyrFixed_amounts0,
    tippingMyrFixed_amounts1,
    tippingMyrPercentages0,
    tippingMyrPercentages1,
    tippingMyrSmart_tip_threshold,
    tippingNokFixed_amounts0,
    tippingNokFixed_amounts1,
    tippingNokPercentages0,
    tippingNokPercentages1,
    tippingNokSmart_tip_threshold,
    tippingNzdFixed_amounts0,
    tippingNzdFixed_amounts1,
    tippingNzdPercentages0,
    tippingNzdPercentages1,
    tippingNzdSmart_tip_threshold,
    tippingSekFixed_amounts0,
    tippingSekFixed_amounts1,
    tippingSekPercentages0,
    tippingSekPercentages1,
    tippingSekSmart_tip_threshold,
    tippingSgdFixed_amounts0,
    tippingSgdFixed_amounts1,
    tippingSgdPercentages0,
    tippingSgdPercentages1,
    tippingSgdSmart_tip_threshold,
    tippingUsdFixed_amounts0,
    tippingUsdFixed_amounts1,
    tippingUsdPercentages0,
    tippingUsdPercentages1,
    tippingUsdSmart_tip_threshold,
    verifone_p400Splashscreen,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.stripe.com/v1/terminal/configurations/${configuration}`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(bbpos_wisepos_e ? { bbpos_wisepos_e } : {}),
        ...(expand ? { expand } : {}),
        ...(tipping ? { tipping } : {}),
        ...(verifone_p400 ? { verifone_p400 } : {}),
        ...(bbpos_wisepos_eSplashscreen
          ? { "bbpos_wisepos_e[splashscreen]": bbpos_wisepos_eSplashscreen }
          : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(tippingAudFixed_amounts0
          ? { "tipping[aud][fixed_amounts][0]": tippingAudFixed_amounts0 }
          : {}),
        ...(tippingAudFixed_amounts1
          ? { "tipping[aud][fixed_amounts][1]": tippingAudFixed_amounts1 }
          : {}),
        ...(tippingAudPercentages0
          ? { "tipping[aud][percentages][0]": tippingAudPercentages0 }
          : {}),
        ...(tippingAudPercentages1
          ? { "tipping[aud][percentages][1]": tippingAudPercentages1 }
          : {}),
        ...(tippingAudSmart_tip_threshold
          ? { "tipping[aud][smart_tip_threshold]": tippingAudSmart_tip_threshold }
          : {}),
        ...(tippingCadFixed_amounts0
          ? { "tipping[cad][fixed_amounts][0]": tippingCadFixed_amounts0 }
          : {}),
        ...(tippingCadFixed_amounts1
          ? { "tipping[cad][fixed_amounts][1]": tippingCadFixed_amounts1 }
          : {}),
        ...(tippingCadPercentages0
          ? { "tipping[cad][percentages][0]": tippingCadPercentages0 }
          : {}),
        ...(tippingCadPercentages1
          ? { "tipping[cad][percentages][1]": tippingCadPercentages1 }
          : {}),
        ...(tippingCadSmart_tip_threshold
          ? { "tipping[cad][smart_tip_threshold]": tippingCadSmart_tip_threshold }
          : {}),
        ...(tippingChfFixed_amounts0
          ? { "tipping[chf][fixed_amounts][0]": tippingChfFixed_amounts0 }
          : {}),
        ...(tippingChfFixed_amounts1
          ? { "tipping[chf][fixed_amounts][1]": tippingChfFixed_amounts1 }
          : {}),
        ...(tippingChfPercentages0
          ? { "tipping[chf][percentages][0]": tippingChfPercentages0 }
          : {}),
        ...(tippingChfPercentages1
          ? { "tipping[chf][percentages][1]": tippingChfPercentages1 }
          : {}),
        ...(tippingChfSmart_tip_threshold
          ? { "tipping[chf][smart_tip_threshold]": tippingChfSmart_tip_threshold }
          : {}),
        ...(tippingCzkFixed_amounts0
          ? { "tipping[czk][fixed_amounts][0]": tippingCzkFixed_amounts0 }
          : {}),
        ...(tippingCzkFixed_amounts1
          ? { "tipping[czk][fixed_amounts][1]": tippingCzkFixed_amounts1 }
          : {}),
        ...(tippingCzkPercentages0
          ? { "tipping[czk][percentages][0]": tippingCzkPercentages0 }
          : {}),
        ...(tippingCzkPercentages1
          ? { "tipping[czk][percentages][1]": tippingCzkPercentages1 }
          : {}),
        ...(tippingCzkSmart_tip_threshold
          ? { "tipping[czk][smart_tip_threshold]": tippingCzkSmart_tip_threshold }
          : {}),
        ...(tippingDkkFixed_amounts0
          ? { "tipping[dkk][fixed_amounts][0]": tippingDkkFixed_amounts0 }
          : {}),
        ...(tippingDkkFixed_amounts1
          ? { "tipping[dkk][fixed_amounts][1]": tippingDkkFixed_amounts1 }
          : {}),
        ...(tippingDkkPercentages0
          ? { "tipping[dkk][percentages][0]": tippingDkkPercentages0 }
          : {}),
        ...(tippingDkkPercentages1
          ? { "tipping[dkk][percentages][1]": tippingDkkPercentages1 }
          : {}),
        ...(tippingDkkSmart_tip_threshold
          ? { "tipping[dkk][smart_tip_threshold]": tippingDkkSmart_tip_threshold }
          : {}),
        ...(tippingEurFixed_amounts0
          ? { "tipping[eur][fixed_amounts][0]": tippingEurFixed_amounts0 }
          : {}),
        ...(tippingEurFixed_amounts1
          ? { "tipping[eur][fixed_amounts][1]": tippingEurFixed_amounts1 }
          : {}),
        ...(tippingEurPercentages0
          ? { "tipping[eur][percentages][0]": tippingEurPercentages0 }
          : {}),
        ...(tippingEurPercentages1
          ? { "tipping[eur][percentages][1]": tippingEurPercentages1 }
          : {}),
        ...(tippingEurSmart_tip_threshold
          ? { "tipping[eur][smart_tip_threshold]": tippingEurSmart_tip_threshold }
          : {}),
        ...(tippingGbpFixed_amounts0
          ? { "tipping[gbp][fixed_amounts][0]": tippingGbpFixed_amounts0 }
          : {}),
        ...(tippingGbpFixed_amounts1
          ? { "tipping[gbp][fixed_amounts][1]": tippingGbpFixed_amounts1 }
          : {}),
        ...(tippingGbpPercentages0
          ? { "tipping[gbp][percentages][0]": tippingGbpPercentages0 }
          : {}),
        ...(tippingGbpPercentages1
          ? { "tipping[gbp][percentages][1]": tippingGbpPercentages1 }
          : {}),
        ...(tippingGbpSmart_tip_threshold
          ? { "tipping[gbp][smart_tip_threshold]": tippingGbpSmart_tip_threshold }
          : {}),
        ...(tippingHkdFixed_amounts0
          ? { "tipping[hkd][fixed_amounts][0]": tippingHkdFixed_amounts0 }
          : {}),
        ...(tippingHkdFixed_amounts1
          ? { "tipping[hkd][fixed_amounts][1]": tippingHkdFixed_amounts1 }
          : {}),
        ...(tippingHkdPercentages0
          ? { "tipping[hkd][percentages][0]": tippingHkdPercentages0 }
          : {}),
        ...(tippingHkdPercentages1
          ? { "tipping[hkd][percentages][1]": tippingHkdPercentages1 }
          : {}),
        ...(tippingHkdSmart_tip_threshold
          ? { "tipping[hkd][smart_tip_threshold]": tippingHkdSmart_tip_threshold }
          : {}),
        ...(tippingMyrFixed_amounts0
          ? { "tipping[myr][fixed_amounts][0]": tippingMyrFixed_amounts0 }
          : {}),
        ...(tippingMyrFixed_amounts1
          ? { "tipping[myr][fixed_amounts][1]": tippingMyrFixed_amounts1 }
          : {}),
        ...(tippingMyrPercentages0
          ? { "tipping[myr][percentages][0]": tippingMyrPercentages0 }
          : {}),
        ...(tippingMyrPercentages1
          ? { "tipping[myr][percentages][1]": tippingMyrPercentages1 }
          : {}),
        ...(tippingMyrSmart_tip_threshold
          ? { "tipping[myr][smart_tip_threshold]": tippingMyrSmart_tip_threshold }
          : {}),
        ...(tippingNokFixed_amounts0
          ? { "tipping[nok][fixed_amounts][0]": tippingNokFixed_amounts0 }
          : {}),
        ...(tippingNokFixed_amounts1
          ? { "tipping[nok][fixed_amounts][1]": tippingNokFixed_amounts1 }
          : {}),
        ...(tippingNokPercentages0
          ? { "tipping[nok][percentages][0]": tippingNokPercentages0 }
          : {}),
        ...(tippingNokPercentages1
          ? { "tipping[nok][percentages][1]": tippingNokPercentages1 }
          : {}),
        ...(tippingNokSmart_tip_threshold
          ? { "tipping[nok][smart_tip_threshold]": tippingNokSmart_tip_threshold }
          : {}),
        ...(tippingNzdFixed_amounts0
          ? { "tipping[nzd][fixed_amounts][0]": tippingNzdFixed_amounts0 }
          : {}),
        ...(tippingNzdFixed_amounts1
          ? { "tipping[nzd][fixed_amounts][1]": tippingNzdFixed_amounts1 }
          : {}),
        ...(tippingNzdPercentages0
          ? { "tipping[nzd][percentages][0]": tippingNzdPercentages0 }
          : {}),
        ...(tippingNzdPercentages1
          ? { "tipping[nzd][percentages][1]": tippingNzdPercentages1 }
          : {}),
        ...(tippingNzdSmart_tip_threshold
          ? { "tipping[nzd][smart_tip_threshold]": tippingNzdSmart_tip_threshold }
          : {}),
        ...(tippingSekFixed_amounts0
          ? { "tipping[sek][fixed_amounts][0]": tippingSekFixed_amounts0 }
          : {}),
        ...(tippingSekFixed_amounts1
          ? { "tipping[sek][fixed_amounts][1]": tippingSekFixed_amounts1 }
          : {}),
        ...(tippingSekPercentages0
          ? { "tipping[sek][percentages][0]": tippingSekPercentages0 }
          : {}),
        ...(tippingSekPercentages1
          ? { "tipping[sek][percentages][1]": tippingSekPercentages1 }
          : {}),
        ...(tippingSekSmart_tip_threshold
          ? { "tipping[sek][smart_tip_threshold]": tippingSekSmart_tip_threshold }
          : {}),
        ...(tippingSgdFixed_amounts0
          ? { "tipping[sgd][fixed_amounts][0]": tippingSgdFixed_amounts0 }
          : {}),
        ...(tippingSgdFixed_amounts1
          ? { "tipping[sgd][fixed_amounts][1]": tippingSgdFixed_amounts1 }
          : {}),
        ...(tippingSgdPercentages0
          ? { "tipping[sgd][percentages][0]": tippingSgdPercentages0 }
          : {}),
        ...(tippingSgdPercentages1
          ? { "tipping[sgd][percentages][1]": tippingSgdPercentages1 }
          : {}),
        ...(tippingSgdSmart_tip_threshold
          ? { "tipping[sgd][smart_tip_threshold]": tippingSgdSmart_tip_threshold }
          : {}),
        ...(tippingUsdFixed_amounts0
          ? { "tipping[usd][fixed_amounts][0]": tippingUsdFixed_amounts0 }
          : {}),
        ...(tippingUsdFixed_amounts1
          ? { "tipping[usd][fixed_amounts][1]": tippingUsdFixed_amounts1 }
          : {}),
        ...(tippingUsdPercentages0
          ? { "tipping[usd][percentages][0]": tippingUsdPercentages0 }
          : {}),
        ...(tippingUsdPercentages1
          ? { "tipping[usd][percentages][1]": tippingUsdPercentages1 }
          : {}),
        ...(tippingUsdSmart_tip_threshold
          ? { "tipping[usd][smart_tip_threshold]": tippingUsdSmart_tip_threshold }
          : {}),
        ...(verifone_p400Splashscreen
          ? { "verifone_p400[splashscreen]": verifone_p400Splashscreen }
          : {}),
      }),
    });

    return data;
  } catch (error) {
    return {
      failed: true,
      message: error?.message,
      data: error?.response?.data,
    };
  }
};

/**
 * Verifies the input parameters
 */
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, configuration }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_CONFIGURATION: "A valid configuration field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof configuration !== "string") throw new Error(ERRORS.INVALID_CONFIGURATION);
};

const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    account_token,
    bank_account,
    business_profile,
    business_type,
    capabilities,
    company,
    country,
    default_currency,
    documents,
    email,
    expand,
    external_account,
    individual,
    metadata,
    settings,
    tos_acceptance,
    type,
    bank_accountAccount_number,
    bank_accountCountry,
    bank_accountAccount_holder_name,
    bank_accountAccount_holder_type,
    bank_accountAccount_type,
    bank_accountCurrency,
    bank_accountObject,
    bank_accountRouting_number,
    business_profileMcc,
    business_profileName,
    business_profileProduct_description,
    business_profileSupport_addressCity,
    business_profileSupport_addressCountry,
    business_profileSupport_addressLine1,
    business_profileSupport_addressLine2,
    business_profileSupport_addressPostal_code,
    business_profileSupport_addressState,
    business_profileSupport_email,
    business_profileSupport_phone,
    business_profileSupport_url,
    business_profileUrl,
    capabilitiesAcss_debit_paymentsRequested,
    capabilitiesAffirm_paymentsRequested,
    capabilitiesAfterpay_clearpay_paymentsRequested,
    capabilitiesAu_becs_debit_paymentsRequested,
    capabilitiesBacs_debit_paymentsRequested,
    capabilitiesBancontact_paymentsRequested,
    capabilitiesBank_transfer_paymentsRequested,
    capabilitiesBlik_paymentsRequested,
    capabilitiesBoleto_paymentsRequested,
    capabilitiesCard_issuingRequested,
    capabilitiesCard_paymentsRequested,
    capabilitiesCartes_bancaires_paymentsRequested,
    capabilitiesEps_paymentsRequested,
    capabilitiesFpx_paymentsRequested,
    capabilitiesGiropay_paymentsRequested,
    capabilitiesGrabpay_paymentsRequested,
    capabilitiesIdeal_paymentsRequested,
    capabilitiesJcb_paymentsRequested,
    capabilitiesKlarna_paymentsRequested,
    capabilitiesKonbini_paymentsRequested,
    capabilitiesLegacy_paymentsRequested,
    capabilitiesLink_paymentsRequested,
    capabilitiesOxxo_paymentsRequested,
    capabilitiesP24_paymentsRequested,
    capabilitiesPaynow_paymentsRequested,
    capabilitiesPromptpay_paymentsRequested,
    capabilitiesSepa_debit_paymentsRequested,
    capabilitiesSofort_paymentsRequested,
    capabilitiesTax_reporting_us_1099_kRequested,
    capabilitiesTax_reporting_us_1099_miscRequested,
    capabilitiesTransfersRequested,
    capabilitiesTreasuryRequested,
    capabilitiesUs_bank_account_ach_paymentsRequested,
    companyAddressCity,
    companyAddressCountry,
    companyAddressLine1,
    companyAddressLine2,
    companyAddressPostal_code,
    companyAddressState,
    companyAddress_kanaCity,
    companyAddress_kanaCountry,
    companyAddress_kanaLine1,
    companyAddress_kanaLine2,
    companyAddress_kanaPostal_code,
    companyAddress_kanaState,
    companyAddress_kanaTown,
    companyAddress_kanjiCity,
    companyAddress_kanjiCountry,
    companyAddress_kanjiLine1,
    companyAddress_kanjiLine2,
    companyAddress_kanjiPostal_code,
    companyAddress_kanjiState,
    companyAddress_kanjiTown,
    companyDirectors_provided,
    companyExecutives_provided,
    companyName,
    companyName_kana,
    companyName_kanji,
    companyOwners_provided,
    companyOwnership_declarationDate,
    companyOwnership_declarationIp,
    companyOwnership_declarationUser_agent,
    companyPhone,
    companyRegistration_number,
    companyStructure,
    companyTax_id,
    companyTax_id_registrar,
    companyVat_id,
    companyVerificationDocumentBack,
    companyVerificationDocumentFront,
    documentsBank_account_ownership_verificationFiles0,
    documentsBank_account_ownership_verificationFiles1,
    documentsCompany_licenseFiles0,
    documentsCompany_licenseFiles1,
    documentsCompany_memorandum_of_associationFiles0,
    documentsCompany_memorandum_of_associationFiles1,
    documentsCompany_ministerial_decreeFiles0,
    documentsCompany_ministerial_decreeFiles1,
    documentsCompany_registration_verificationFiles0,
    documentsCompany_registration_verificationFiles1,
    documentsCompany_tax_id_verificationFiles0,
    documentsCompany_tax_id_verificationFiles1,
    documentsProof_of_registrationFiles0,
    documentsProof_of_registrationFiles1,
    expand0,
    expand1,
    individualAddressCity,
    individualAddressCountry,
    individualAddressLine1,
    individualAddressLine2,
    individualAddressPostal_code,
    individualAddressState,
    individualAddress_kanaCity,
    individualAddress_kanaCountry,
    individualAddress_kanaLine1,
    individualAddress_kanaLine2,
    individualAddress_kanaPostal_code,
    individualAddress_kanaState,
    individualAddress_kanaTown,
    individualAddress_kanjiCity,
    individualAddress_kanjiCountry,
    individualAddress_kanjiLine1,
    individualAddress_kanjiLine2,
    individualAddress_kanjiPostal_code,
    individualAddress_kanjiState,
    individualAddress_kanjiTown,
    individualDobDay,
    individualDobMonth,
    individualDobYear,
    individualEmail,
    individualFirst_name,
    individualFirst_name_kana,
    individualFirst_name_kanji,
    individualFull_name_aliases0,
    individualFull_name_aliases1,
    individualGender,
    individualId_number,
    individualId_number_secondary,
    individualLast_name,
    individualLast_name_kana,
    individualLast_name_kanji,
    individualMaiden_name,
    individualMetadata,
    individualPhone,
    individualPolitical_exposure,
    individualRegistered_addressCity,
    individualRegistered_addressCountry,
    individualRegistered_addressLine1,
    individualRegistered_addressLine2,
    individualRegistered_addressPostal_code,
    individualRegistered_addressState,
    individualSsn_last_4,
    individualVerificationAdditional_documentBack,
    individualVerificationAdditional_documentFront,
    individualVerificationDocumentBack,
    individualVerificationDocumentFront,
    settingsBrandingIcon,
    settingsBrandingLogo,
    settingsBrandingPrimary_color,
    settingsBrandingSecondary_color,
    settingsCard_issuingTos_acceptanceDate,
    settingsCard_issuingTos_acceptanceIp,
    settingsCard_issuingTos_acceptanceUser_agent,
    settingsCard_paymentsDecline_onAvs_failure,
    settingsCard_paymentsDecline_onCvc_failure,
    settingsCard_paymentsStatement_descriptor_prefix,
    settingsCard_paymentsStatement_descriptor_prefix_kana,
    settingsCard_paymentsStatement_descriptor_prefix_kanji,
    settingsPaymentsStatement_descriptor,
    settingsPaymentsStatement_descriptor_kana,
    settingsPaymentsStatement_descriptor_kanji,
    settingsPayoutsDebit_negative_balances,
    settingsPayoutsScheduleDelay_days,
    settingsPayoutsScheduleInterval,
    settingsPayoutsScheduleMonthly_anchor,
    settingsPayoutsScheduleWeekly_anchor,
    settingsPayoutsStatement_descriptor,
    settingsTreasuryTos_acceptanceDate,
    settingsTreasuryTos_acceptanceIp,
    settingsTreasuryTos_acceptanceUser_agent,
    tos_acceptanceDate,
    tos_acceptanceIp,
    tos_acceptanceService_agreement,
    tos_acceptanceUser_agent,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/accounts",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(account_token ? { account_token } : {}),
        ...(bank_account ? { bank_account } : {}),
        ...(business_profile ? { business_profile } : {}),
        ...(business_type ? { business_type } : {}),
        ...(capabilities ? { capabilities } : {}),
        ...(company ? { company } : {}),
        ...(country ? { country } : {}),
        ...(default_currency ? { default_currency } : {}),
        ...(documents ? { documents } : {}),
        ...(email ? { email } : {}),
        ...(expand ? { expand } : {}),
        ...(external_account ? { external_account } : {}),
        ...(individual ? { individual } : {}),
        ...(metadata ? { metadata } : {}),
        ...(settings ? { settings } : {}),
        ...(tos_acceptance ? { tos_acceptance } : {}),
        ...(type ? { type } : {}),
        ...(bank_accountAccount_number
          ? { "bank_account[account_number]": bank_accountAccount_number }
          : {}),
        ...(bank_accountCountry ? { "bank_account[country]": bank_accountCountry } : {}),
        ...(bank_accountAccount_holder_name
          ? { "bank_account[account_holder_name]": bank_accountAccount_holder_name }
          : {}),
        ...(bank_accountAccount_holder_type
          ? { "bank_account[account_holder_type]": bank_accountAccount_holder_type }
          : {}),
        ...(bank_accountAccount_type
          ? { "bank_account[account_type]": bank_accountAccount_type }
          : {}),
        ...(bank_accountCurrency ? { "bank_account[currency]": bank_accountCurrency } : {}),
        ...(bank_accountObject ? { "bank_account[object]": bank_accountObject } : {}),
        ...(bank_accountRouting_number
          ? { "bank_account[routing_number]": bank_accountRouting_number }
          : {}),
        ...(business_profileMcc ? { "business_profile[mcc]": business_profileMcc } : {}),
        ...(business_profileName ? { "business_profile[name]": business_profileName } : {}),
        ...(business_profileProduct_description
          ? { "business_profile[product_description]": business_profileProduct_description }
          : {}),
        ...(business_profileSupport_addressCity
          ? { "business_profile[support_address][city]": business_profileSupport_addressCity }
          : {}),
        ...(business_profileSupport_addressCountry
          ? { "business_profile[support_address][country]": business_profileSupport_addressCountry }
          : {}),
        ...(business_profileSupport_addressLine1
          ? { "business_profile[support_address][line1]": business_profileSupport_addressLine1 }
          : {}),
        ...(business_profileSupport_addressLine2
          ? { "business_profile[support_address][line2]": business_profileSupport_addressLine2 }
          : {}),
        ...(business_profileSupport_addressPostal_code
          ? {
              "business_profile[support_address][postal_code]":
                business_profileSupport_addressPostal_code,
            }
          : {}),
        ...(business_profileSupport_addressState
          ? { "business_profile[support_address][state]": business_profileSupport_addressState }
          : {}),
        ...(business_profileSupport_email
          ? { "business_profile[support_email]": business_profileSupport_email }
          : {}),
        ...(business_profileSupport_phone
          ? { "business_profile[support_phone]": business_profileSupport_phone }
          : {}),
        ...(business_profileSupport_url
          ? { "business_profile[support_url]": business_profileSupport_url }
          : {}),
        ...(business_profileUrl ? { "business_profile[url]": business_profileUrl } : {}),
        ...(capabilitiesAcss_debit_paymentsRequested
          ? {
              "capabilities[acss_debit_payments][requested]":
                capabilitiesAcss_debit_paymentsRequested,
            }
          : {}),
        ...(capabilitiesAffirm_paymentsRequested
          ? { "capabilities[affirm_payments][requested]": capabilitiesAffirm_paymentsRequested }
          : {}),
        ...(capabilitiesAfterpay_clearpay_paymentsRequested
          ? {
              "capabilities[afterpay_clearpay_payments][requested]":
                capabilitiesAfterpay_clearpay_paymentsRequested,
            }
          : {}),
        ...(capabilitiesAu_becs_debit_paymentsRequested
          ? {
              "capabilities[au_becs_debit_payments][requested]":
                capabilitiesAu_becs_debit_paymentsRequested,
            }
          : {}),
        ...(capabilitiesBacs_debit_paymentsRequested
          ? {
              "capabilities[bacs_debit_payments][requested]":
                capabilitiesBacs_debit_paymentsRequested,
            }
          : {}),
        ...(capabilitiesBancontact_paymentsRequested
          ? {
              "capabilities[bancontact_payments][requested]":
                capabilitiesBancontact_paymentsRequested,
            }
          : {}),
        ...(capabilitiesBank_transfer_paymentsRequested
          ? {
              "capabilities[bank_transfer_payments][requested]":
                capabilitiesBank_transfer_paymentsRequested,
            }
          : {}),
        ...(capabilitiesBlik_paymentsRequested
          ? { "capabilities[blik_payments][requested]": capabilitiesBlik_paymentsRequested }
          : {}),
        ...(capabilitiesBoleto_paymentsRequested
          ? { "capabilities[boleto_payments][requested]": capabilitiesBoleto_paymentsRequested }
          : {}),
        ...(capabilitiesCard_issuingRequested
          ? { "capabilities[card_issuing][requested]": capabilitiesCard_issuingRequested }
          : {}),
        ...(capabilitiesCard_paymentsRequested
          ? { "capabilities[card_payments][requested]": capabilitiesCard_paymentsRequested }
          : {}),
        ...(capabilitiesCartes_bancaires_paymentsRequested
          ? {
              "capabilities[cartes_bancaires_payments][requested]":
                capabilitiesCartes_bancaires_paymentsRequested,
            }
          : {}),
        ...(capabilitiesEps_paymentsRequested
          ? { "capabilities[eps_payments][requested]": capabilitiesEps_paymentsRequested }
          : {}),
        ...(capabilitiesFpx_paymentsRequested
          ? { "capabilities[fpx_payments][requested]": capabilitiesFpx_paymentsRequested }
          : {}),
        ...(capabilitiesGiropay_paymentsRequested
          ? { "capabilities[giropay_payments][requested]": capabilitiesGiropay_paymentsRequested }
          : {}),
        ...(capabilitiesGrabpay_paymentsRequested
          ? { "capabilities[grabpay_payments][requested]": capabilitiesGrabpay_paymentsRequested }
          : {}),
        ...(capabilitiesIdeal_paymentsRequested
          ? { "capabilities[ideal_payments][requested]": capabilitiesIdeal_paymentsRequested }
          : {}),
        ...(capabilitiesJcb_paymentsRequested
          ? { "capabilities[jcb_payments][requested]": capabilitiesJcb_paymentsRequested }
          : {}),
        ...(capabilitiesKlarna_paymentsRequested
          ? { "capabilities[klarna_payments][requested]": capabilitiesKlarna_paymentsRequested }
          : {}),
        ...(capabilitiesKonbini_paymentsRequested
          ? { "capabilities[konbini_payments][requested]": capabilitiesKonbini_paymentsRequested }
          : {}),
        ...(capabilitiesLegacy_paymentsRequested
          ? { "capabilities[legacy_payments][requested]": capabilitiesLegacy_paymentsRequested }
          : {}),
        ...(capabilitiesLink_paymentsRequested
          ? { "capabilities[link_payments][requested]": capabilitiesLink_paymentsRequested }
          : {}),
        ...(capabilitiesOxxo_paymentsRequested
          ? { "capabilities[oxxo_payments][requested]": capabilitiesOxxo_paymentsRequested }
          : {}),
        ...(capabilitiesP24_paymentsRequested
          ? { "capabilities[p24_payments][requested]": capabilitiesP24_paymentsRequested }
          : {}),
        ...(capabilitiesPaynow_paymentsRequested
          ? { "capabilities[paynow_payments][requested]": capabilitiesPaynow_paymentsRequested }
          : {}),
        ...(capabilitiesPromptpay_paymentsRequested
          ? {
              "capabilities[promptpay_payments][requested]":
                capabilitiesPromptpay_paymentsRequested,
            }
          : {}),
        ...(capabilitiesSepa_debit_paymentsRequested
          ? {
              "capabilities[sepa_debit_payments][requested]":
                capabilitiesSepa_debit_paymentsRequested,
            }
          : {}),
        ...(capabilitiesSofort_paymentsRequested
          ? { "capabilities[sofort_payments][requested]": capabilitiesSofort_paymentsRequested }
          : {}),
        ...(capabilitiesTax_reporting_us_1099_kRequested
          ? {
              "capabilities[tax_reporting_us_1099_k][requested]":
                capabilitiesTax_reporting_us_1099_kRequested,
            }
          : {}),
        ...(capabilitiesTax_reporting_us_1099_miscRequested
          ? {
              "capabilities[tax_reporting_us_1099_misc][requested]":
                capabilitiesTax_reporting_us_1099_miscRequested,
            }
          : {}),
        ...(capabilitiesTransfersRequested
          ? { "capabilities[transfers][requested]": capabilitiesTransfersRequested }
          : {}),
        ...(capabilitiesTreasuryRequested
          ? { "capabilities[treasury][requested]": capabilitiesTreasuryRequested }
          : {}),
        ...(capabilitiesUs_bank_account_ach_paymentsRequested
          ? {
              "capabilities[us_bank_account_ach_payments][requested]":
                capabilitiesUs_bank_account_ach_paymentsRequested,
            }
          : {}),
        ...(companyAddressCity ? { "company[address][city]": companyAddressCity } : {}),
        ...(companyAddressCountry ? { "company[address][country]": companyAddressCountry } : {}),
        ...(companyAddressLine1 ? { "company[address][line1]": companyAddressLine1 } : {}),
        ...(companyAddressLine2 ? { "company[address][line2]": companyAddressLine2 } : {}),
        ...(companyAddressPostal_code
          ? { "company[address][postal_code]": companyAddressPostal_code }
          : {}),
        ...(companyAddressState ? { "company[address][state]": companyAddressState } : {}),
        ...(companyAddress_kanaCity
          ? { "company[address_kana][city]": companyAddress_kanaCity }
          : {}),
        ...(companyAddress_kanaCountry
          ? { "company[address_kana][country]": companyAddress_kanaCountry }
          : {}),
        ...(companyAddress_kanaLine1
          ? { "company[address_kana][line1]": companyAddress_kanaLine1 }
          : {}),
        ...(companyAddress_kanaLine2
          ? { "company[address_kana][line2]": companyAddress_kanaLine2 }
          : {}),
        ...(companyAddress_kanaPostal_code
          ? { "company[address_kana][postal_code]": companyAddress_kanaPostal_code }
          : {}),
        ...(companyAddress_kanaState
          ? { "company[address_kana][state]": companyAddress_kanaState }
          : {}),
        ...(companyAddress_kanaTown
          ? { "company[address_kana][town]": companyAddress_kanaTown }
          : {}),
        ...(companyAddress_kanjiCity
          ? { "company[address_kanji][city]": companyAddress_kanjiCity }
          : {}),
        ...(companyAddress_kanjiCountry
          ? { "company[address_kanji][country]": companyAddress_kanjiCountry }
          : {}),
        ...(companyAddress_kanjiLine1
          ? { "company[address_kanji][line1]": companyAddress_kanjiLine1 }
          : {}),
        ...(companyAddress_kanjiLine2
          ? { "company[address_kanji][line2]": companyAddress_kanjiLine2 }
          : {}),
        ...(companyAddress_kanjiPostal_code
          ? { "company[address_kanji][postal_code]": companyAddress_kanjiPostal_code }
          : {}),
        ...(companyAddress_kanjiState
          ? { "company[address_kanji][state]": companyAddress_kanjiState }
          : {}),
        ...(companyAddress_kanjiTown
          ? { "company[address_kanji][town]": companyAddress_kanjiTown }
          : {}),
        ...(companyDirectors_provided
          ? { "company[directors_provided]": companyDirectors_provided }
          : {}),
        ...(companyExecutives_provided
          ? { "company[executives_provided]": companyExecutives_provided }
          : {}),
        ...(companyName ? { "company[name]": companyName } : {}),
        ...(companyName_kana ? { "company[name_kana]": companyName_kana } : {}),
        ...(companyName_kanji ? { "company[name_kanji]": companyName_kanji } : {}),
        ...(companyOwners_provided ? { "company[owners_provided]": companyOwners_provided } : {}),
        ...(companyOwnership_declarationDate
          ? { "company[ownership_declaration][date]": companyOwnership_declarationDate }
          : {}),
        ...(companyOwnership_declarationIp
          ? { "company[ownership_declaration][ip]": companyOwnership_declarationIp }
          : {}),
        ...(companyOwnership_declarationUser_agent
          ? { "company[ownership_declaration][user_agent]": companyOwnership_declarationUser_agent }
          : {}),
        ...(companyPhone ? { "company[phone]": companyPhone } : {}),
        ...(companyRegistration_number
          ? { "company[registration_number]": companyRegistration_number }
          : {}),
        ...(companyStructure ? { "company[structure]": companyStructure } : {}),
        ...(companyTax_id ? { "company[tax_id]": companyTax_id } : {}),
        ...(companyTax_id_registrar
          ? { "company[tax_id_registrar]": companyTax_id_registrar }
          : {}),
        ...(companyVat_id ? { "company[vat_id]": companyVat_id } : {}),
        ...(companyVerificationDocumentBack
          ? { "company[verification][document][back]": companyVerificationDocumentBack }
          : {}),
        ...(companyVerificationDocumentFront
          ? { "company[verification][document][front]": companyVerificationDocumentFront }
          : {}),
        ...(documentsBank_account_ownership_verificationFiles0
          ? {
              "documents[bank_account_ownership_verification][files][0]":
                documentsBank_account_ownership_verificationFiles0,
            }
          : {}),
        ...(documentsBank_account_ownership_verificationFiles1
          ? {
              "documents[bank_account_ownership_verification][files][1]":
                documentsBank_account_ownership_verificationFiles1,
            }
          : {}),
        ...(documentsCompany_licenseFiles0
          ? { "documents[company_license][files][0]": documentsCompany_licenseFiles0 }
          : {}),
        ...(documentsCompany_licenseFiles1
          ? { "documents[company_license][files][1]": documentsCompany_licenseFiles1 }
          : {}),
        ...(documentsCompany_memorandum_of_associationFiles0
          ? {
              "documents[company_memorandum_of_association][files][0]":
                documentsCompany_memorandum_of_associationFiles0,
            }
          : {}),
        ...(documentsCompany_memorandum_of_associationFiles1
          ? {
              "documents[company_memorandum_of_association][files][1]":
                documentsCompany_memorandum_of_associationFiles1,
            }
          : {}),
        ...(documentsCompany_ministerial_decreeFiles0
          ? {
              "documents[company_ministerial_decree][files][0]":
                documentsCompany_ministerial_decreeFiles0,
            }
          : {}),
        ...(documentsCompany_ministerial_decreeFiles1
          ? {
              "documents[company_ministerial_decree][files][1]":
                documentsCompany_ministerial_decreeFiles1,
            }
          : {}),
        ...(documentsCompany_registration_verificationFiles0
          ? {
              "documents[company_registration_verification][files][0]":
                documentsCompany_registration_verificationFiles0,
            }
          : {}),
        ...(documentsCompany_registration_verificationFiles1
          ? {
              "documents[company_registration_verification][files][1]":
                documentsCompany_registration_verificationFiles1,
            }
          : {}),
        ...(documentsCompany_tax_id_verificationFiles0
          ? {
              "documents[company_tax_id_verification][files][0]":
                documentsCompany_tax_id_verificationFiles0,
            }
          : {}),
        ...(documentsCompany_tax_id_verificationFiles1
          ? {
              "documents[company_tax_id_verification][files][1]":
                documentsCompany_tax_id_verificationFiles1,
            }
          : {}),
        ...(documentsProof_of_registrationFiles0
          ? { "documents[proof_of_registration][files][0]": documentsProof_of_registrationFiles0 }
          : {}),
        ...(documentsProof_of_registrationFiles1
          ? { "documents[proof_of_registration][files][1]": documentsProof_of_registrationFiles1 }
          : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(individualAddressCity ? { "individual[address][city]": individualAddressCity } : {}),
        ...(individualAddressCountry
          ? { "individual[address][country]": individualAddressCountry }
          : {}),
        ...(individualAddressLine1 ? { "individual[address][line1]": individualAddressLine1 } : {}),
        ...(individualAddressLine2 ? { "individual[address][line2]": individualAddressLine2 } : {}),
        ...(individualAddressPostal_code
          ? { "individual[address][postal_code]": individualAddressPostal_code }
          : {}),
        ...(individualAddressState ? { "individual[address][state]": individualAddressState } : {}),
        ...(individualAddress_kanaCity
          ? { "individual[address_kana][city]": individualAddress_kanaCity }
          : {}),
        ...(individualAddress_kanaCountry
          ? { "individual[address_kana][country]": individualAddress_kanaCountry }
          : {}),
        ...(individualAddress_kanaLine1
          ? { "individual[address_kana][line1]": individualAddress_kanaLine1 }
          : {}),
        ...(individualAddress_kanaLine2
          ? { "individual[address_kana][line2]": individualAddress_kanaLine2 }
          : {}),
        ...(individualAddress_kanaPostal_code
          ? { "individual[address_kana][postal_code]": individualAddress_kanaPostal_code }
          : {}),
        ...(individualAddress_kanaState
          ? { "individual[address_kana][state]": individualAddress_kanaState }
          : {}),
        ...(individualAddress_kanaTown
          ? { "individual[address_kana][town]": individualAddress_kanaTown }
          : {}),
        ...(individualAddress_kanjiCity
          ? { "individual[address_kanji][city]": individualAddress_kanjiCity }
          : {}),
        ...(individualAddress_kanjiCountry
          ? { "individual[address_kanji][country]": individualAddress_kanjiCountry }
          : {}),
        ...(individualAddress_kanjiLine1
          ? { "individual[address_kanji][line1]": individualAddress_kanjiLine1 }
          : {}),
        ...(individualAddress_kanjiLine2
          ? { "individual[address_kanji][line2]": individualAddress_kanjiLine2 }
          : {}),
        ...(individualAddress_kanjiPostal_code
          ? { "individual[address_kanji][postal_code]": individualAddress_kanjiPostal_code }
          : {}),
        ...(individualAddress_kanjiState
          ? { "individual[address_kanji][state]": individualAddress_kanjiState }
          : {}),
        ...(individualAddress_kanjiTown
          ? { "individual[address_kanji][town]": individualAddress_kanjiTown }
          : {}),
        ...(individualDobDay ? { "individual[dob][day]": individualDobDay } : {}),
        ...(individualDobMonth ? { "individual[dob][month]": individualDobMonth } : {}),
        ...(individualDobYear ? { "individual[dob][year]": individualDobYear } : {}),
        ...(individualEmail ? { "individual[email]": individualEmail } : {}),
        ...(individualFirst_name ? { "individual[first_name]": individualFirst_name } : {}),
        ...(individualFirst_name_kana
          ? { "individual[first_name_kana]": individualFirst_name_kana }
          : {}),
        ...(individualFirst_name_kanji
          ? { "individual[first_name_kanji]": individualFirst_name_kanji }
          : {}),
        ...(individualFull_name_aliases0
          ? { "individual[full_name_aliases][0]": individualFull_name_aliases0 }
          : {}),
        ...(individualFull_name_aliases1
          ? { "individual[full_name_aliases][1]": individualFull_name_aliases1 }
          : {}),
        ...(individualGender ? { "individual[gender]": individualGender } : {}),
        ...(individualId_number ? { "individual[id_number]": individualId_number } : {}),
        ...(individualId_number_secondary
          ? { "individual[id_number_secondary]": individualId_number_secondary }
          : {}),
        ...(individualLast_name ? { "individual[last_name]": individualLast_name } : {}),
        ...(individualLast_name_kana
          ? { "individual[last_name_kana]": individualLast_name_kana }
          : {}),
        ...(individualLast_name_kanji
          ? { "individual[last_name_kanji]": individualLast_name_kanji }
          : {}),
        ...(individualMaiden_name ? { "individual[maiden_name]": individualMaiden_name } : {}),
        ...(individualMetadata ? { "individual[metadata]": individualMetadata } : {}),
        ...(individualPhone ? { "individual[phone]": individualPhone } : {}),
        ...(individualPolitical_exposure
          ? { "individual[political_exposure]": individualPolitical_exposure }
          : {}),
        ...(individualRegistered_addressCity
          ? { "individual[registered_address][city]": individualRegistered_addressCity }
          : {}),
        ...(individualRegistered_addressCountry
          ? { "individual[registered_address][country]": individualRegistered_addressCountry }
          : {}),
        ...(individualRegistered_addressLine1
          ? { "individual[registered_address][line1]": individualRegistered_addressLine1 }
          : {}),
        ...(individualRegistered_addressLine2
          ? { "individual[registered_address][line2]": individualRegistered_addressLine2 }
          : {}),
        ...(individualRegistered_addressPostal_code
          ? {
              "individual[registered_address][postal_code]":
                individualRegistered_addressPostal_code,
            }
          : {}),
        ...(individualRegistered_addressState
          ? { "individual[registered_address][state]": individualRegistered_addressState }
          : {}),
        ...(individualSsn_last_4 ? { "individual[ssn_last_4]": individualSsn_last_4 } : {}),
        ...(individualVerificationAdditional_documentBack
          ? {
              "individual[verification][additional_document][back]":
                individualVerificationAdditional_documentBack,
            }
          : {}),
        ...(individualVerificationAdditional_documentFront
          ? {
              "individual[verification][additional_document][front]":
                individualVerificationAdditional_documentFront,
            }
          : {}),
        ...(individualVerificationDocumentBack
          ? { "individual[verification][document][back]": individualVerificationDocumentBack }
          : {}),
        ...(individualVerificationDocumentFront
          ? { "individual[verification][document][front]": individualVerificationDocumentFront }
          : {}),
        ...(settingsBrandingIcon ? { "settings[branding][icon]": settingsBrandingIcon } : {}),
        ...(settingsBrandingLogo ? { "settings[branding][logo]": settingsBrandingLogo } : {}),
        ...(settingsBrandingPrimary_color
          ? { "settings[branding][primary_color]": settingsBrandingPrimary_color }
          : {}),
        ...(settingsBrandingSecondary_color
          ? { "settings[branding][secondary_color]": settingsBrandingSecondary_color }
          : {}),
        ...(settingsCard_issuingTos_acceptanceDate
          ? {
              "settings[card_issuing][tos_acceptance][date]":
                settingsCard_issuingTos_acceptanceDate,
            }
          : {}),
        ...(settingsCard_issuingTos_acceptanceIp
          ? { "settings[card_issuing][tos_acceptance][ip]": settingsCard_issuingTos_acceptanceIp }
          : {}),
        ...(settingsCard_issuingTos_acceptanceUser_agent
          ? {
              "settings[card_issuing][tos_acceptance][user_agent]":
                settingsCard_issuingTos_acceptanceUser_agent,
            }
          : {}),
        ...(settingsCard_paymentsDecline_onAvs_failure
          ? {
              "settings[card_payments][decline_on][avs_failure]":
                settingsCard_paymentsDecline_onAvs_failure,
            }
          : {}),
        ...(settingsCard_paymentsDecline_onCvc_failure
          ? {
              "settings[card_payments][decline_on][cvc_failure]":
                settingsCard_paymentsDecline_onCvc_failure,
            }
          : {}),
        ...(settingsCard_paymentsStatement_descriptor_prefix
          ? {
              "settings[card_payments][statement_descriptor_prefix]":
                settingsCard_paymentsStatement_descriptor_prefix,
            }
          : {}),
        ...(settingsCard_paymentsStatement_descriptor_prefix_kana
          ? {
              "settings[card_payments][statement_descriptor_prefix_kana]":
                settingsCard_paymentsStatement_descriptor_prefix_kana,
            }
          : {}),
        ...(settingsCard_paymentsStatement_descriptor_prefix_kanji
          ? {
              "settings[card_payments][statement_descriptor_prefix_kanji]":
                settingsCard_paymentsStatement_descriptor_prefix_kanji,
            }
          : {}),
        ...(settingsPaymentsStatement_descriptor
          ? { "settings[payments][statement_descriptor]": settingsPaymentsStatement_descriptor }
          : {}),
        ...(settingsPaymentsStatement_descriptor_kana
          ? {
              "settings[payments][statement_descriptor_kana]":
                settingsPaymentsStatement_descriptor_kana,
            }
          : {}),
        ...(settingsPaymentsStatement_descriptor_kanji
          ? {
              "settings[payments][statement_descriptor_kanji]":
                settingsPaymentsStatement_descriptor_kanji,
            }
          : {}),
        ...(settingsPayoutsDebit_negative_balances
          ? { "settings[payouts][debit_negative_balances]": settingsPayoutsDebit_negative_balances }
          : {}),
        ...(settingsPayoutsScheduleDelay_days
          ? { "settings[payouts][schedule][delay_days]": settingsPayoutsScheduleDelay_days }
          : {}),
        ...(settingsPayoutsScheduleInterval
          ? { "settings[payouts][schedule][interval]": settingsPayoutsScheduleInterval }
          : {}),
        ...(settingsPayoutsScheduleMonthly_anchor
          ? { "settings[payouts][schedule][monthly_anchor]": settingsPayoutsScheduleMonthly_anchor }
          : {}),
        ...(settingsPayoutsScheduleWeekly_anchor
          ? { "settings[payouts][schedule][weekly_anchor]": settingsPayoutsScheduleWeekly_anchor }
          : {}),
        ...(settingsPayoutsStatement_descriptor
          ? { "settings[payouts][statement_descriptor]": settingsPayoutsStatement_descriptor }
          : {}),
        ...(settingsTreasuryTos_acceptanceDate
          ? { "settings[treasury][tos_acceptance][date]": settingsTreasuryTos_acceptanceDate }
          : {}),
        ...(settingsTreasuryTos_acceptanceIp
          ? { "settings[treasury][tos_acceptance][ip]": settingsTreasuryTos_acceptanceIp }
          : {}),
        ...(settingsTreasuryTos_acceptanceUser_agent
          ? {
              "settings[treasury][tos_acceptance][user_agent]":
                settingsTreasuryTos_acceptanceUser_agent,
            }
          : {}),
        ...(tos_acceptanceDate ? { "tos_acceptance[date]": tos_acceptanceDate } : {}),
        ...(tos_acceptanceIp ? { "tos_acceptance[ip]": tos_acceptanceIp } : {}),
        ...(tos_acceptanceService_agreement
          ? { "tos_acceptance[service_agreement]": tos_acceptanceService_agreement }
          : {}),
        ...(tos_acceptanceUser_agent
          ? { "tos_acceptance[user_agent]": tos_acceptanceUser_agent }
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
};

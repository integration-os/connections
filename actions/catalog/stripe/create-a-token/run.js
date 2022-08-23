const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    account,
    bank_account,
    card,
    customer,
    cvc_update,
    expand,
    person,
    pii,
    accountBusiness_type,
    accountCompanyAddressCity,
    accountCompanyAddressCountry,
    accountCompanyAddressLine1,
    accountCompanyAddressLine2,
    accountCompanyAddressPostal_code,
    accountCompanyAddressState,
    accountCompanyAddress_kanaCity,
    accountCompanyAddress_kanaCountry,
    accountCompanyAddress_kanaLine1,
    accountCompanyAddress_kanaLine2,
    accountCompanyAddress_kanaPostal_code,
    accountCompanyAddress_kanaState,
    accountCompanyAddress_kanaTown,
    accountCompanyAddress_kanjiCity,
    accountCompanyAddress_kanjiCountry,
    accountCompanyAddress_kanjiLine1,
    accountCompanyAddress_kanjiLine2,
    accountCompanyAddress_kanjiPostal_code,
    accountCompanyAddress_kanjiState,
    accountCompanyAddress_kanjiTown,
    accountCompanyDirectors_provided,
    accountCompanyExecutives_provided,
    accountCompanyName,
    accountCompanyName_kana,
    accountCompanyName_kanji,
    accountCompanyOwners_provided,
    accountCompanyOwnership_declarationDate,
    accountCompanyOwnership_declarationIp,
    accountCompanyOwnership_declarationUser_agent,
    accountCompanyOwnership_declaration_shown_and_signed,
    accountCompanyPhone,
    accountCompanyRegistration_number,
    accountCompanyStructure,
    accountCompanyTax_id,
    accountCompanyTax_id_registrar,
    accountCompanyVat_id,
    accountCompanyVerificationDocumentBack,
    accountCompanyVerificationDocumentFront,
    accountIndividualAddressCity,
    accountIndividualAddressCountry,
    accountIndividualAddressLine1,
    accountIndividualAddressLine2,
    accountIndividualAddressPostal_code,
    accountIndividualAddressState,
    accountIndividualAddress_kanaCity,
    accountIndividualAddress_kanaCountry,
    accountIndividualAddress_kanaLine1,
    accountIndividualAddress_kanaLine2,
    accountIndividualAddress_kanaPostal_code,
    accountIndividualAddress_kanaState,
    accountIndividualAddress_kanaTown,
    accountIndividualAddress_kanjiCity,
    accountIndividualAddress_kanjiCountry,
    accountIndividualAddress_kanjiLine1,
    accountIndividualAddress_kanjiLine2,
    accountIndividualAddress_kanjiPostal_code,
    accountIndividualAddress_kanjiState,
    accountIndividualAddress_kanjiTown,
    accountIndividualDobDay,
    accountIndividualDobMonth,
    accountIndividualDobYear,
    accountIndividualEmail,
    accountIndividualFirst_name,
    accountIndividualFirst_name_kana,
    accountIndividualFirst_name_kanji,
    accountIndividualFull_name_aliases0,
    accountIndividualFull_name_aliases1,
    accountIndividualGender,
    accountIndividualId_number,
    accountIndividualId_number_secondary,
    accountIndividualLast_name,
    accountIndividualLast_name_kana,
    accountIndividualLast_name_kanji,
    accountIndividualMaiden_name,
    accountIndividualMetadata,
    accountIndividualPhone,
    accountIndividualPolitical_exposure,
    accountIndividualRegistered_addressCity,
    accountIndividualRegistered_addressCountry,
    accountIndividualRegistered_addressLine1,
    accountIndividualRegistered_addressLine2,
    accountIndividualRegistered_addressPostal_code,
    accountIndividualRegistered_addressState,
    accountIndividualSsn_last_4,
    accountIndividualVerificationAdditional_documentBack,
    accountIndividualVerificationAdditional_documentFront,
    accountIndividualVerificationDocumentBack,
    accountIndividualVerificationDocumentFront,
    accountTos_shown_and_accepted,
    bank_accountAccount_number,
    bank_accountCountry,
    bank_accountAccount_holder_name,
    bank_accountAccount_holder_type,
    bank_accountAccount_type,
    bank_accountCurrency,
    bank_accountRouting_number,
    cardExp_month,
    cardExp_year,
    cardNumber,
    cardAddress_city,
    cardAddress_country,
    cardAddress_line1,
    cardAddress_line2,
    cardAddress_state,
    cardAddress_zip,
    cardCurrency,
    cardCvc,
    cardName,
    cvc_updateCvc,
    expand0,
    expand1,
    personAddressCity,
    personAddressCountry,
    personAddressLine1,
    personAddressLine2,
    personAddressPostal_code,
    personAddressState,
    personAddress_kanaCity,
    personAddress_kanaCountry,
    personAddress_kanaLine1,
    personAddress_kanaLine2,
    personAddress_kanaPostal_code,
    personAddress_kanaState,
    personAddress_kanaTown,
    personAddress_kanjiCity,
    personAddress_kanjiCountry,
    personAddress_kanjiLine1,
    personAddress_kanjiLine2,
    personAddress_kanjiPostal_code,
    personAddress_kanjiState,
    personAddress_kanjiTown,
    personDobDay,
    personDobMonth,
    personDobYear,
    personDocumentsCompany_authorizationFiles0,
    personDocumentsCompany_authorizationFiles1,
    personDocumentsPassportFiles0,
    personDocumentsPassportFiles1,
    personDocumentsVisaFiles0,
    personDocumentsVisaFiles1,
    personEmail,
    personFirst_name,
    personFirst_name_kana,
    personFirst_name_kanji,
    personFull_name_aliases0,
    personFull_name_aliases1,
    personGender,
    personId_number,
    personId_number_secondary,
    personLast_name,
    personLast_name_kana,
    personLast_name_kanji,
    personMaiden_name,
    personMetadata,
    personNationality,
    personPhone,
    personPolitical_exposure,
    personRegistered_addressCity,
    personRegistered_addressCountry,
    personRegistered_addressLine1,
    personRegistered_addressLine2,
    personRegistered_addressPostal_code,
    personRegistered_addressState,
    personRelationshipDirector,
    personRelationshipExecutive,
    personRelationshipOwner,
    personRelationshipPercent_ownership,
    personRelationshipRepresentative,
    personRelationshipTitle,
    personSsn_last_4,
    personVerificationAdditional_documentBack,
    personVerificationAdditional_documentFront,
    personVerificationDocumentBack,
    personVerificationDocumentFront,
    piiId_number,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: "https://api.stripe.com/v1/tokens",
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(account ? { account } : {}),
        ...(bank_account ? { bank_account } : {}),
        ...(card ? { card } : {}),
        ...(customer ? { customer } : {}),
        ...(cvc_update ? { cvc_update } : {}),
        ...(expand ? { expand } : {}),
        ...(person ? { person } : {}),
        ...(pii ? { pii } : {}),
        ...(accountBusiness_type ? { "account[business_type]": accountBusiness_type } : {}),
        ...(accountCompanyAddressCity
          ? { "account[company][address][city]": accountCompanyAddressCity }
          : {}),
        ...(accountCompanyAddressCountry
          ? { "account[company][address][country]": accountCompanyAddressCountry }
          : {}),
        ...(accountCompanyAddressLine1
          ? { "account[company][address][line1]": accountCompanyAddressLine1 }
          : {}),
        ...(accountCompanyAddressLine2
          ? { "account[company][address][line2]": accountCompanyAddressLine2 }
          : {}),
        ...(accountCompanyAddressPostal_code
          ? { "account[company][address][postal_code]": accountCompanyAddressPostal_code }
          : {}),
        ...(accountCompanyAddressState
          ? { "account[company][address][state]": accountCompanyAddressState }
          : {}),
        ...(accountCompanyAddress_kanaCity
          ? { "account[company][address_kana][city]": accountCompanyAddress_kanaCity }
          : {}),
        ...(accountCompanyAddress_kanaCountry
          ? { "account[company][address_kana][country]": accountCompanyAddress_kanaCountry }
          : {}),
        ...(accountCompanyAddress_kanaLine1
          ? { "account[company][address_kana][line1]": accountCompanyAddress_kanaLine1 }
          : {}),
        ...(accountCompanyAddress_kanaLine2
          ? { "account[company][address_kana][line2]": accountCompanyAddress_kanaLine2 }
          : {}),
        ...(accountCompanyAddress_kanaPostal_code
          ? { "account[company][address_kana][postal_code]": accountCompanyAddress_kanaPostal_code }
          : {}),
        ...(accountCompanyAddress_kanaState
          ? { "account[company][address_kana][state]": accountCompanyAddress_kanaState }
          : {}),
        ...(accountCompanyAddress_kanaTown
          ? { "account[company][address_kana][town]": accountCompanyAddress_kanaTown }
          : {}),
        ...(accountCompanyAddress_kanjiCity
          ? { "account[company][address_kanji][city]": accountCompanyAddress_kanjiCity }
          : {}),
        ...(accountCompanyAddress_kanjiCountry
          ? { "account[company][address_kanji][country]": accountCompanyAddress_kanjiCountry }
          : {}),
        ...(accountCompanyAddress_kanjiLine1
          ? { "account[company][address_kanji][line1]": accountCompanyAddress_kanjiLine1 }
          : {}),
        ...(accountCompanyAddress_kanjiLine2
          ? { "account[company][address_kanji][line2]": accountCompanyAddress_kanjiLine2 }
          : {}),
        ...(accountCompanyAddress_kanjiPostal_code
          ? {
              "account[company][address_kanji][postal_code]":
                accountCompanyAddress_kanjiPostal_code,
            }
          : {}),
        ...(accountCompanyAddress_kanjiState
          ? { "account[company][address_kanji][state]": accountCompanyAddress_kanjiState }
          : {}),
        ...(accountCompanyAddress_kanjiTown
          ? { "account[company][address_kanji][town]": accountCompanyAddress_kanjiTown }
          : {}),
        ...(accountCompanyDirectors_provided
          ? { "account[company][directors_provided]": accountCompanyDirectors_provided }
          : {}),
        ...(accountCompanyExecutives_provided
          ? { "account[company][executives_provided]": accountCompanyExecutives_provided }
          : {}),
        ...(accountCompanyName ? { "account[company][name]": accountCompanyName } : {}),
        ...(accountCompanyName_kana
          ? { "account[company][name_kana]": accountCompanyName_kana }
          : {}),
        ...(accountCompanyName_kanji
          ? { "account[company][name_kanji]": accountCompanyName_kanji }
          : {}),
        ...(accountCompanyOwners_provided
          ? { "account[company][owners_provided]": accountCompanyOwners_provided }
          : {}),
        ...(accountCompanyOwnership_declarationDate
          ? {
              "account[company][ownership_declaration][date]":
                accountCompanyOwnership_declarationDate,
            }
          : {}),
        ...(accountCompanyOwnership_declarationIp
          ? { "account[company][ownership_declaration][ip]": accountCompanyOwnership_declarationIp }
          : {}),
        ...(accountCompanyOwnership_declarationUser_agent
          ? {
              "account[company][ownership_declaration][user_agent]":
                accountCompanyOwnership_declarationUser_agent,
            }
          : {}),
        ...(accountCompanyOwnership_declaration_shown_and_signed
          ? {
              "account[company][ownership_declaration_shown_and_signed]":
                accountCompanyOwnership_declaration_shown_and_signed,
            }
          : {}),
        ...(accountCompanyPhone ? { "account[company][phone]": accountCompanyPhone } : {}),
        ...(accountCompanyRegistration_number
          ? { "account[company][registration_number]": accountCompanyRegistration_number }
          : {}),
        ...(accountCompanyStructure
          ? { "account[company][structure]": accountCompanyStructure }
          : {}),
        ...(accountCompanyTax_id ? { "account[company][tax_id]": accountCompanyTax_id } : {}),
        ...(accountCompanyTax_id_registrar
          ? { "account[company][tax_id_registrar]": accountCompanyTax_id_registrar }
          : {}),
        ...(accountCompanyVat_id ? { "account[company][vat_id]": accountCompanyVat_id } : {}),
        ...(accountCompanyVerificationDocumentBack
          ? {
              "account[company][verification][document][back]":
                accountCompanyVerificationDocumentBack,
            }
          : {}),
        ...(accountCompanyVerificationDocumentFront
          ? {
              "account[company][verification][document][front]":
                accountCompanyVerificationDocumentFront,
            }
          : {}),
        ...(accountIndividualAddressCity
          ? { "account[individual][address][city]": accountIndividualAddressCity }
          : {}),
        ...(accountIndividualAddressCountry
          ? { "account[individual][address][country]": accountIndividualAddressCountry }
          : {}),
        ...(accountIndividualAddressLine1
          ? { "account[individual][address][line1]": accountIndividualAddressLine1 }
          : {}),
        ...(accountIndividualAddressLine2
          ? { "account[individual][address][line2]": accountIndividualAddressLine2 }
          : {}),
        ...(accountIndividualAddressPostal_code
          ? { "account[individual][address][postal_code]": accountIndividualAddressPostal_code }
          : {}),
        ...(accountIndividualAddressState
          ? { "account[individual][address][state]": accountIndividualAddressState }
          : {}),
        ...(accountIndividualAddress_kanaCity
          ? { "account[individual][address_kana][city]": accountIndividualAddress_kanaCity }
          : {}),
        ...(accountIndividualAddress_kanaCountry
          ? { "account[individual][address_kana][country]": accountIndividualAddress_kanaCountry }
          : {}),
        ...(accountIndividualAddress_kanaLine1
          ? { "account[individual][address_kana][line1]": accountIndividualAddress_kanaLine1 }
          : {}),
        ...(accountIndividualAddress_kanaLine2
          ? { "account[individual][address_kana][line2]": accountIndividualAddress_kanaLine2 }
          : {}),
        ...(accountIndividualAddress_kanaPostal_code
          ? {
              "account[individual][address_kana][postal_code]":
                accountIndividualAddress_kanaPostal_code,
            }
          : {}),
        ...(accountIndividualAddress_kanaState
          ? { "account[individual][address_kana][state]": accountIndividualAddress_kanaState }
          : {}),
        ...(accountIndividualAddress_kanaTown
          ? { "account[individual][address_kana][town]": accountIndividualAddress_kanaTown }
          : {}),
        ...(accountIndividualAddress_kanjiCity
          ? { "account[individual][address_kanji][city]": accountIndividualAddress_kanjiCity }
          : {}),
        ...(accountIndividualAddress_kanjiCountry
          ? { "account[individual][address_kanji][country]": accountIndividualAddress_kanjiCountry }
          : {}),
        ...(accountIndividualAddress_kanjiLine1
          ? { "account[individual][address_kanji][line1]": accountIndividualAddress_kanjiLine1 }
          : {}),
        ...(accountIndividualAddress_kanjiLine2
          ? { "account[individual][address_kanji][line2]": accountIndividualAddress_kanjiLine2 }
          : {}),
        ...(accountIndividualAddress_kanjiPostal_code
          ? {
              "account[individual][address_kanji][postal_code]":
                accountIndividualAddress_kanjiPostal_code,
            }
          : {}),
        ...(accountIndividualAddress_kanjiState
          ? { "account[individual][address_kanji][state]": accountIndividualAddress_kanjiState }
          : {}),
        ...(accountIndividualAddress_kanjiTown
          ? { "account[individual][address_kanji][town]": accountIndividualAddress_kanjiTown }
          : {}),
        ...(accountIndividualDobDay
          ? { "account[individual][dob][day]": accountIndividualDobDay }
          : {}),
        ...(accountIndividualDobMonth
          ? { "account[individual][dob][month]": accountIndividualDobMonth }
          : {}),
        ...(accountIndividualDobYear
          ? { "account[individual][dob][year]": accountIndividualDobYear }
          : {}),
        ...(accountIndividualEmail ? { "account[individual][email]": accountIndividualEmail } : {}),
        ...(accountIndividualFirst_name
          ? { "account[individual][first_name]": accountIndividualFirst_name }
          : {}),
        ...(accountIndividualFirst_name_kana
          ? { "account[individual][first_name_kana]": accountIndividualFirst_name_kana }
          : {}),
        ...(accountIndividualFirst_name_kanji
          ? { "account[individual][first_name_kanji]": accountIndividualFirst_name_kanji }
          : {}),
        ...(accountIndividualFull_name_aliases0
          ? { "account[individual][full_name_aliases][0]": accountIndividualFull_name_aliases0 }
          : {}),
        ...(accountIndividualFull_name_aliases1
          ? { "account[individual][full_name_aliases][1]": accountIndividualFull_name_aliases1 }
          : {}),
        ...(accountIndividualGender
          ? { "account[individual][gender]": accountIndividualGender }
          : {}),
        ...(accountIndividualId_number
          ? { "account[individual][id_number]": accountIndividualId_number }
          : {}),
        ...(accountIndividualId_number_secondary
          ? { "account[individual][id_number_secondary]": accountIndividualId_number_secondary }
          : {}),
        ...(accountIndividualLast_name
          ? { "account[individual][last_name]": accountIndividualLast_name }
          : {}),
        ...(accountIndividualLast_name_kana
          ? { "account[individual][last_name_kana]": accountIndividualLast_name_kana }
          : {}),
        ...(accountIndividualLast_name_kanji
          ? { "account[individual][last_name_kanji]": accountIndividualLast_name_kanji }
          : {}),
        ...(accountIndividualMaiden_name
          ? { "account[individual][maiden_name]": accountIndividualMaiden_name }
          : {}),
        ...(accountIndividualMetadata
          ? { "account[individual][metadata]": accountIndividualMetadata }
          : {}),
        ...(accountIndividualPhone ? { "account[individual][phone]": accountIndividualPhone } : {}),
        ...(accountIndividualPolitical_exposure
          ? { "account[individual][political_exposure]": accountIndividualPolitical_exposure }
          : {}),
        ...(accountIndividualRegistered_addressCity
          ? {
              "account[individual][registered_address][city]":
                accountIndividualRegistered_addressCity,
            }
          : {}),
        ...(accountIndividualRegistered_addressCountry
          ? {
              "account[individual][registered_address][country]":
                accountIndividualRegistered_addressCountry,
            }
          : {}),
        ...(accountIndividualRegistered_addressLine1
          ? {
              "account[individual][registered_address][line1]":
                accountIndividualRegistered_addressLine1,
            }
          : {}),
        ...(accountIndividualRegistered_addressLine2
          ? {
              "account[individual][registered_address][line2]":
                accountIndividualRegistered_addressLine2,
            }
          : {}),
        ...(accountIndividualRegistered_addressPostal_code
          ? {
              "account[individual][registered_address][postal_code]":
                accountIndividualRegistered_addressPostal_code,
            }
          : {}),
        ...(accountIndividualRegistered_addressState
          ? {
              "account[individual][registered_address][state]":
                accountIndividualRegistered_addressState,
            }
          : {}),
        ...(accountIndividualSsn_last_4
          ? { "account[individual][ssn_last_4]": accountIndividualSsn_last_4 }
          : {}),
        ...(accountIndividualVerificationAdditional_documentBack
          ? {
              "account[individual][verification][additional_document][back]":
                accountIndividualVerificationAdditional_documentBack,
            }
          : {}),
        ...(accountIndividualVerificationAdditional_documentFront
          ? {
              "account[individual][verification][additional_document][front]":
                accountIndividualVerificationAdditional_documentFront,
            }
          : {}),
        ...(accountIndividualVerificationDocumentBack
          ? {
              "account[individual][verification][document][back]":
                accountIndividualVerificationDocumentBack,
            }
          : {}),
        ...(accountIndividualVerificationDocumentFront
          ? {
              "account[individual][verification][document][front]":
                accountIndividualVerificationDocumentFront,
            }
          : {}),
        ...(accountTos_shown_and_accepted
          ? { "account[tos_shown_and_accepted]": accountTos_shown_and_accepted }
          : {}),
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
        ...(bank_accountRouting_number
          ? { "bank_account[routing_number]": bank_accountRouting_number }
          : {}),
        ...(cardExp_month ? { "card[exp_month]": cardExp_month } : {}),
        ...(cardExp_year ? { "card[exp_year]": cardExp_year } : {}),
        ...(cardNumber ? { "card[number]": cardNumber } : {}),
        ...(cardAddress_city ? { "card[address_city]": cardAddress_city } : {}),
        ...(cardAddress_country ? { "card[address_country]": cardAddress_country } : {}),
        ...(cardAddress_line1 ? { "card[address_line1]": cardAddress_line1 } : {}),
        ...(cardAddress_line2 ? { "card[address_line2]": cardAddress_line2 } : {}),
        ...(cardAddress_state ? { "card[address_state]": cardAddress_state } : {}),
        ...(cardAddress_zip ? { "card[address_zip]": cardAddress_zip } : {}),
        ...(cardCurrency ? { "card[currency]": cardCurrency } : {}),
        ...(cardCvc ? { "card[cvc]": cardCvc } : {}),
        ...(cardName ? { "card[name]": cardName } : {}),
        ...(cvc_updateCvc ? { "cvc_update[cvc]": cvc_updateCvc } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(personAddressCity ? { "person[address][city]": personAddressCity } : {}),
        ...(personAddressCountry ? { "person[address][country]": personAddressCountry } : {}),
        ...(personAddressLine1 ? { "person[address][line1]": personAddressLine1 } : {}),
        ...(personAddressLine2 ? { "person[address][line2]": personAddressLine2 } : {}),
        ...(personAddressPostal_code
          ? { "person[address][postal_code]": personAddressPostal_code }
          : {}),
        ...(personAddressState ? { "person[address][state]": personAddressState } : {}),
        ...(personAddress_kanaCity ? { "person[address_kana][city]": personAddress_kanaCity } : {}),
        ...(personAddress_kanaCountry
          ? { "person[address_kana][country]": personAddress_kanaCountry }
          : {}),
        ...(personAddress_kanaLine1
          ? { "person[address_kana][line1]": personAddress_kanaLine1 }
          : {}),
        ...(personAddress_kanaLine2
          ? { "person[address_kana][line2]": personAddress_kanaLine2 }
          : {}),
        ...(personAddress_kanaPostal_code
          ? { "person[address_kana][postal_code]": personAddress_kanaPostal_code }
          : {}),
        ...(personAddress_kanaState
          ? { "person[address_kana][state]": personAddress_kanaState }
          : {}),
        ...(personAddress_kanaTown ? { "person[address_kana][town]": personAddress_kanaTown } : {}),
        ...(personAddress_kanjiCity
          ? { "person[address_kanji][city]": personAddress_kanjiCity }
          : {}),
        ...(personAddress_kanjiCountry
          ? { "person[address_kanji][country]": personAddress_kanjiCountry }
          : {}),
        ...(personAddress_kanjiLine1
          ? { "person[address_kanji][line1]": personAddress_kanjiLine1 }
          : {}),
        ...(personAddress_kanjiLine2
          ? { "person[address_kanji][line2]": personAddress_kanjiLine2 }
          : {}),
        ...(personAddress_kanjiPostal_code
          ? { "person[address_kanji][postal_code]": personAddress_kanjiPostal_code }
          : {}),
        ...(personAddress_kanjiState
          ? { "person[address_kanji][state]": personAddress_kanjiState }
          : {}),
        ...(personAddress_kanjiTown
          ? { "person[address_kanji][town]": personAddress_kanjiTown }
          : {}),
        ...(personDobDay ? { "person[dob][day]": personDobDay } : {}),
        ...(personDobMonth ? { "person[dob][month]": personDobMonth } : {}),
        ...(personDobYear ? { "person[dob][year]": personDobYear } : {}),
        ...(personDocumentsCompany_authorizationFiles0
          ? {
              "person[documents][company_authorization][files][0]":
                personDocumentsCompany_authorizationFiles0,
            }
          : {}),
        ...(personDocumentsCompany_authorizationFiles1
          ? {
              "person[documents][company_authorization][files][1]":
                personDocumentsCompany_authorizationFiles1,
            }
          : {}),
        ...(personDocumentsPassportFiles0
          ? { "person[documents][passport][files][0]": personDocumentsPassportFiles0 }
          : {}),
        ...(personDocumentsPassportFiles1
          ? { "person[documents][passport][files][1]": personDocumentsPassportFiles1 }
          : {}),
        ...(personDocumentsVisaFiles0
          ? { "person[documents][visa][files][0]": personDocumentsVisaFiles0 }
          : {}),
        ...(personDocumentsVisaFiles1
          ? { "person[documents][visa][files][1]": personDocumentsVisaFiles1 }
          : {}),
        ...(personEmail ? { "person[email]": personEmail } : {}),
        ...(personFirst_name ? { "person[first_name]": personFirst_name } : {}),
        ...(personFirst_name_kana ? { "person[first_name_kana]": personFirst_name_kana } : {}),
        ...(personFirst_name_kanji ? { "person[first_name_kanji]": personFirst_name_kanji } : {}),
        ...(personFull_name_aliases0
          ? { "person[full_name_aliases][0]": personFull_name_aliases0 }
          : {}),
        ...(personFull_name_aliases1
          ? { "person[full_name_aliases][1]": personFull_name_aliases1 }
          : {}),
        ...(personGender ? { "person[gender]": personGender } : {}),
        ...(personId_number ? { "person[id_number]": personId_number } : {}),
        ...(personId_number_secondary
          ? { "person[id_number_secondary]": personId_number_secondary }
          : {}),
        ...(personLast_name ? { "person[last_name]": personLast_name } : {}),
        ...(personLast_name_kana ? { "person[last_name_kana]": personLast_name_kana } : {}),
        ...(personLast_name_kanji ? { "person[last_name_kanji]": personLast_name_kanji } : {}),
        ...(personMaiden_name ? { "person[maiden_name]": personMaiden_name } : {}),
        ...(personMetadata ? { "person[metadata]": personMetadata } : {}),
        ...(personNationality ? { "person[nationality]": personNationality } : {}),
        ...(personPhone ? { "person[phone]": personPhone } : {}),
        ...(personPolitical_exposure
          ? { "person[political_exposure]": personPolitical_exposure }
          : {}),
        ...(personRegistered_addressCity
          ? { "person[registered_address][city]": personRegistered_addressCity }
          : {}),
        ...(personRegistered_addressCountry
          ? { "person[registered_address][country]": personRegistered_addressCountry }
          : {}),
        ...(personRegistered_addressLine1
          ? { "person[registered_address][line1]": personRegistered_addressLine1 }
          : {}),
        ...(personRegistered_addressLine2
          ? { "person[registered_address][line2]": personRegistered_addressLine2 }
          : {}),
        ...(personRegistered_addressPostal_code
          ? { "person[registered_address][postal_code]": personRegistered_addressPostal_code }
          : {}),
        ...(personRegistered_addressState
          ? { "person[registered_address][state]": personRegistered_addressState }
          : {}),
        ...(personRelationshipDirector
          ? { "person[relationship][director]": personRelationshipDirector }
          : {}),
        ...(personRelationshipExecutive
          ? { "person[relationship][executive]": personRelationshipExecutive }
          : {}),
        ...(personRelationshipOwner
          ? { "person[relationship][owner]": personRelationshipOwner }
          : {}),
        ...(personRelationshipPercent_ownership
          ? { "person[relationship][percent_ownership]": personRelationshipPercent_ownership }
          : {}),
        ...(personRelationshipRepresentative
          ? { "person[relationship][representative]": personRelationshipRepresentative }
          : {}),
        ...(personRelationshipTitle
          ? { "person[relationship][title]": personRelationshipTitle }
          : {}),
        ...(personSsn_last_4 ? { "person[ssn_last_4]": personSsn_last_4 } : {}),
        ...(personVerificationAdditional_documentBack
          ? {
              "person[verification][additional_document][back]":
                personVerificationAdditional_documentBack,
            }
          : {}),
        ...(personVerificationAdditional_documentFront
          ? {
              "person[verification][additional_document][front]":
                personVerificationAdditional_documentFront,
            }
          : {}),
        ...(personVerificationDocumentBack
          ? { "person[verification][document][back]": personVerificationDocumentBack }
          : {}),
        ...(personVerificationDocumentFront
          ? { "person[verification][document][front]": personVerificationDocumentFront }
          : {}),
        ...(piiId_number ? { "pii[id_number]": piiId_number } : {}),
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

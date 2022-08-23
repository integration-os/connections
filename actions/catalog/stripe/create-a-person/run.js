const axios = require("axios");
const qs = require("qs");

const run = async (input) => {
  const {
    BUILDABLE_STRIPE_SECRET_KEY,
    account,
    address,
    address_kana,
    address_kanji,
    dob,
    documents,
    email,
    expand,
    first_name,
    first_name_kana,
    first_name_kanji,
    full_name_aliases,
    gender,
    id_number,
    id_number_secondary,
    last_name,
    last_name_kana,
    last_name_kanji,
    maiden_name,
    metadata,
    nationality,
    person_token,
    phone,
    political_exposure,
    registered_address,
    relationship,
    ssn_last_4,
    verification,
    addressCity,
    addressCountry,
    addressLine1,
    addressLine2,
    addressPostal_code,
    addressState,
    address_kanaCity,
    address_kanaCountry,
    address_kanaLine1,
    address_kanaLine2,
    address_kanaPostal_code,
    address_kanaState,
    address_kanaTown,
    address_kanjiCity,
    address_kanjiCountry,
    address_kanjiLine1,
    address_kanjiLine2,
    address_kanjiPostal_code,
    address_kanjiState,
    address_kanjiTown,
    dobDay,
    dobMonth,
    dobYear,
    documentsCompany_authorizationFiles0,
    documentsCompany_authorizationFiles1,
    documentsPassportFiles0,
    documentsPassportFiles1,
    documentsVisaFiles0,
    documentsVisaFiles1,
    expand0,
    expand1,
    full_name_aliases0,
    full_name_aliases1,
    registered_addressCity,
    registered_addressCountry,
    registered_addressLine1,
    registered_addressLine2,
    registered_addressPostal_code,
    registered_addressState,
    relationshipDirector,
    relationshipExecutive,
    relationshipOwner,
    relationshipPercent_ownership,
    relationshipRepresentative,
    relationshipTitle,
    verificationAdditional_documentBack,
    verificationAdditional_documentFront,
    verificationDocumentBack,
    verificationDocumentFront,
  } = input;

  verifyInput(input);

  try {
    const { data } = await axios({
      method: "post",
      url: `https://api.stripe.com/v1/accounts/${account}/persons`,
      headers: {
        Authorization: `Bearer ${BUILDABLE_STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        ...(address ? { address } : {}),
        ...(address_kana ? { address_kana } : {}),
        ...(address_kanji ? { address_kanji } : {}),
        ...(dob ? { dob } : {}),
        ...(documents ? { documents } : {}),
        ...(email ? { email } : {}),
        ...(expand ? { expand } : {}),
        ...(first_name ? { first_name } : {}),
        ...(first_name_kana ? { first_name_kana } : {}),
        ...(first_name_kanji ? { first_name_kanji } : {}),
        ...(full_name_aliases ? { full_name_aliases } : {}),
        ...(gender ? { gender } : {}),
        ...(id_number ? { id_number } : {}),
        ...(id_number_secondary ? { id_number_secondary } : {}),
        ...(last_name ? { last_name } : {}),
        ...(last_name_kana ? { last_name_kana } : {}),
        ...(last_name_kanji ? { last_name_kanji } : {}),
        ...(maiden_name ? { maiden_name } : {}),
        ...(metadata ? { metadata } : {}),
        ...(nationality ? { nationality } : {}),
        ...(person_token ? { person_token } : {}),
        ...(phone ? { phone } : {}),
        ...(political_exposure ? { political_exposure } : {}),
        ...(registered_address ? { registered_address } : {}),
        ...(relationship ? { relationship } : {}),
        ...(ssn_last_4 ? { ssn_last_4 } : {}),
        ...(verification ? { verification } : {}),
        ...(addressCity ? { "address[city]": addressCity } : {}),
        ...(addressCountry ? { "address[country]": addressCountry } : {}),
        ...(addressLine1 ? { "address[line1]": addressLine1 } : {}),
        ...(addressLine2 ? { "address[line2]": addressLine2 } : {}),
        ...(addressPostal_code ? { "address[postal_code]": addressPostal_code } : {}),
        ...(addressState ? { "address[state]": addressState } : {}),
        ...(address_kanaCity ? { "address_kana[city]": address_kanaCity } : {}),
        ...(address_kanaCountry ? { "address_kana[country]": address_kanaCountry } : {}),
        ...(address_kanaLine1 ? { "address_kana[line1]": address_kanaLine1 } : {}),
        ...(address_kanaLine2 ? { "address_kana[line2]": address_kanaLine2 } : {}),
        ...(address_kanaPostal_code
          ? { "address_kana[postal_code]": address_kanaPostal_code }
          : {}),
        ...(address_kanaState ? { "address_kana[state]": address_kanaState } : {}),
        ...(address_kanaTown ? { "address_kana[town]": address_kanaTown } : {}),
        ...(address_kanjiCity ? { "address_kanji[city]": address_kanjiCity } : {}),
        ...(address_kanjiCountry ? { "address_kanji[country]": address_kanjiCountry } : {}),
        ...(address_kanjiLine1 ? { "address_kanji[line1]": address_kanjiLine1 } : {}),
        ...(address_kanjiLine2 ? { "address_kanji[line2]": address_kanjiLine2 } : {}),
        ...(address_kanjiPostal_code
          ? { "address_kanji[postal_code]": address_kanjiPostal_code }
          : {}),
        ...(address_kanjiState ? { "address_kanji[state]": address_kanjiState } : {}),
        ...(address_kanjiTown ? { "address_kanji[town]": address_kanjiTown } : {}),
        ...(dobDay ? { "dob[day]": dobDay } : {}),
        ...(dobMonth ? { "dob[month]": dobMonth } : {}),
        ...(dobYear ? { "dob[year]": dobYear } : {}),
        ...(documentsCompany_authorizationFiles0
          ? { "documents[company_authorization][files][0]": documentsCompany_authorizationFiles0 }
          : {}),
        ...(documentsCompany_authorizationFiles1
          ? { "documents[company_authorization][files][1]": documentsCompany_authorizationFiles1 }
          : {}),
        ...(documentsPassportFiles0
          ? { "documents[passport][files][0]": documentsPassportFiles0 }
          : {}),
        ...(documentsPassportFiles1
          ? { "documents[passport][files][1]": documentsPassportFiles1 }
          : {}),
        ...(documentsVisaFiles0 ? { "documents[visa][files][0]": documentsVisaFiles0 } : {}),
        ...(documentsVisaFiles1 ? { "documents[visa][files][1]": documentsVisaFiles1 } : {}),
        ...(expand0 ? { "expand[0]": expand0 } : {}),
        ...(expand1 ? { "expand[1]": expand1 } : {}),
        ...(full_name_aliases0 ? { "full_name_aliases[0]": full_name_aliases0 } : {}),
        ...(full_name_aliases1 ? { "full_name_aliases[1]": full_name_aliases1 } : {}),
        ...(registered_addressCity ? { "registered_address[city]": registered_addressCity } : {}),
        ...(registered_addressCountry
          ? { "registered_address[country]": registered_addressCountry }
          : {}),
        ...(registered_addressLine1
          ? { "registered_address[line1]": registered_addressLine1 }
          : {}),
        ...(registered_addressLine2
          ? { "registered_address[line2]": registered_addressLine2 }
          : {}),
        ...(registered_addressPostal_code
          ? { "registered_address[postal_code]": registered_addressPostal_code }
          : {}),
        ...(registered_addressState
          ? { "registered_address[state]": registered_addressState }
          : {}),
        ...(relationshipDirector ? { "relationship[director]": relationshipDirector } : {}),
        ...(relationshipExecutive ? { "relationship[executive]": relationshipExecutive } : {}),
        ...(relationshipOwner ? { "relationship[owner]": relationshipOwner } : {}),
        ...(relationshipPercent_ownership
          ? { "relationship[percent_ownership]": relationshipPercent_ownership }
          : {}),
        ...(relationshipRepresentative
          ? { "relationship[representative]": relationshipRepresentative }
          : {}),
        ...(relationshipTitle ? { "relationship[title]": relationshipTitle } : {}),
        ...(verificationAdditional_documentBack
          ? { "verification[additional_document][back]": verificationAdditional_documentBack }
          : {}),
        ...(verificationAdditional_documentFront
          ? { "verification[additional_document][front]": verificationAdditional_documentFront }
          : {}),
        ...(verificationDocumentBack
          ? { "verification[document][back]": verificationDocumentBack }
          : {}),
        ...(verificationDocumentFront
          ? { "verification[document][front]": verificationDocumentFront }
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
const verifyInput = ({ BUILDABLE_STRIPE_SECRET_KEY, account }) => {
  const ERRORS = {
    INVALID_BUILDABLE_STRIPE_SECRET_KEY:
      "A valid BUILDABLE_STRIPE_SECRET_KEY field (string) was not provided in the input.",
    INVALID_ACCOUNT: "A valid account field (string) was not provided in the input.",
  };

  if (typeof BUILDABLE_STRIPE_SECRET_KEY !== "string")
    throw new Error(ERRORS.INVALID_BUILDABLE_STRIPE_SECRET_KEY);
  if (typeof account !== "string") throw new Error(ERRORS.INVALID_ACCOUNT);
};

import * as SMS from "expo-sms";

export default async function sendSms(contacts, message, date) {
  const isAvailable = await SMS.isAvailableAsync();
  if (isAvailable) {
    const phoneNumbers = contacts.map((item) => item.phoneNumbers[0].number);
    const { result } = await SMS.sendSMSAsync(
      phoneNumbers,
      message
        ? message
        : defaultMessage(contacts.length > 1 ? "all" : contacts[0].name, date)
    );
    return result;
  } else {
    return {
      result: "SMS not available",
    };
  }
}

const defaultMessage = (name, date) => {
  if (name == "all") {
    return `Salut tout le monde, Aimeriez-vous venir voir ce film avec moi ? :)`;
  }
  return `Salut ${name}, Aimerais-tu venir voir ce film avec moi ? :)`;
};

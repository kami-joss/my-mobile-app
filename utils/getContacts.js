import * as Contacts from "expo-contacts";

export default async function getContacts() {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === "granted") {
    const { data } = await Contacts.getContactsAsync();

    if (data.length > 0) {
      const contacts = data;
      return contacts
    }
    return data
  }
}

/**
 * Checks if an entrant exists in the database.
 * @param client - The database client.
 * @param entrantEmail - The entrant's email.
 * @returns {Promise<{id: string}>}
 */
export const getEntrantId = async (client, entrantEmail) => {
  const { data: entrant } = await client
    .from("entrants")
    .select("id")
    .eq("email", entrantEmail);
  return entrant[0] || {};
};

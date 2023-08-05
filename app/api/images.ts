async function getData() {
  const res = await fetch(
    "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=9"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export { getData };
